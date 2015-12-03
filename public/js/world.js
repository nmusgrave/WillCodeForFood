/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;
var engine;
var world;

var Game = {};
var KEY_UP = 'i';
var KEY_LEFT = 'j';
var KEY_RIGHT = 'l';

var ACCELERATION = 1;
var ANGLE_LEFT = -0.1;
var ANGLE_RIGHT = 0.1;

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
  Game.initBodies();
  Game.initEvents();
  return Game;
};

// Stores current keypress states
var keypresses = {};

Game.run = function() {
  // register key presses to steer the car
  $(document).keydown(function(event){
    var key = String.fromCharCode(event.which);
    keypresses[key] = true;
  });
  $(document).keyup(function(event){
    var key = String.fromCharCode(event.which);
    keypresses[key] = false;
  });

  Engine.update(engine, 100);
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

  this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  this.car = Bodies.rectangle(400, 200, 80, 80, FEATURES_CAR);

  world.gravity.y = 0;
  // add all of the bodies to the world
  World.add(world, [this.car, this.ground]);
};

Game.initEvents = function() {
  // Before each frame, check the key presses and update the car.
  Events.on(engine, 'beforeTick', function() {
    if (keypresses[KEY_UP]) {
      // Accelerate
    }
    if (keypresses[KEY_LEFT]) {
      // Turn steering wheel left
    }
    if (keypresses[KEY_RIGHT]) {
      // Turn steering wheel right
    }
  });

  Events.on(engine, 'accelerate', function(event) {
    var car = Game.car;
    var parallelVector = Vector.mult({x: Math.cos(car.angle), y: Math.sin(car.angle)}, ACCELERATION);
    Body.applyForce(car, car.position, Vector.add(car.force, parallelVector));
  });
  Events.on(engine, 'turnLeft', function(event) {
    Body.rotate(Game.car, ANGLE_LEFT);
  });
  Events.on(engine, 'turnRight', function(event) {
    Body.rotate(Game.car, ANGLE_RIGHT);
  });
};