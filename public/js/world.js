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

      handleAnimation(carBody, id);
    }
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

  // Prefetch reindeer images
  var prefetchBodies = [];
  for (var i = 1; i <= 64; ++i) {
    var frameNumString = i < 10 ? '0' + i : i;
    var body = Bodies.rectangle(10 * i, 500, 3, 4, {
      render: {
        sprite: {
          texture: '/images/reindeer/reindeer_' + frameNumString + '.gif'
        }
      }
    });
    prefetchBodies.push(body);
  }
  for (i = 0; i < prefetchBodies.length; ++i) {
    World.add(world, prefetchBodies[i]);
  }
  setTimeout(function() {
    for (var i = 0; i < prefetchBodies.length; ++i) {
      World.remove(world, prefetchBodies[i]);
    }
  }, 1000);

  // Add the car
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
    handleAnimation(car, socket.id);
    var carImage = car.bodies.filter(function(body) { return body.label === 'body'; })[0];
    setPosition(carImage, carBody.position);
  });
  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
  renderOptions.wireframes = false;
};

