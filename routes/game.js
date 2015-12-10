/*
 *  Log movement of a client's car, and update all other clients
 */

var game = require('../game/index.js');
var gameFeatures = require('../game/game-features.js');

var movements = function(socket) {
  socket.on('move', function (car) {
    car.id = socket.id;
    //console.log('MOVE', socket.id);

    // update the velocity for this car
    game.move(car);
  });

  /*
   * On new client connection, keep track of its car, and
   *  inform the client about previously-existing connections
   */
  socket.on('register', function(car) {
    console.log('SERVER REGISTER', socket.id, car.position);
    socket.emit('register', {});
    car.id = socket.id;
    game.register(car);
    /*
    // Notify new client of those already connected
    // Notify all clients about this new connection
    var newClient = {};
    newClient[socket.id] = data;
    socket.broadcast.emit('register', newClient);
    // Save this new client
    cars[socket.id] = data;
    */
  });

  socket.on('startGame', function(data) {
    socket.emit('startGame', gameFeatures);
  });
};

module.exports = movements;