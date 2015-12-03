
global.window = {};
var Matter = require('matter-js/build/matter.js');


var World = Matter.World;
var Bodies = Matter.Bodies;
var Engine = Matter.Engine;

// Create a new world
var world = World.create();

World.add(world, [
  Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
  Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
  Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 })
]);

console.log(world);

// var renderOptions = Engine.render.options;
// renderOptions.showAngleIndicator = false;
// renderOptions.showVelocity = true;


module.exports = {
  start: function() {
    console.log('Starting game...');
  }
};
