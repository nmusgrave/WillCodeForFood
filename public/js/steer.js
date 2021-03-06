/** -----------------------------------------------------------
 *  Handle steering of a client's car
 * ------------------------------------------------------------
 */

var ACCELERATION = 0.002;
var ICE_SLOWDOWN = 0.2;
var ANGLE = 0.06;
var ANGLE_MAX = Math.PI / 6;
var ICE_SPIN_SPEEDUP = 0.003;
var MAX_ICE_SPIN_SPEEDUP = ICE_SPIN_SPEEDUP * 100;

var KEY_UP = 'w';
var KEY_DOWN = 's';
var KEY_LEFT = 'a';
var KEY_RIGHT = 'd';


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
var handleClientSteering = function(car) {
  // Store current state of car
  var carData = {
    angle: car.angle,
    angularVelocity: car.angularVelocity,
    force: car.force,
    position: car.position,
    velocity: car.velocity
  };

  // Determine ice effects: turn off friction, and reduce acceleration
  var acceleration = ACCELERATION;
  /*
  if (isInIce(car)) {
    console.log('ICEY');
    acceleration *= ICE_SLOWDOWN;
    car.frictionAir = 0.000001;
  } else {
    car.frictionAir = GAME_FEATURES.CAR_FEATURES.frictionAir;
  }
  */

  // Apply user's action to the car's motion
  var forceVector;
  if (keypresses[KEY_LEFT] || keypresses[KEY_RIGHT]) {
    /*
    if (isInIce(car)) {
      var newAv = car.angularVelocity + (keypresses[KEY_LEFT] ? -ICE_SPIN_SPEEDUP : ICE_SPIN_SPEEDUP);
      newAv = Math.max(-MAX_ICE_SPIN_SPEEDUP, Math.min(MAX_ICE_SPIN_SPEEDUP, newAv));
      newAv = 0;
      setAngularVelocity(car, newAv);
    } else {
      setAngularVelocity(car, 0);
    }
    */
    setAngularVelocity(car, 0);
    car.rotationAngle += keypresses[KEY_LEFT] ? -ANGLE : ANGLE;
    if (car.rotationAngle >= ANGLE_MAX) {
      car.rotationAngle = ANGLE_MAX;
    } else if (car.rotationAngle <= -ANGLE_MAX) {
      car.rotationAngle = -ANGLE_MAX;
    }
  }
  if (keypresses[KEY_UP] || keypresses[KEY_DOWN]) {
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


var isInIce = function(car) {
  for (var ice of Game.iceBodies) {
    var left = ice.position.x - (ice.dimensions.x/2);
    var right = ice.position.x + (ice.dimensions.x/2);
    var up = ice.position.y - (ice.dimensions.y/2);
    var down = ice.position.y + (ice.dimensions.y/2);
    if (car.position.x >= left && car.position.x <= right && car.position.y >= up && car.position.y <= down) {
      return true;
    }
  }
  return false;
};
