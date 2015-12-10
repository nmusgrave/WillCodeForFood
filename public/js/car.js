/** -----------------------------------------------------------
 * Manufacture cars, and define car attributes
 * ------------------------------------------------------------
 */

var CAR_DIMENSIONS = {w: 20, h: 40};
var CAR_FEATURES = {
  density: 0.006,
  friction: 0.009,
  frictionAir: 0.009
};

var WHEEL_DIMENSIONS = {w: 8, h: 10};
var WHEEL_FEATURES = {
  density: 0.01,
  friction: 0,
  frictionStatic: 0,
  restitution: 0, // body elasticity
  slop: 0.0,
};

/*
 * @return {object} tire and its axel
 */
var wheelFactory = function(car, xOffset, yOffset) {
  var tire = Bodies.rectangle(car.position.x + xOffset, car.position.y + yOffset, WHEEL_DIMENSIONS.w, WHEEL_DIMENSIONS.h, WHEEL_FEATURES);
  var axel = Constraint.create({
      bodyA: car,
      pointA: { x: xOffset, y: yOffset },
      bodyB: tire,
      stiffness: 0.5
  });
  return {tire: tire, axel: axel};
};

/*
 * @return {composite} if wheels are requested, contains the car body and wheels
 *    or {body} if none requested
 */
var carFactory = function(game, carCenter, hasWheels, color) {
  var updated_features = $.extend({}, CAR_FEATURES, { render: { fillStyle: color, lineWidth: 0 } });
  var carBody = Bodies.rectangle(carCenter.x, carCenter.y, CAR_DIMENSIONS.w, CAR_DIMENSIONS.h, updated_features);
  // Offset between car's angle and the steering wheel
  carBody.rotationAngle = 0;
  game.car = carBody;

  if (!hasWheels) {
    return carBody;
  }

  // Make composite of body and wheels
  var carComposite = Composite.create({ label: 'Car' });
  Composite.addBody(carComposite, carBody);

  // Add the wheels to the car
  var wheelAOffset = CAR_DIMENSIONS.w * 0.5 + WHEEL_DIMENSIONS.w * 0.5,
      wheelYOffset = CAR_DIMENSIONS.h * 0.3;
  var wheels = [
    // front wheels
    wheelFactory(carBody, wheelAOffset, wheelYOffset),
    wheelFactory(carBody, -wheelAOffset, wheelYOffset),
    // rear wheels
    wheelFactory(carBody, wheelAOffset, -wheelYOffset),
    wheelFactory(carBody, -wheelAOffset, -wheelYOffset)
  ];
  var w;
  for (w of wheels) {
    Composite.addBody(carComposite, w.tire);
  }
  for (w of wheels) {
    Composite.addConstraint(carComposite, w.axel);
  }
  return carComposite;
};
