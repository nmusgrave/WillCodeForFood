/**
 * ------------------------------------------------------------
 * Handles animating the car
 * ------------------------------------------------------------
 */

var ANIMATION_SPEED = 0.13;
var TOTAL_FRAMES = 4;
var NUM_FRAME_ROTATIONS = 16;
var TAU = 2 * Math.PI;

var handleAnimation = function(car, id) {
  // Set the car image
  var carChassis = car.bodies.filter(function(body) { return body.label === 'body'; })[0];
  var posAngle = ((carChassis.angle % TAU) + TAU) % TAU;
  var carAnglePercent = (posAngle / TAU) * ((1 + NUM_FRAME_ROTATIONS) / NUM_FRAME_ROTATIONS);
  var frameNum = ((Math.floor(carAnglePercent * NUM_FRAME_ROTATIONS) + (NUM_FRAME_ROTATIONS/2)) % NUM_FRAME_ROTATIONS) + 1;

  // Adjust frame number based off of current walk position/frame number
  Game.clients[id].frameNum += ANIMATION_SPEED * carChassis.speed/4;
  if (Math.floor(Game.clients[id].frameNum) >= TOTAL_FRAMES) {
    Game.clients[id].frameNum = Game.clients[id].frameNum % TOTAL_FRAMES;
  }

  var extraFrames;
  switch (Math.floor(Game.clients[id].frameNum)) {
    case 0:
      extraFrames = 0;
    break;
    case 1:
      extraFrames = NUM_FRAME_ROTATIONS;
    break;
    case 2:
      extraFrames = 0;
    break;
    case 3:
      extraFrames = NUM_FRAME_ROTATIONS * 2;
    break;
  }
  frameNum += extraFrames;

  var frameNumString = frameNum < 10 ? '0' + frameNum : frameNum;
  var carImage = car.bodies.filter(function(body) { return body.label === 'image'; })[0];
  carImage.render.sprite.texture = '/images/reindeer/reindeer_' + frameNumString + '.gif';
  setPosition(carImage, carChassis.position);
};
