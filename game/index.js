
var options = require('./matter-mock');
var GAME_FEATURES = require('../game/game-features.js');

var Matter = require('matter-js/build/matter.js');
var World = Matter.World;
var Events = Matter.Events;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Engine = Matter.Engine;

var engine;
var world;
var cars;
var penguins;
var io;

var game = {};

game.start = function(i) {
  io = i;
  engine = Engine.create(options);
  world = engine.world;

  /*
   * Communicate master copy of game to client
   */
  Events.on(engine, 'afterUpdate', function() {
    game.cleanDeadCars();

    // Translate car bodies to client-relevant data
    var carData = {};
    for (var id in cars) {
      carData[id] = {
        position: cars[id].position,
        angle: cars[id].angle,
        velocity: cars[id].velocity
      };
    }

    io.emit('tick', {cars: carData, penguins: penguins});
  });

  var UPDATE_INTERVAL = 10; // ms
  setInterval(function() {
    Engine.update(engine, UPDATE_INTERVAL);
  }, UPDATE_INTERVAL);

  cars = {};
  penguins = {};
  console.log('Starting game...');
};

/**
 * Update a car position
 */
game.move = function(type, data) {
  if (type == 'car') {
    cars[data.id] = data;
  } else if (type == 'penguin') {
    // TODO store penguins updates
    for (var i in data) {
      penguins[data[i].label] = data[i];
    }
  }
};

/*
 *  Create a car for a new client connection
 */
game.register = function(car) {
  console.log('GOT CAR');
  cars[car.id] = car;
};

game.reset = function() {
  cars = {};
};

game.toJSON = function() {
  return {
    cars: cars,
    penguins: penguins
  };
};

/*
 *  clean out cars that are no longer used by clients
 */
game.cleanDeadCars = function() {
  var badIDs = [];
  for (var id in cars) {
    if (io.sockets.connected[id] === undefined) {
      badIDs.push(id);
    }
  }
  for (id in badIDs) {
    delete cars[badIDs[id]];
  }
};

module.exports = game;