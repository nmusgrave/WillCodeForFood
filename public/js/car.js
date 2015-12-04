var Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;

var CAR_DIMENSIONS = {w: 50, h: 100};
var CAR_FEATURES = {
  density: 5,
  friction: 0.3,
  frictionAir: 0.9,
  postion: {x: 0, y: 0},
};

var WHEEL_DIMENSIONS = {w: 20, h: 30};
var WHEEL_FEATURES = {
  restitution: 0.5, 
  friction: 0.9,
  frictionStatic: 10,
  slop: 0.5,
  density: 0.01
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
 * @return {composite} containing the car body and wheels
 */
var carFactory = function(game, carCenter) {
  var carComposite = Composite.create({ label: 'Car' });
  var carBody = Bodies.rectangle(carCenter.x, carCenter.y, CAR_DIMENSIONS.w, CAR_DIMENSIONS.h, 0.3, CAR_FEATURES);
  game.car = carBody;
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
