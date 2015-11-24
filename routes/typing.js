/**
 * Retreive client input, and send out updates from other users
 */
var userInputs = {};
var input = function(socket) {
  socket.on('input', function (data) {
    console.log('accepted: ' + data);
    userInputs[socket.id] = data;
    socket.broadcast.emit('update', {
      id: socket.id,
      update: data
    });
  });
};

module.exports = input;