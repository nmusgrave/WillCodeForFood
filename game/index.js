
global.document = {
  createElement: function(){
    // Canvas
    return {
      getContext: function() {
        return {};
      }
    };
  }
};
global.window = {};
var Matter = require('matter-js/build/matter.js');


var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Engine = Matter.Engine;

// Create a new world
// HACK HACK HACK
// matter.js isn't supposed to work on server-side, we do hacks to make it work.
var options = {
  render: {
    element: null,
    controller: {
      create: function() {},
      clear: function() {},
      world: function() {}
    }
  },
  input: {
    mouse: {}
  }
};
var engine = Engine.create(options);
// END OF HACK HACK HACK
world = engine.world;

var a = Bodies.rectangle(190, 300, 60, 60, { frictionAir: 0.001 });
var b = Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.05 });
World.addBody(world, a);
World.addBody(world, b);

// console.log(a.position);

Body.applyForce(a, {
  x: 0,
  y: 0
}, {
  x: 0,
  y: -1
});

var UPDATE_INTERVAL = 10; // ms
setInterval(function() {
  Engine.update(engine, UPDATE_INTERVAL);

  Body.applyForce(a, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0.01
  });

  // console.log(a.position);
}, UPDATE_INTERVAL);

module.exports = {
  start: function() {
    console.log('Starting game...');
  }
};
