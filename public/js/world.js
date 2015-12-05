/**
 * Create a physics environment, and draw within it.
 */
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies;

var engine;
var world;
var render;

var Game = {};
var KEY_UP = 'w';
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';

var ACCELERATION = 0.001;
var ANGLE_LEFT = -0.05;
var ANGLE_RIGHT = 0.05;

var init = function(container) {
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

// Stores current keypress states
var keypresses = {};

Game.run = function() {
  // Take user input from keyboard to steer car

  // REGISTERS ON HOLDING DOWN KEY
  $(document).keydown(function(event){
    var key = String.fromCharCode(event.which).toLowerCase();
    keypresses[key] = true;
  });
  // REGISTERS ON RELEASE KEY
  $(document).keyup(function(event){
    console.log('UP');
    var key = String.fromCharCode(event.which).toLowerCase();
    keypresses[key] = false;
    //keypresses[key] = true;
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


  var has_wheels = true;   // TODO v hard to drive w wheels
  var carInitialPosition = {x: 430, y: 300};
  var car = carFactory(this, carInitialPosition, has_wheels);

  world.gravity.y = 0;
  World.add(world, [car/*, this.ground*/]);
};


Game.initEvents = function() {
  var car = Game.car,
      oldcar = {x : car.position.x , y : car.position.y};
  // Before rendering each frame, check the key presses and update the car's position.
  Events.on(engine, 'beforeTick', function() {
    Bounds.translate(render.bounds, Vector.sub(car.position, oldcar));
    oldcar = {x : car.position.x , y : car.position.y};
    if (keypresses[KEY_UP]) {
      // Accelerate
      var parallelVector = Vector.mult({x: -Math.sin(car.angle), y: Math.cos(car.angle)}, ACCELERATION);
      Body.applyForce(car, car.position, Vector.add(car.force, parallelVector));
    }
    if (keypresses[KEY_LEFT]) {
      // Turn steering wheel left
      Body.rotate(car, ANGLE_LEFT);
    }
    if (keypresses[KEY_RIGHT]) {
      // Turn steering wheel right
      Body.rotate(car, ANGLE_RIGHT);
    }

    /*
    if (keypresses[KEY_UP] || keypresses[KEY_LEFT] || keypresses[KEY_RIGHT]) {
      // TODO publish changes to server
      var movement = {
        car: car.label,
        angle: car.angle,
        angularSpeed: car.angularSpeed,
        angularVelocity: car.angularVelocity,
        force: car.force,
        position: car.position,
        velocity: car.velocity,

      };
      socket.emit('move', movement);
      keypresses[KEY_UP] = false;
      keypresses[KEY_LEFT] = false;
      keypresses[KEY_RIGHT] = false;
    }
    */
  });

  var renderOptions = engine.render.options;
  renderOptions.hasBounds = true;
  renderOptions.wireframes = false;
};


socket.on('move', function(data) {
  console.log('GOT MOVE', data);
});


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

// Sets up canvas for the game (background color, size, resizing)
Game.initCanvas = function(container) {
  var canvas = document.createElement('canvas');

  canvas.width = $(container).width();
  canvas.height = 600;
  this.canvas = canvas;

  // Resize game on window resize
  $(window).resize(function(){
      var container = document.getElementById('canvas-container');
      Game.canvas.width = $(container).width();
      Game.canvas.height = $(container).height();
      // TODO how redraw map on window resize?
  });

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
