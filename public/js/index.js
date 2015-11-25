/**
 *  Connect to server
 */
var socket = io.connect();

var Matter = window.Matter;//require('../node_modules/matter-js/build/matter.min.js');

/**
 * Calculate latency of connecting to server, every
 * several ms.
 */
socket.on('ping', function (data) {
  var curTime = +new Date();
  var latencyServer = curTime - data.serverTime;
  var latencyRTT = curTime - data.startTime;
  //console.log('ToServer: ' + latencyServer + ' RTT: ' + latencyRTT);
});

setInterval(function () {
  var startTime = +new Date();
  socket.emit('ping', { startTime: startTime });
}, 100);


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
    console.log('input: ' + userInput);
    // Display this user's input
    $('#' + socket.id).text(userInput);
    // Notify server of input
    socket.emit('input', { text: userInput, });
  });
};

// Display updates from other users
socket.on('update', function (data) {
  console.log('update: ' + data.update.text);
  if (!socketIDs.has(data.id)) {
    // Save this new ID and create an html list item
    socketIDs.add(data.id);
    $('ul').append($('<li>').attr('id', data.id).text(''));
  }
  // Update the text of the list item
  console.log(data.color);
  $('#' + data.id).css('color', data.color).text(data.update.text);
});


/**
 * Create a physics environment, and draw within it.
 */
// run the engine
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
var engine;
function createWorld() {
  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);
  Engine.run(engine);
}

$(document).ready(function() {
  drawBulletChat();

  // create a Matter.js engine
  engine = Engine.create(document.getElementById('canvas-container'));
  createWorld();
});


