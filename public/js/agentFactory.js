/** -----------------------------------------------------------
 * Manufacture cars, and define car attributes
 * ------------------------------------------------------------
 * Sprites from
 *    http://opengameart.org/content/platformer-art-ice-world/
 *    http://pixsearching.com/pictures/frost-texture-png/
 *    http://iconsparadise.com/flat-icons/flat-christmas/
 */

var caribou_colors = [ 'pink', 'red', 'blue', 'green', 'cyan', 'purple', 'yellow'];
var myGroupId = Math.floor(Math.random() * 100000);
var iceDimensions = [
  {x:203, y:119},
  {x:108, y:145},
  {x:204, y:94},
  {x:131, y:146}
];

var spriteAttributes = {
  olaf0: {
    num: 1,
    path: '/images/olaf0',
    dimensions: {x:60, y:60}
  },
  olaf1: {
    num: 1,
    path: '/images/olaf1',
    dimensions: {x:20, y:20}
  },
  olaf2: {
    num: 1,
    path: '/images/olaf2',
    dimensions: {x:30, y:30}
  },
  olaf3: {
    num: 1,
    path: '/images/olaf3',
    dimensions: {x:20, y:20}
  },
  olaf4: {
    num: 1,
    path: '/images/olaf4',
    dimensions: {x:80, y:80}
  },
  icerock: {
    num: 2,
    path: '/images/icerock',
    dimensions: {x:20, y:20}
  },
  tree: {
    num: 4,
    path: '/images/tree',
    dimensions: {x:20, y:20}
  },
  spikes: {
    num: 3,
    path: '/images/spikes',
    dimensions: {x:70, y:20}
  },
  iceBorder: {
    num: 2,
    path: '/images/snow',
    dimensions: {x:70, y:70}
  },
  snowman: {
    num: 3,
    path: '/images/snowman',
    dimensions: {x:20, y:20}
  },
  checker: {
    num: 1,
    path: '/images/checker',
    dimensions: {x:20, y:20}
  },
  candyCane: {
    num: 4,
    path: '/images/candyCane',
    dimensions: {x:72, y:142}
  },
  gift: {
    num: 5,
    path: '/images/gift',
    dimensions: {x:64, y:64}
  },
  sleigh: {
    num: 1,
    path: '/images/sleigh',
    dimensions: {x:64, y:64}
  },
  penguin: {
    num: 1,
    path: '/images/penguin',
    dimensions: {x:20, y:20}
  },
  ornament: {
    num: 1,
    path: '/images/ornament',
    dimensions: {x:32, y:32}
  },
  hat: {
    num: 1,
    path: '/images/ornament',
    dimensions: {x:64, y:64}
  },
  snowflake: {
    num: 1,
    path: '/images/snowflake',
    dimensions: {x:256, y:256}
  }
};

/*
 *  -------------------------------
 *  Position controls
 * -------------------------------
 */
var setVelocity = function(body, velocity) {
  body.positionPrev.x = body.position.x - velocity.x;
  body.positionPrev.y = body.position.y - velocity.y;
  body.velocity.x = velocity.x;
  body.velocity.y = velocity.y;
  body.speed = Vector.magnitude(body.velocity);
};

var setPosition = function(body, position) {
  var delta = Vector.sub(position, body.position);

  body.position.x = position.x;
  body.position.y = position.y;
  body.positionPrev.x += delta.x;
  body.positionPrev.y += delta.y;

  Vertices.translate(body.vertices, delta);
  Bounds.update(body.bounds, body.vertices, body.velocity);
};

var setAngularVelocity = function(body, velocity) {
  body.anglePrev = body.angle - velocity;
  body.angularVelocity = velocity;
  body.angularSpeed = Math.abs(body.angularVelocity);
};

/*
 * -------------------------------
 * Agent factory
 * @return {composite} if wheels are requested, contains the car body and wheels
 *    or {body} if none requested
 * -------------------------------
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


/* --------------------
 *  Decoration factories
 * --------------------
 */

var factory = function(image, position) {
  var attr = spriteAttributes[image];
  if (attr.num == 1) {
    var image_num = '';
  } else {
    var image_num = Math.floor(Math.random() * attr.num);
  }
  if(image == 'penguin' || image == 'olaf0' || image == 'olaf1'
      || image == 'olaf2' || image == 'olaf3' || image == 'olaf4'){
    var body = nonspriteFactory(attr.path + image_num + '.png', position, attr.dimensions, false);
  } else if(image == 'icerock' || image == 'olaf'){
    var body = nonspriteFactory(attr.path + image_num + '.png', position, attr.dimensions, true);
  }else{
    var body = spriteFactory(attr.path + image_num + '.png', position, attr.dimensions, true);
  }
  return body;
};

var icePatchFactory = function(position) {
  var image_num = Math.floor(Math.random() * iceDimensions.length);
  var ice = spriteFactory('/images/pixel_ice' + image_num + '.png', position, {x:100, y:100}, true);
  ice.dimensions = iceDimensions[image_num];
  return ice;
};

var spriteFactory = function(path, position, dimensions, isStatic) {
  var render_features = {
    render: {
      lineWidth: 0,
      sprite: { texture: path},
    },
    isStatic: isStatic
  };
  var body = Bodies.rectangle(position.x, position.y, dimensions.x, dimensions.y, render_features);
  body.groupId = myGroupId;
  return body;
};

var nonspriteFactory = function(path, position, dimensions, isStatic) {
  var render_features = {
    render: {
      lineWidth: 0,
      sprite: { texture: path},
    },
    isStatic: isStatic
  };
  var body = Bodies.rectangle(position.x, position.y, dimensions.x, dimensions.y, render_features);
  body.groupId = 0;
  return body;
};
