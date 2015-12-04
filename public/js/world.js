/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;
var engine;
var world;

var Game = {};
var KEY_UP = 'w';
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';

var ACCELERATION = 0.3;
var ANGLE_LEFT = -0.05;
var ANGLE_RIGHT = 0.05;

var CAR_DIMENSIONS = {w: 80, h: 100};
var FEATURES_CAR = {
  density: 0.004,
  friction: 0.3,
  frictionAir: 0.9,
  postion: {x: 0, y: 0}
};

var WHEEL_DIMENSIONS = {w: 20, h: 40};
var FEATURES_WHEEL = {};


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
  // create two boxes and a ground
  /*
  var car_pos = {x: 400, y:200};
  var carBody = Bodies.rectangle(car_pos.x, car_pos.y, CAR_DIMENSIONS.w, CAR_DIMENSIONS.h, FEATURES_CAR);
  var wheels = [
    // front wheels
    Bodies.rectangle(car_pos.x, car_pos.y, WHEEL_DIMENSIONS.w, WHEEL_DIMENSIONS.h, FEATURES_WHEEL),
    Bodies.rectangle(car_pos.x, car_pos.y, WHEEL_DIMENSIONS.w, WHEEL_DIMENSIONS.h, FEATURES_WHEEL),
    // rear wheels
    Bodies.rectangle(car_pos.x, car_pos.y, WHEEL_DIMENSIONS.w, WHEEL_DIMENSIONS.h, FEATURES_WHEEL),
    Bodies.rectangle(car_pos.x, car_pos.y, WHEEL_DIMENSIONS.w, WHEEL_DIMENSIONS.h, FEATURES_WHEEL)
  ];

  var wheelConstraint = Constraint.create({
    bodyA: carBody,
    pointA: carBody.position,
    bodyB: wheels[0],
    pointB: wheels[0].position,
    stiffness: 1
  });
  var car = Composite.create({label}

  {bodies: [carBody, wheels[0]]});//, wheels[1], wheels[2], wheels[3]]});
  Composite.addConstraint(car, wheelConstraint);
  */

  var objs = [];
  for (var i = 0 ; i < 1000; ++i) {
    var x = Math.random() * 800;
    var y = Math.random() * 600;
    var w = Math.random() * 20;
    var h = Math.random() * 20;
    if ((x > 400 && x < 480) && (y > 200 && y < 280)) {
      continue;
    }
    objs.push(Bodies.rectangle(x, y, w, h));
  }
  World.add(world, objs);
  this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  this.car = Bodies.rectangle(400, 200, 80, 80, FEATURES_CAR);

  world.gravity.y = 0;
  // add all of the bodies to the world
  World.add(world, [this.car, this.ground]);
};

Game.initEvents = function() {
  var car = Game.car,
      render = engine.render;
      temp = {x : car.position.x , y : car.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(car.position, temp));
    temp = {x : car.position.x , y : car.position.y};
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
    // Bounds.translate(render.bounds, Vector.sub(car.position, temp));
  });

  // Events.on(engine, 'afterTick', function() {
  //   var translate;
  //
  //   var deltaCentre = Vector.sub(car.position, viewportCentre),
  //   centreDist = Vector.magnitude(deltaCentre);
  //   var direction = Vector.normalise(deltaCentre);
  //
  //   // move the view
  //   Bounds.translate(render.bounds, direction);
  // });
  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
};

Game.initMap = function() {
  world.bounds.min.x = -300;
  world.bounds.min.y = -300;
  world.bounds.max.x = 1100;
  world.bounds.max.y = 900;
  World.add(world, [
    Bodies.rectangle(200, 150, 650, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
    Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })
  ]);
};
