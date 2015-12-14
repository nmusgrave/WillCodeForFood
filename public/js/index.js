/**
 *  Connect to server
 */
var socket = io.connect();

var Matter = window.Matter;

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
var avgRTT;
var n = 100;
socket.on('ping', function (data) {
  var curTime = +new Date();
  var latencyServer = curTime - data.serverTime;
  var latencyRTT = curTime - data.startTime;
  if (!avgRTT) {
    avgRTT = 0;
  }
  avgRTT += ((latencyRTT) - avgRTT) / (n + 1);
    $('#serverlatency').text('to server: ' + latencyServer + ' ms');
  $('#rtt').text('current RTT: ' + latencyRTT + ' ms');
  $('#avgrtt').text('average RTT: ' + (avgRTT).toFixed(2) + ' ms');
});

var runPings = function(doPing) {
  if (!doPing) {
    return;
  }
  setInterval(function () {
    var startTime = +new Date();
    socket.emit('ping', { startTime: startTime });
  }, 100);
};


/**
 * Update web page with user input
 */
// Grab text from a user, and send to server
// Keep track of all users contributing text
var socketIDs = new Set();
socketIDs.add(socket.id);
function drawBulletChat() {
  // Create list element for this client
  var createdLI = false;
  $('input').keyup(function() {
    // Insert new list element when user first types
    if (!createdLI) {
      $('ul').append($('<li>').attr('id', socket.id).text(''));
      createdLI = true;
    }
    if (this.value.length === 0) {
      return;
    }
    var userInput = this.value;
    // Display this user's input
    $('#' + socket.id).text(userInput);
    // Notify server of input
    socket.emit('input', { text: userInput, });
  });
}

// Display updates from other users
socket.on('update', function (data) {
  if (!socketIDs.has(data.id)) {
    // Save this new ID and create an html list item
    socketIDs.add(data.id);
    $('ul').append($('<li>').attr('id', data.id).text(''));
  }
  // Update the text of the list item
  $('#' + data.id).css('color', 'blue').text(data.update.text);
});

// Create and start the game
socket.on('startGame', function(data) {
  // create and run a Matter.js engine
  var game = init(data, document.getElementById('canvas-container'));
  game.run();
});

/*
 *  Set up and run physics engine
 */
$(document).ready(function() {
  runPings(true);
  drawBulletChat();
  socket.emit('startGame', {});
  $('#reset').submit(function() {
    $(this).ajaxSubmit();
    return false;
  });
});


