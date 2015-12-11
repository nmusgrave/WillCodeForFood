/**
 * ------------------------------------------------------------
 * Draw the elements of the physics environment
 * ------------------------------------------------------------
 */

Game.initMap = function() {
  // Trees
  for (var i = 0 ; i < 10; ++i) {
    var x = Math.random() * 800;
    var y = Math.random() * 600;
    if ((x > 500 && x < 550) && (y > 250 && y < 350)) {
         continue;
    }
    var treePosition = {x:x,y:y};
    var tree = treeFactory(treePosition);
    //World.add(world, tree);
  }
  drawRoads();
  drawIce();
};

// Sets up canvas for the game (background color, size, resizing)
Game.initCanvas = function(container) {
  var canvas = document.createElement('canvas');
  canvas.width = 860;
  canvas.height = 600;
  this.canvas = canvas;
  // Resize game on window resize
  /*
  $(window).resize(function(){
      var container = document.getElementById('canvas-container');
      Game.canvas.width = $(container).width();
      Game.canvas.height = $(container).height();
      // TODO how redraw map on window resize?
  });
  */
  var render = {
    canvas: canvas,
      options: {
        background: 'darkslategrey',
        width: canvas.width,
        height: canvas.height,
      }
    };
  return render;
};

var drawIce = function() {
  var ice = iceFactory({x: 525, y: 300});  
  World.add(world, ice);
};

var drawRoads = function() {
  // Draw the path on the map
  var a = 0,
      b = 0,
      c = 0,
      d = 0;
  world.bounds.min.x = -500;
  world.bounds.min.y = -500;
  world.bounds.max.x = 1500;
  world.bounds.max.y = 1500;
  World.add(world, [
    // SMALL BOX FOR TESTING
    // top
    Bodies.rectangle(500 + a, 200 + b, 700 + c, 10 + d, { isStatic: true}),
    // bot
    //Bodies.rectangle(500 + a, 500 + b, 700 + c, 10 + d, { isStatic: true}),
    // left
    Bodies.rectangle(150 + a, 350 + b, 10 + c, 300 + d, { isStatic: true}),
    // right
    Bodies.rectangle(850 + a, 350 + b, 10 + c, 300 + d, { isStatic: true})

    /* FULL MAP
    // top
    Bodies.rectangle(950 + a, 300 + b, 900 + c, 10 + d, { isStatic: true}),
    // bot
    Bodies.rectangle(900 + a, 1300 + b, 1000 + c, 10 + d, { isStatic: true}),
    // left
    Bodies.rectangle(400 + a, 900 + b, 10 + c, 800 + d, { isStatic: true}),
    // right
    Bodies.rectangle(1400 + a, 800 + b, 10 + c, 1000 + d, { isStatic: true}),

    // top entry and dest
    Bodies.rectangle(400 + a, 400 + b, 200 + c, 10 + d, { isStatic: true}),
    Bodies.rectangle(400 + a, 300 + b, 10 + c, 200 + d, { isStatic: true}),
    Bodies.rectangle(450 + a, 200 + b, 100 + c, 10 + d, { isStatic: true}),
    Bodies.rectangle(500 + a, 250 + b, 10 + c, 100 + d, { isStatic: true}),
    Bodies.rectangle(300 + a, 450 + b, 10 + c, 100 + d, { isStatic: true}),
    Bodies.rectangle(350 + a, 500 + b, 100 + c, 10 + d, { isStatic: true}),

    // roads
    Bodies.rectangle(500 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1300 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(900 + a, 1200 + b, 800 + c, 10 + d, { isStatic: true}),

    Bodies.rectangle(600 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1200 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(700 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1100 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(800 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),
    Bodies.rectangle(1000 + a, 700 + b, 10 + c, 800 + d, { isStatic: true}),

    Bodies.rectangle(900 + a, 800 + b, 10 + c, 800 + d, { isStatic: true}),
    // Bodies.rectangle(200, 150, 650, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    */
  ]);
};