/** -----------------------------------------------------------
 * Manufacture cars, and define car attributes
 * ------------------------------------------------------------
 * Caribou sprite from
 *    http://www.guelnika.net/images/charset/noel/caribou.png
 */

var caribou_colors = [ 'pink', 'red', 'blue', 'green', 'cyan', 'purple', 'yellow'];
var myGroupId = Math.floor(Math.random() * 100000);

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
var carFactory = function(carCenter, isClient) {
  var color;
  if (isClient) {
    color = 'santa';
  } else {
    color = caribou_colors[Math.floor(Math.random()*caribou_colors.length)];
  }

  var carBody = Bodies.rectangle(
    carCenter.x,
    carCenter.y,
    GAME_FEATURES.CAR_DIMENSIONS.w,
    GAME_FEATURES.CAR_DIMENSIONS.h,
    $.extend({
      label: 'body'
    }, GAME_FEATURES.CAR_FEATURES)
  );
  // Offset between car's angle and the steering wheel
  carBody.rotationAngle = 0;
  carBody.groupId = myGroupId;

  var imageSize = 2;
  var carImage = Bodies.rectangle(
    carCenter.x,
    carCenter.y,
    1,
    1,
    $.extend({
      label: 'image',
      render: {
        sprite: {
          xScale: imageSize,
          yScale: imageSize,
        }
      }
    }, GAME_FEATURES.CAR_FEATURES)
  );
  carImage.groupId = myGroupId;

  var carComposite = Composite.create();
  Composite.addBody(carComposite, carBody);
  Composite.addBody(carComposite, carImage);
  return carComposite;
};

var treeFactory = function(treePosition) {
  var render_features = {
    render: {
      lineWidth: 0,
      sprite: { texture: '/images/gametree.png' },
    },
    isStatic:true
  };
  var tree = Bodies.rectangle(treePosition.x, treePosition.y, 20, 40, render_features);
  return tree;
};

var iceFactory = function(icePosition) {
  var render_features = {
    render: {
      lineWidth: 0,
      sprite: { texture: '/images/pixel_ice1.png' }
    },
    isStatic:true,
  };
  var ice = Bodies.rectangle(icePosition.x, icePosition.y, 20, 40, render_features);
  ice.groupId = myGroupId;
  return ice;
};

var checkerFactory = function(checkerPosition) {
  var render_features = {
    render: {
      lineWidth: 0,
      sprite: { texture: '/images/checker.png' },
    },
    isStatic:true
  };
  var updated_features = $.extend({}, render_features);
  //var updated_features = GAME_FEATURES.CAR_FEATURES;
  var checker = Bodies.rectangle(checkerPosition.x, checkerPosition.y, 20, 20, updated_features);
  // Offset between car's angle and the steering wheel
  checker.rotationAngle = 0;
  checker.groupId = myGroupId;
  return checker;
};
