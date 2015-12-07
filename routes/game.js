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
    // Notify client that connection received
    socket.emit('register', {id: 0});
    // Notify new client of those already connected
    for (var id in cars) {
      console.log('--', id);
      socket.emit('register', cars[id]);
    }
    // Notify all clients about this new connection
    data.id = socket.id;
    socket.broadcast.emit('register', data);
    // Save this new client
    cars[socket.id] = data;
  });
};

module.exports = game;