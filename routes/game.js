/*
 *  Log movement of a client's car, and update all other clients
 */
var cars = {};

var game = function(socket) {
  socket.on('move', function (data) {
    data.id = socket.id;
    socket.broadcast.emit('move', data);
  });

  socket.on('register', function(data) {
    console.log('SERVER REGISTER', socket.id, data.position);
    // Notify new client of those already connected
    socket.emit('register', cars);
    // Notify all clients about this new connection
    var newClient = {};
    newClient[socket.id] = data;
    socket.broadcast.emit('register', newClient);
    // Save this new client
    cars[socket.id] = data;
  });
};

module.exports = game;