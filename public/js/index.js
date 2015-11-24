/**
 *  Connect to server
 */
var socket = io.connect();

socket.on('news', function (data) {
  //console.log(data);
  socket.emit('my other event', { my: 'data' });
});

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
socket.on('ping', function (data) {
  var curTime = +new Date();
  var latencyServer = curTime - data.serverTime;
  var latencyRTT = curTime - data.startTime;
  console.log('ToServer: ' + latencyServer + ' RTT: ' +
   latencyRTT);
});

setInterval(function () {
  var startTime = +new Date();
  socket.emit('ping', { startTime: startTime });
}, 100);

/**
 * Update web page with user input
 */
// Grab text from a user, and send to server
$(document).ready(function() {
  $('input').keypress(function() {
    var userInput = this.value;
    socket.emit('input', { text: userInput, });
  });
});

socket.on('update', function (data) {
  console.log('updating ' + data);
  $(document).ready(function(data) {
    console.log('appending ' + data);
    $('ul').append(data);
  });
});
