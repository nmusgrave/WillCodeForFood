/**
 * Respond to client with current time
 */

// Pass back current time (ms) to the client
var ping = function(socket) {
  socket.on('ping', function(data) {
    socket.emit('ping', {
      startTime: data.startTime,
      serverTime: +new Date()
    });
  });
};

module.exports = ping;
