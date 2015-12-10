
var options = require('./matter-mock');
var GAME_FEATURES = require('../game/game-features.js');

var Matter = require('matter-js/build/matter.js');
var World = Matter.World;
var Events = Matter.Events;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Engine = Matter.Engine;

var engine = Engine.create(options);
var world = engine.world;
var cars = {};
var io;

var UPDATE_INTERVAL = 10; // ms
setInterval(function() {
  Engine.update(engine, UPDATE_INTERVAL);
}, UPDATE_INTERVAL);

var game = {};

/*
 * Communicate master copy of game to client
 */
Events.on(engine, 'afterUpdate', function() {
  game.cleanCars();

  // Translate car bodies to client-relevant data
  var carData = {};
  for (var id in cars) {
    carData[id] = {
      position: cars[id].position,
      angle: cars[id].angle,
      velocity: cars[id].velocity
    };
  }
  io.emit('tick', carData);
});

game.start = function(i) {
  io = i;
  console.log('Starting game...');
};

/**
 * Update a car position
 */
game.move = function(car) {
  cars[car.id] = car;
};

/*
 *  Create a car for a new client connection
 */
game.register = function(car) {
  console.log('GOT CAR');
  var carBody = Bodies.rectangle(car.position.x, car.position.y, GAME_FEATURES.CAR_DIMENSIONS.w, GAME_FEATURES.CAR_DIMENSIONS.h, GAME_FEATURES.CAR_FEATURES);
  Body.setVelocity(carBody, car.velocity);
  Body.setAngle(carBody, car.angle);
  cars[car.id] = carBody;
};

/*
 *  TODO clean out cars that are no longer used by clients
 */
game.cleanCars = function() {

};

module.exports = game;