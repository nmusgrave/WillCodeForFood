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
    console.log('SERVER REGISTER', socket.id, data.position);
    // Acknowledge this client's connection
    socket.emit('register', {id: 0, text: 'ACK'});
    // Notify new client of those already connected
    for (var car in cars) {
      socket.emit('register', car);
    }
    // Notify all other clients about this new connection
    data.id = socket.id;
    socket.broadcast.emit('register', data);
    // Save this new client
    cars[socket.id] = data;
  });
};

module.exports = game;