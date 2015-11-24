/**
 *  Connect to server
 */
var socket = io.connect();
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
socket.on('ping', function (data) {
  var latency = +new Date() - data.startTime;
  // distance = rate * time
  var lightSpeed = 2 * 10^8; // meters per s, in optical fiber
  var distance = (lightSpeed * latency * 0.001) * 0.001;
  console.log(latency + ' ' + distance + ' km');
});

setInterval(function () {
  var startTime = +new Date();
  socket.emit('ping', { startTime: startTime });
}, 100);
