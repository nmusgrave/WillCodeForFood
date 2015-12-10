/** -----------------------------------------------------------
 * Manufacture cars, and define car attributes
 * ------------------------------------------------------------
 */

/*
 *  Force the body's velocity to match
 */
var setVelocity = function(body, velocity) {
  body.positionPrev.x = body.position.x - velocity.x;
  body.positionPrev.y = body.position.y - velocity.y;
  body.velocity.x = velocity.x;
  body.velocity.y = velocity.y;
  body.speed = Vector.magnitude(body.velocity);
};

/*
 *  Force the body's position to match
 */
var setPosition = function(body, position) {
  var delta = Vector.sub(position, body.position);

  body.position.x = position.x;
  body.position.y = position.y;
  body.positionPrev.x += delta.x;
  body.positionPrev.y += delta.y;

  Vertices.translate(body.vertices, delta);
  Bounds.update(body.bounds, body.vertices, body.velocity);
};


/*
 * @return {object} tire and its axel
 */
var wheelFactory = function(car, xOffset, yOffset) {
  var tire = Bodies.rectangle(car.position.x + xOffset, car.position.y + yOffset,
    GAME_FEATURES.WHEEL_DIMENSIONS.w, GAME_FEATURES.WHEEL_DIMENSIONS.h, GAME_FEATURES.WHEEL_FEATURES);
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
  //var updated_features = $.extend({}, GAME_FEATURES.CAR_FEATURES, { render: { fillStyle: color, lineWidth: 0 } });
  var updated_features = GAME_FEATURES.CAR_FEATURES;
  var carBody = Bodies.rectangle(carCenter.x, carCenter.y, GAME_FEATURES.CAR_DIMENSIONS.w, GAME_FEATURES.CAR_DIMENSIONS.h, updated_features);
  // Offset between car's angle and the steering wheel
  carBody.rotationAngle = 0;

  if (!hasWheels) {
    return carBody;
  }

  // Make composite of body and wheels
  var carComposite = Composite.create({ label: 'Car' });
  Composite.addBody(carComposite, carBody);

  // Add the wheels to the car
  var wheelAOffset = GAME_FEATURES.CAR_DIMENSIONS.w * 0.5 + GAME_FEATURES.WHEEL_DIMENSIONS.w * 0.5,
      wheelYOffset = GAME_FEATURES.CAR_DIMENSIONS.h * 0.3;
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
