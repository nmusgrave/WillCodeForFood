/*
 *  Log movement of a client's car, and update all other clients
 */
var movement = function(socket) {
  socket.on('move', function (data) {
    console.log('SERVER', data, socket.id);
    data.id = socket.id;
    socket.broadcast.emit('move', data);
  });
};

module.exports = movement;