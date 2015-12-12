/**
 * ------------------------------------------------------------
 * Create a physics environment, and draw within it.
 * ------------------------------------------------------------
 */

// Physics engine
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Vertices = Matter.Vertices;

var engine;
var world;
var render;
// Game instance for this client
var Game = {
  // clients: (socket.id) -> (car data), including this client's car
  clients: {}
};
// Stores current keypress states
var keypresses = {};
// clients: (socket.id) -> (car data), including this client's car
Game.clients = {};
// ice: set of (center, dimensions) tuples for every ice patch
Game.iceBodies = new Set();
// Definitions for game attributes
var GAME_FEATURES;

/* ------------------------------------------------------------
 * Create a game for a client
 * ------------------------------------------------------------
 */
var init = function(gameFeatures, container) {
  GAME_FEATURES = gameFeatures;
  var renderOptions = Game.initCanvas(container);
  engine = Engine.create(container, {
    render: renderOptions
  });
  render = engine.render;

  world = engine.world;
  Game.initMap();
  Game.initBodies();
  Game.initEvents();
  return Game;
};

/*
 *  Get user's keyboard input to steer the car
 */
Game.run = function() {
  // Take input from user holding down/releasing key
  $(document).keydown(function(event){
    var key = String.fromCharCode(event.which).toLowerCase();
    keypresses[key] = true;
  });
  $(document).keyup(function(event){
    var key = String.fromCharCode(event.which).toLowerCase();
    keypresses[key] = false;
  });
  Engine.run(engine);
};

/*
 * Notify server that this client has made a car
 */
var register = function(car) {
  var carData = {
    label: car.label,
    angle: car.angle,
    angularSpeed: car.angularSpeed,
    angularVelocity: car.angularVelocity,
    force: car.force,
    position: car.position,
    velocity: car.velocity
  };
  socket.emit('register', carData);
};

/*
 * Keep track of clients that join this game session
 * Draw cars of other clients, then this client's car (must draw this after,
 *  to ensure correct positioning)
 */
socket.on('tick', function(data) {
  // Get updates from server, and change the
  // Update all the cars
  if (!GAME_FEATURES) {
    return;
  }
  var examinedIDs = new Set();
  examinedIDs.add(socket.id);
  for (var id in data) {
    var carUpdate = data[id];

    var ANIMATION_SPEED = 0.13;
    var TOTAL_FRAMES = 4;

    // Don't update our own car position, velocity and angle.
    var carBody;
    if (id !== socket.id) {
      examinedIDs.add(id);
      if (!Game.clients[id]) {
        // Car seen for the first time, so make a new body
        var clientCar = carFactory(data[id].position, false);
        World.add(world, clientCar);
        carBody = clientCar;
        Game.clients[id] = {
          body: carBody,
          frameNum: 0
        };
      } else {
        // Apply changes to old car
        carBody = Game.clients[id].body;
        var carChassis = carBody.bodies.filter(function(body) { return body.label === 'body'; })[0];
        setPosition(carChassis, carUpdate.position);
        setVelocity(carChassis, carUpdate.velocity);
        carChassis.angle = carUpdate.angle;
      }
    } else {
      carBody = Game.clients[id].body;
    }

    // Set the car image
    var carChassis = carBody.bodies.filter(function(body) { return body.label === 'body'; })[0];
    var posAngle = ((carChassis.angle % (2*Math.PI)) + (2*Math.PI)) % (2*Math.PI);
    var NUM_FRAME_ROTATIONS = 16;
    var carAnglePercent = (posAngle / (2*Math.PI)) * ((1 + NUM_FRAME_ROTATIONS) / NUM_FRAME_ROTATIONS);
    var frameNum = ((Math.floor(carAnglePercent * NUM_FRAME_ROTATIONS) + (NUM_FRAME_ROTATIONS/2)) % NUM_FRAME_ROTATIONS) + 1;

    // Adjust frame number based off of current walk position/frame number
    Game.clients[id].frameNum += ANIMATION_SPEED;
    if (Math.floor(Game.clients[id].frameNum) >= TOTAL_FRAMES) {
      Game.clients[id].frameNum = Game.clients[id].frameNum % TOTAL_FRAMES;
    }

    var extraFrames;
    switch (Math.floor(Game.clients[id].frameNum)) {
      case 0:
        extraFrames = 0;
      break;
      case 1:
        extraFrames = NUM_FRAME_ROTATIONS;
      break;
      case 2:
        extraFrames = 0;
      break;
      case 3:
        extraFrames = NUM_FRAME_ROTATIONS * 2;
      break;
    }
    frameNum += extraFrames;

    var frameNumString = frameNum < 10 ? '0' + frameNum : frameNum;
    var carImage = carBody.bodies.filter(function(body) { return body.label === 'image'; })[0];
    carImage.render.sprite.texture = '/images/reindeer/reindeer_' + frameNumString + '.gif';
    setPosition(carImage, carChassis.position);
  }
  // Remove bodies from the world that are no longer used
  for (id in Game.clients) {
    if (!examinedIDs.has(id)) {
      World.remove(world, Game.clients[id].body);
      delete Game.clients[id];
    }
  }
});

/* ------------------------------------------------------------
 * Initialize objects, map, canvas, and events within the game
 * ------------------------------------------------------------
 */
Game.initBodies = function() {
  world.gravity.y = 0;
  // Construct this client's car
  var carInitialPosition = {x: 430, y: 300};
  var car = carFactory(carInitialPosition, true);
  World.add(world, car);
  this.clients[socket.id] = {
    body: car,
    frameNum: 0
  };
  // Register this car with server, and all cars
  register(car);
};

Game.initEvents = function() {
  var car = this.clients[socket.id].body;
  var carBody = car.bodies.filter(function(body) { return body.label === 'body'; })[0];
  var oldcar = {x : carBody.position.x , y : carBody.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(carBody.position, oldcar));
    oldcar = {x : carBody.position.x , y : carBody.position.y};
    handleSteering(carBody);
    var carImage = car.bodies.filter(function(body) { return body.label === 'body'; })[0];
    setPosition(carImage, carBody.position);
  });
  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
  renderOptions.wireframes = false;
};

