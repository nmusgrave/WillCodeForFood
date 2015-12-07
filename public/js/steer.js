/** -----------------------------------------------------------
 *  Handle steering of a client's car
 * ------------------------------------------------------------
 */

if (SMOOTH_DRIVING) {
  var ACCELERATION = 0.001;
  var ANGLE_LEFT = -0.05;
  var ANGLE_RIGHT = 0.05;
} else {
  var ACCELERATION = 0.01;
  var ANGLE_LEFT = -0.5;
  var ANGLE_RIGHT = 0.5;
}

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

var handleSteering = function(car) {
  if (!keypresses[KEY_UP] && !keypresses[KEY_DOWN] && !keypresses[KEY_LEFT] && !keypresses[KEY_RIGHT]) {
    // no keys pressed, nothing to share
    return;
  }

  // Steering to apply
  var forceVector;
  var rotationAngle;
  // Store current state of car
  var movement = {
    car: car.label,
    angle: car.angle,
    angularSpeed: car.angularSpeed,
    angularVelocity: car.angularVelocity,
    force: car.force,
    position: car.position,
    velocity: car.velocity
  };

  // Apply user's action to the car's motion
  if (keypresses[KEY_LEFT] || keypresses[KEY_RIGHT]) {
    rotationAngle = keypresses[KEY_LEFT] ? ANGLE_LEFT : ANGLE_RIGHT;
    Body.rotate(car, rotationAngle);
  }
  if (keypresses[KEY_UP] || keypresses[KEY_DOWN]) {
    var parallelVector = Vector.mult({x: -Math.sin(car.angle), y: Math.cos(car.angle)}, ACCELERATION);
    forceVector = Vector.add(car.force, parallelVector);
    // Invert vector if going backwards
    forceVector = keypresses[KEY_UP] ? forceVector : Vector.neg(forceVector);
    Body.applyForce(car, car.position, forceVector);
  }

  if (!SMOOTH_DRIVING) {
    // Publish changes to server
    movement.applyForce = forceVector;
    movement.applyRotation = rotationAngle;
    socket.emit('move', movement);

    keypresses[KEY_UP] = false;
    keypresses[KEY_DOWN] = false;
    keypresses[KEY_LEFT] = false;
    keypresses[KEY_RIGHT] = false;
  }
};