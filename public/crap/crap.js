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
  frictionAir: 0.9
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
  var WHEEL_FEATURES = {
    density: 0.004,
    friction: 0.3,
    frictionAir: 0.9,
    postion: {x: 0, y: 0},
    mass: 30,
  };
  var car = Bodies.rectangle(400, 300, 40,15, FEATURES_CAR);

  var leftF = Bodies.rectangle(415,315,10,5,WHEEL_FEATURES);
  var rightF = Bodies.rectangle(415,285,10,5,WHEEL_FEATURES);

  var leftR = Bodies.rectangle(385,315,10,5,FEATURES_CAR);
  var rightR = Bodies.rectangle(385,285,10,5,FEATURES_CAR);

  this.car = car;
  this.leftF = leftF;
  this.rightF = rightF;

  var carComposite = Composite.create({ label: 'Car' });
  Composite.addBody(carComposite, car);
  Composite.addBody(carComposite, leftF);
  Composite.addBody(carComposite, rightF);
  Composite.addBody(carComposite, leftR);
  Composite.addBody(carComposite, rightR);

  var axel = Constraint.create({
      bodyA: car,
      pointA: { x: 0, y: 0 },
      bodyB: leftF,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: car,
      pointA: { x: 0, y: 0 },
      bodyB: rightF,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: leftF,
      pointA: { x: 0, y: 0 },
      bodyB: rightF,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: car,
      pointA: { x: 0, y: 0 },
      bodyB: leftR,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: car,
      pointA: { x: 0, y: 0 },
      bodyB: rightR,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: leftR,
      pointA: { x: 0, y: 0 },
      bodyB: rightR,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: leftR,
      pointA: { x: 0, y: 0 },
      bodyB: leftF,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: rightF,
      pointA: { x: 0, y: 0 },
      bodyB: rightR,
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: leftF,
      pointA: { x: 5, y: 0 },
      bodyB: rightF,
      pointB: { x: 5, y: 0 },
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);

  var axel = Constraint.create({
      bodyA: leftF,
      pointA: { x: -5, y: 0 },
      bodyB: rightF,
      pointB: { x: -5, y: 0 },
      stiffness: 1
  });
  Composite.addConstraint(carComposite, axel);



  world.gravity.y = 0;
  world.gravity.x = 0;
  // add all of the bodies to the world
  World.add(world, [carComposite/*, this.ground*/]);
};

Game.initEvents = function() {
  var car = Game.car,
      leftF = Game.leftF,
      rightF = Game.rightF,
      render = engine.render;
      oldcar = {x : car.position.x , y : car.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(car.position, oldcar));
    oldcar = {x : car.position.x , y : car.position.y};
    if (keypresses[KEY_UP]) {
      // Accelerate
      // var parallelVector = Vector.mult({x: Math.cos(car.angle), y: Math.sin(car.angle)}, ACCELERATION);
      // Body.applyForce(car, car.position, Vector.add(car.force, parallelVector));
      var parallelVector = Vector.mult({x: -Math.cos(leftF.angle), y: Math.sin(leftF.angle)}, ACCELERATION);
      var force = Vector.add(car.force, parallelVector);
      force.x = force.x*-1;
      Body.applyForce(leftF, leftF.position, force);
      Body.applyForce(rightF, rightF.position, force);
    }
    if (keypresses[KEY_LEFT]) {
      // Turn steering wheel left
      // Body.rotate(car, ANGLE_LEFT);
      Body.rotate(leftF, ANGLE_LEFT);
      Body.rotate(rightF, ANGLE_LEFT);
    }
    if (keypresses[KEY_RIGHT]) {
      // Turn steering wheel right
      // Body.rotate(car, ANGLE_RIGHT);
      Body.rotate(leftF, ANGLE_RIGHT);
      Body.rotate(rightF, ANGLE_RIGHT);
    }
  });
  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
  renderOptions.wireframes = false;
};

Game.initMap = function() {
  var a = -50,
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

