/**
 *  Connect to server
 */
var socket = io.connect();

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
socket.on('ping', function (data) {
  var latency = +new Date() - data.startTime;
  console.log(latency);
});

setInterval(function () {
  var startTime = +new Date();
  socket.emit('ping', { startTime: startTime });
}, 100);
