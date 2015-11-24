/**
 * Retreive client input, and send out updates from other users
 */
var colors = require('./colors');

var userInputs = {};
var input = function(socket) {
  socket.on('input', function (data) {
    userInputs[socket.id] = data;
    socket.broadcast.emit('update', {
      id: socket.id,
      update: data,
      color: colors[Math.floor(Math.random() * (colors.length - 1)) + 1]
    });
  });
};

module.exports = input;