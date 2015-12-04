/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies;

var engine;
var world;

var Game = {};
var KEY_UP = 'w';
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';

var ACCELERATION = 0.1;
var ANGLE_LEFT = -0.05;
var ANGLE_RIGHT = 0.05;

var init = function(container) {
  engine = Engine.create(container);
  world = engine.world;
  Game.initMap();
  Game.initBodies();
  Game.initEvents();
  return Game;
};

// Stores current keypress states
var keypresses = {};

Game.run = function() {
  // register key presses to steer the car
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
  //* HEAD
  var carInitialPosition = {x: 430, y: 300};

  // WHEELS
  //var car = carFactory(this, carInitialPosition);

  // NO WHEELS
  var car = Bodies.rectangle(carInitialPosition.x, carInitialPosition.y, 40, 20);
  this.car = car;
  
  world.gravity.y = 0;
  World.add(world, [car/*, this.ground*/]);
};


Game.initEvents = function() {
  var car = Game.car,
      render = engine.render,
      oldcar = {x : car.position.x , y : car.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(car.position, oldcar));
    oldcar = {x : car.position.x , y : car.position.y};
    if (keypresses[KEY_UP]) {
      // Accelerate
      var parallelVector = Vector.mult({x: Math.cos(car.angle), y: Math.sin(car.angle)}, ACCELERATION);
      Body.applyForce(car, car.position, Vector.add(car.force, parallelVector));
      console.log('test');
    }
    if (keypresses[KEY_LEFT]) {
      // Turn steering wheel left
      Body.rotate(car, ANGLE_LEFT);
    }
    if (keypresses[KEY_RIGHT]) {
      // Turn steering wheel right
      Body.rotate(car, ANGLE_RIGHT);
    }
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
  ]);

};
