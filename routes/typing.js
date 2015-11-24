/**
 * Retreive client input, and send out updates from other users
 */
var inputs = [];

var input = function(socket) {
  socket.on('input', function (data) {
    inputs.push(data);
    console.log('accepted: ' + data);
    sockets.broadcast.emit('update', {
      update: data
    });
  });
};

module.exports = input