/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector;

var engine;
var world;

var Game = {};
var KEY_UP = 'i';
var KEY_LEFT = 'j';
var KEY_RIGHT = 'l';

var ACCELERATION = 0.3;
var ANGLE_LEFT = -0.1;
var ANGLE_RIGHT = 0.1;


var init = function(container) {
  engine = Engine.create(container);
  world = engine.world;
  Game.initBodies();
  Game.initEvents();
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
  var carInitialPosition = {x: 400, y: 200};
  var car = carFactory(this, carInitialPosition);
  world.gravity.y = 0;
  World.add(world, car);
};


Game.initEvents = function() {
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