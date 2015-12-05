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
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';

socket.on('move', function(data) {
  console.log('GOT MOVE', data);
});

var handleSteering = function(keypresses, car) {
  if (!keypresses[KEY_UP] && !keypresses[KEY_LEFT] && !keypresses[KEY_RIGHT]) {
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
  if (keypresses[KEY_UP]) {
    // Accelerate
    var parallelVector = Vector.mult({x: -Math.sin(car.angle), y: Math.cos(car.angle)}, ACCELERATION);
    forceVector = Vector.add(car.force, parallelVector);
    Body.applyForce(car, car.position, forceVector);
  }
  if (keypresses[KEY_LEFT]) {
    // Turn steering wheel left
    rotationAngle = ANGLE_LEFT;
    Body.rotate(car, ANGLE_LEFT);
  }
  if (keypresses[KEY_RIGHT]) {
    // Turn steering wheel right
    rotationAngle = ANGLE_RIGHT;
    Body.rotate(car, ANGLE_RIGHT);
  }

  // Publish changes to server
  movement.applyForce = forceVector;
  movement.applyRotation = rotationAngle;
  //socket.emit('move', movement);

  if (!SMOOTH_DRIVING) {
    keypresses[KEY_UP] = false;
    keypresses[KEY_LEFT] = false;
    keypresses[KEY_RIGHT] = false;
  }
};