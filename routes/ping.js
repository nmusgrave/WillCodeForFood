/**
 * Respond to client with current time
 */

// Return ms
var ping = socket.on('ping', function(data) {
  console.log('received ping');
  return +new Date();
});

module.exports.ping = ping