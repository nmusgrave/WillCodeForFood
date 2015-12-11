/** -----------------------------------------------------------
 *  Handle steering of a client's car
 * ------------------------------------------------------------
 */

var ACCELERATION = 0.0005;
var ICE_SPEEDUP = 5;
var ANGLE = 0.06;
var ANGLE_MAX = Math.PI / 6;

var KEY_UP = 'w';
var KEY_DOWN = 's';
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';

// TODO invoke to calculate new position
var updateClientPosition = function(carPosition, newPosition, new_vector) {
  var nextPosition = Vector.add(newPosition, new_vector);
  var nextVector = Vector.sub(nextPosition,carPosition);
  return nextVector;
};

socket.on('move', function(data) {
  var carData = clients.get(data.id);
  var clientCar = carData.car;
  Game.car.render.fillStyle = 'blue';
  clientCar.render.fillStyle = 'green';
  if (data.applyForce !== undefined) {
    Body.applyForce(clientCar, clientCar.position, data.applyForce);
  }
  if (data.applyRotation !== undefined) {
    Body.rotate(clientCar, data.applyRotation);
  }
});

/*
 * Steer this client's car using key input
 */
var steerLocal = function(car) {
  // Store current state of car
  var carData = {
    angle: car.angle,
    angularVelocity: car.angularVelocity,
    force: car.force,
    position: car.position,
    velocity: car.velocity
  };

  // CLIENT: Steering to apply
  var forceVector;
  // Apply user's action to the car's motion
  if (keypresses[KEY_LEFT] || keypresses[KEY_RIGHT]) {
    car.rotationAngle += keypresses[KEY_LEFT] ? -ANGLE : ANGLE;
    if (car.rotationAngle >= ANGLE_MAX) {
      car.rotationAngle = ANGLE_MAX;
    } else if (car.rotationAngle <= -ANGLE_MAX) {
      car.rotationAngle = -ANGLE_MAX;
    }
  }
  if (keypresses[KEY_UP] || keypresses[KEY_DOWN]) {
    var acceleration = ACCELERATION;
    if (isInIce(car)) {
      acceleration *= ICE_SPEEDUP;
    }
    var parallelVector = Vector.mult({x: -Math.sin(car.angle), y: Math.cos(car.angle)}, acceleration);
    forceVector = Vector.add(car.force, parallelVector);
    // Invert vector if going backwards
    forceVector = keypresses[KEY_UP] ? forceVector : Vector.neg(forceVector);
    var point = {x: car.position.x, y: car.position.y};
    Body.applyForce(car, point, forceVector);
  }

  // Suppress spinning freely
  Body.rotate(car, car.rotationAngle /** car.speed*/);
  car.rotationAngle = 0;

  // Publish changes to server
  carData.applyForce = forceVector;
  carData.applyRotation = car.rotationAngle;
  car.rotationAngle = 0;
  socket.emit('move', carData);
};

var handleSteering = function(car) {
  steerLocal(car);
};

var isInIce = function(car) {
  var iceDimensions = {x:202, y:125};
  var icePos = {x: 525, y:300};
  var left = icePos.x - (iceDimensions.x/2);
  var right = icePos.x + (iceDimensions.x/2);
  var up = icePos.y - (iceDimensions.y/2);
  var down = icePos.y + (iceDimensions.y/2);
  if (car.position.x >= left && car.position.y <= right && car.position.y >= up && car.position.y <= down) {
    return true;
  }
  return false;
};
