/**
 * ------------------------------------------------------------
 * Create a physics environment, and draw within it.
 * ------------------------------------------------------------
 */

// Physics engine
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Vertices = Matter.Vertices;

var engine;
var world;
var render;
// Game instance for this client
var Game = {};
// Stores current keypress states
var keypresses = {};
// clients: (socket.id) -> (car data), including this client's car
Game.clients = {};
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
var abc = 1;
var fps = 10;
var frame = 0;
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
    var carBody = Game.clients[id];
    // Update the reindeer
    if (frame === fps) {
      var num = abc < 10 ? '0' + abc : abc;
      //carBody.render.sprite.texture = '/images/reindeer/reindeer_' + num + '.gif';
      carBody.render.sprite.xScale = 12;
      carBody.render.sprite.yScale = 12;
      abc = (abc + 1) % 64;
      if (abc === 0) { abc = 1; }
      frame = 0;
    }
    ++frame;

    if (id === socket.id) {
      // Don't update our own car
      continue;
    }
    examinedIDs.add(id);
    if (carBody === undefined) {
      // Car seen for the first time, so make a new body
      var clientCar = carFactory(data[id].position, false);
      World.add(world, clientCar);
      carBody = clientCar;
    } else {
      // Apply changes to old car
      setPosition(carBody, carUpdate.position);
      setVelocity(carBody, carUpdate.velocity);
      carBody.angle = carUpdate.angle;
    }
    Game.clients[id] = carBody;
  }
  // Remove bodies from the world that are no longer used
  for (id in Game.clients) {
    if (!examinedIDs.has(id)) {
      World.remove(world, Game.clients[id]);
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
  //car.groupId = 1;
  World.add(world, car);
  this.clients[socket.id] = car;
  // Register this car with server, and all cars
  register(car);
};

Game.initEvents = function() {
  var car = this.clients[socket.id],
      oldcar = {x : car.position.x , y : car.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(car.position, oldcar));
    oldcar = {x : car.position.x , y : car.position.y};
    handleSteering(car);
  });
  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
  renderOptions.wireframes = false;
};

