/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Vector = Matter.Vector;
var engine;
var world;

var Game = {};
var KEY_UP = 'i';
var KEY_LEFT = 'j';
var KEY_RIGHT = 'l';

var VECTOR_ACCELERATION = {x:0, y:10};
var ANGLE_LEFT = 0.1;
var ANGLE_RIGHT = -0.1;


var init = function(container) {
  engine = Engine.create(container);
  world = engine.world;
  Game.initBodies();
  Game.initEvents();
  Game.car = {
    postion: {x: 0, y: 0},
    movement: { x: 0, y: 0 }
  };
  return Game;
};

Game.run = function() {
  // register key presses to steer the car
  $(document).keypress(function(event){
    var key = String.fromCharCode(event.which);
    if (key == KEY_UP) {
      Events.trigger(engine, 'accelerate', event);
    } else if (key == KEY_LEFT) {
      Events.trigger(engine, 'turnLeft', event);
    } else if (key == KEY_RIGHT) {
      Events.trigger(engine, 'turnRight', event);
    }
   });
  Engine.update(engine, 100);
  Engine.run(engine);
};

Game.initBodies = function() {
  // create two boxes and a ground
  var carOptions = {
    density: 0.004,
    friction: 0.3,
    frictionAir: 0.9,
    postion: {x: 0, y: 0}
  };
  var car = Bodies.rectangle(400, 200, 80, 80, carOptions);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  world.gravity.y = 0;
  // add all of the bodies to the world
  World.add(world, [car, ground]);
};

Game.initEvents = function() {
  Events.on(engine, 'accelerate', function(event) {
    var car = world.bodies[0];
    var pre = car.postion;

    var parallelVector = Vector.mult({x: Math.cos(car.angle), y: Math.sin(car.angle)}, 10);
    console.log(car);
    Body.applyForce(car, car.position, Vector.add(car.force, parallelVector));
    var post = car.position;
    console.log('ACCELERATE', pre, post);
  });
  Events.on(engine, 'turnLeft', function(event) {
    var car = world.bodies[0];
    var pre = car.postion;
    Body.rotate(car, ANGLE_LEFT);
    var post = car.position;
    console.log('TURN LEFT', pre, post);
  });
  Events.on(engine, 'turnRight', function(event) {
    var car = world.bodies[0];
    var pre = car.postion;
    Body.rotate(car, ANGLE_RIGHT);
    var post = car.position;
    console.log('TURN RIGHT', pre, post);
  });
};