/**
 *  Connect to server
 */
var socket = io.connect();

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
socket.on('ping', function (data) {
  var curTime = +new Date();
  var latencyServer = curTime - data.serverTime;
  var latencyRTT = curTime - data.startTime;
  console.log('ToServer: ' + latencyServer + ' RTT: ' + latencyRTT);
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
  $('input').keyup(function() {
    if (this.value.length === 0) {
      return;
    }
    var userInput = this.value;
    console.log('input: ' + userInput);
    // Display this user's input
    $('ul').append($('<li>').text(userInput));
    // Notify server of input
    socket.emit('input', { text: userInput, });
  });
});

// Display updates from other users
socket.on('update', function (data) {
  console.log('update: ' + data.update.text);
  $('ul').append($('<li>').text(data.update.text));
});
