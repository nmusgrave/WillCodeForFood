/*
 *  Log movement of a client's car, and update all other clients
 */

var game = require('../game/index.js');
var gameFeatures = require('../game/game-features.js');

var movements = function(socket) {
  /*
   *  Keep track of a client's movements
   */
  socket.on('move', function (car) {
    car.id = socket.id;
    //console.log('MOVE', socket.id);

    // update the velocity for this car
    game.move(car);
  });

  /*
   *  On new client connection, keep track of its car
   */
  socket.on('register', function(car) {
    console.log('SERVER REGISTER', socket.id, car.position);
    socket.emit('register', {});
    car.id = socket.id;
    game.register(car);
  });

  socket.on('startGame', function(data) {
    socket.emit('startGame', gameFeatures);
  });
};

module.exports = movements;