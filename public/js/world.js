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
// Game features
var HAS_WHEELS = false;      // TODO v hard to drive w wheels
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
    if (id === socket.id) {
      // Don't update our own car
      continue;
    }
    examinedIDs.add(id);
    var carUpdate = data[id];
    var carBody = Game.clients[id];
    if (carBody === undefined) {
      // Car seen for the first time, so make a new body
      var clientCar = carFactory(this, data[id].position, HAS_WHEELS, false);
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
  // var objs = [];
  // for (var i = 0 ; i < 100; ++i) {
  //   var x = Math.random() * 800;
  //   var y = Math.random() * 600;
  //   var w = Math.random() * 20;
  //   var h = Math.random() * 20;
  //   if ((x > 400 && x < 480) && (y > 200 && y < 280)) {
  //     continue;
  //   }
  //   objs.push(Bodies.rectangle(x, y, w, h));
  // }
  // World.add(world, objs);
  // this.ground = Bodies.rectangle(0, 0, 500, 10, { isStatic: true });

  world.gravity.y = 0;

  // Construct this client's car
  var carInitialPosition = {x: 430, y: 300};
  var car = carFactory(this, carInitialPosition, HAS_WHEELS, true);
  for (var i = 0 ; i < 10; ++i) {
    var x = Math.random() * 800;
    var y = Math.random() * 600;

    if ((x > 500 && x < 550) && (y > 250 && y < 350)) {
         continue;
    }

    var treePosition = {x:x,y:y};

    var tree = treeFactory(this, treePosition);
    World.add(world, tree);
  }

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


Game.initMap = function() {
  var a = 0,
      b = 0,
      c = 0,
      d = 0;
  world.bounds.min.x = -500;
  world.bounds.min.y = -500;
  world.bounds.max.x = 1500;
  world.bounds.max.y = 1500;
  World.add(world, [
    // SMALL BOX FOR TESTING
    // top
    Bodies.rectangle(500 + a, 200 + b, 700 + c, 10 + d, { isStatic: true}),
    // bot
    //Bodies.rectangle(500 + a, 500 + b, 700 + c, 10 + d, { isStatic: true}),
    // left
    Bodies.rectangle(150 + a, 350 + b, 10 + c, 300 + d, { isStatic: true}),
    // right
    Bodies.rectangle(850 + a, 350 + b, 10 + c, 300 + d, { isStatic: true})

    /* FULL MAP
    // top
    Bodies.rectangle(950 + a, 300 + b, 900 + c, 10 + d, { isStatic: true}),
    // bot
    Bodies.rectangle(900 + a, 1300 + b, 1000 + c, 10 + d, { isStatic: true}),
    // left
    Bodies.rectangle(400 + a, 900 + b, 10 + c, 800 + d, { isStatic: true}),
    // right
    Bodies.rectangle(1400 + a, 800 + b, 10 + c, 1000 + d, { isStatic: true}),

    // top entry and dest
    Bodies.rectangle(400 + a, 400 + b, 200 + c, 10 + d, { isStatic: true}),
    Bodies.rectangle(400 + a, 300 + b, 10 + c, 200 + d, { isStatic: true}),
    Bodies.rectangle(450 + a, 200 + b, 100 + c, 10 + d, { isStatic: true}),
    Bodies.rectangle(500 + a, 250 + b, 10 + c, 100 + d, { isStatic: true}),
    Bodies.rectangle(300 + a, 450 + b, 10 + c, 100 + d, { isStatic: true}),
    Bodies.rectangle(350 + a, 500 + b, 100 + c, 10 + d, { isStatic: true}),

    // roads
    Bodies.rectangle(500 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1300 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(900 + a, 1200 + b, 800 + c, 10 + d, { isStatic: true}),

    Bodies.rectangle(600 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1200 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(700 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1100 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(800 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1000 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(900 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    // Bodies.rectangle(200, 150, 650, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    */
  ]);
};

// Sets up canvas for the game (background color, size, resizing)
Game.initCanvas = function(container) {
  var canvas = document.createElement('canvas');

  canvas.width = 860;
  canvas.height = 600;
  this.canvas = canvas;

  // Resize game on window resize
  /*
  $(window).resize(function(){
      var container = document.getElementById('canvas-container');
      Game.canvas.width = $(container).width();
      Game.canvas.height = $(container).height();
      // TODO how redraw map on window resize?
  });
  */

  var render = {
    canvas: canvas,
      options: {
        background: 'darkslategrey',
        width: canvas.width,
        height: canvas.height,
      }
    };
  return render;
};
