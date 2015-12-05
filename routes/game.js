/*
 *  Log movement of a client's car, and update all other clients
 */
var cars = {};

var game = function(socket) {
  socket.on('move', function (data) {
    console.log('SERVER MOVE', data, socket.id);
    data.id = socket.id;
    socket.broadcast.emit('move', data);
  });

  socket.on('register', function(data) {
    console.log('SERVER REGISTER', data);
    cars[socket.id] = data;
    data.id = socket.id;
    socket.broadcast.emit('register', data);
  });
};

module.exports = game;