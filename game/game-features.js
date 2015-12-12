var gameFeatures = {
  CAR_DIMENSIONS: {w: 20, h: 50},
  CAR_FEATURES: {
    density: 0.9,
    friction: 0.9,
    frictionAir: 0.9,
    mass: 30
  },
  WHEEL_DIMENSIONS: {w: 8, h: 10},
  WHEEL_FEATURES: {
    density: 0.01,
    friction: 0,
    frictionStatic: 0,
    restitution: 0, // body elasticity
    slop: 0.0,
  }
};

module.exports = gameFeatures;
