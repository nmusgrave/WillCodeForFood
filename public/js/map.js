/**
 * ------------------------------------------------------------
 * Draw the elements of the physics environment
 * ------------------------------------------------------------
 */

Game.initMap = function() {
  drawRoads();
  drawIce();
  drawStartingLine();
  drawTree();
};

var drawStartingLine = function() {
  for (var i = 0 ; i < 5; ++i) {
    var checkerPosition = {x:430,y:169 + (48*i)};
    var checker = checkerFactory(checkerPosition);
    World.add(world, checker);
  }
};

var drawIce = function() {
  var ice = iceFactory({x: 525, y: 300});
  World.add(world, ice);
};

var drawTree = function() {
  // bot in side road
  for (var i = 0 ; i < 35; ++i) {
    var treePosition = {x:-380 + (i*40),y:110};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // mid in side road
  for (var i = 0 ; i < 10; ++i) {
    var treePosition = {x:-10 + (i*40),y:-100};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // mid in side road
  for (var i = 0 ; i < 17; ++i) {
    var treePosition = {x:390 + (i*40),y:-100 + (i*14)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // mid in side road
  for (var i = 0 ; i < 3; ++i) {
    var treePosition = {x:-10,y:-100 - (i*60)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // mid in side road
  for (var i = 0 ; i < 8; ++i) {
    var treePosition = {x:-10 - (i*13),y:-280 - (i*30)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // mid in side road
  for (var i = 0 ; i < 5; ++i) {
    var treePosition = {x:-84 + (i*13),y:-520 - (i*30)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }

  // top in side road
  for (var i = 0 ; i < 15; ++i) {
    var treePosition = {x:-19 + (i*40),y:-650};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // top in side road
  for (var i = 0 ; i < 23; ++i) {
    var treePosition = {x:-340 + (i*40),y:-720};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (var i = 0 ; i < 4; ++i) {
    var treePosition = {x:-340 - (i * 20),y:-720 + (i * 60)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (var i = 0 ; i < 6; ++i) {
    var treePosition = {x:-385 + (i * 35),y:-495 + (i * 15)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (var i = 0 ; i < 5; ++i) {
    var treePosition = {x:-210,y:-405 + (i * 60)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (var i = 0 ; i < 5; ++i) {
    var treePosition = {x:-230 - (i * 35),y:-155 + (i * 60)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }

  // bot out side road
  for (var i = 0 ; i < 50; ++i) {
    var treePosition = {x:-500 + (i*40),y:380};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }

  // right out side road
  for (var i = 0 ; i < 12; ++i) {
    var treePosition = {x:1500 - (i*20),y:380 - (i * 35)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 33; ++i) {
    var treePosition = {x:1300 - (i*30),y:0 - (i * 10)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 7; ++i) {
    var treePosition = {x:310 - (i*30),y:-330 - (i * 20)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 19; ++i) {
    var treePosition = {x:140 + (i*30),y:-470};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 5; ++i) {
    var treePosition = {x:710 + (i*20),y:-490 - (i*20)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 3; ++i) {
    var treePosition = {x:790,y:-550 - (i*60)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (var i = 0 ; i < 10; ++i) {
    var treePosition = {x:770 - (i*20),y:-720 - (i*15)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // top out side road
  for (var i = 0 ; i < 32; ++i) {
    var treePosition = {x:570 - (i*30),y:-870};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (var i = 0 ; i < 7; ++i) {
    var treePosition = {x:-360 - (i*30),y:-870 + (i * 25)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (var i = 0 ; i < 5; ++i) {
    var treePosition = {x:-570 - (i*10),y:-690 + (i * 50)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (var i = 0 ; i < 6; ++i) {
    var treePosition = {x:-600 + (i*15),y:-440 + (i * 50)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (var i = 0 ; i < 6; ++i) {
    var treePosition = {x:-540 - (i*15),y:-140 + (i * 50)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (var i = 0 ; i < 6; ++i) {
    var treePosition = {x:-610 + (i*15),y:120 + (i * 50)};
    var tree = treeFactory(treePosition);
    World.add(world, tree);
  }
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

var drawRoads = function() {
  var a = -800,
      b = -1000,
      c = 0,
      d = 0;
  world.bounds.min.x = -4000;
  world.bounds.min.y = -2000;
  world.bounds.max.x = 4000;
  world.bounds.max.y = 2000;
  World.add(world, [

    // FULL MAP
    // top road
    Bodies.rectangle(900 + a, 150 + b, 900 + c, 10 + d, { isStatic: true}),
    Bodies.rectangle(900 + a, 300 + b, 900 + c, 10 + d, { isStatic: true}),

    //left road (top down order)
    // out side
    Bodies.rectangle(390 + a, 170 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.9 }),
    Bodies.rectangle(280 + a, 250 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.7 }),
    Bodies.rectangle(220 + a, 370 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.6 }),
    Bodies.rectangle(200 + a, 480 + b, 80 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),
    Bodies.rectangle(240 + a, 660 + b, 300 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.4 }),
    Bodies.rectangle(240 + a, 960 + b, 330 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.6 }),

    // in side
    Bodies.rectangle(430 + a, 330 + b, 80 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.7 }),
    Bodies.rectangle(395 + a, 400 + b, 80 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.6 }),
    Bodies.rectangle(385 + a, 450 + b, 40 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),
    Bodies.rectangle(480 + a, 540 + b, 250 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.2 }),
    Bodies.rectangle(580 + a, 700 + b, 170 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),
    Bodies.rectangle(490 + a, 960 + b, 400 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.65 }),

    // bot road
    Bodies.rectangle(230 + a, 1250 + b, 320 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.4 }),
    Bodies.rectangle(1280 + a, 1390 + b, 2000 + c, 10 + d, { isStatic: true, angle: Math.PI}),
    Bodies.rectangle(1120 + a, 1140 + b, 1450 + c, 10 + d, { isStatic: true, angle: Math.PI}),


    // right top road (top down order)
    // out side
    Bodies.rectangle(1420 + a, 170 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.1 }),
    Bodies.rectangle(1540 + a, 250 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.3 }),
    Bodies.rectangle(1580 + a, 380 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),
    Bodies.rectangle(1520 + a, 500 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.8 }),

    // mid road
    Bodies.rectangle(1050 + a, 380 + b, 600 + c, 10 + d, { isStatic: true, angle: Math.PI }),
    Bodies.rectangle(1200 + a, 540 + b, 550 + c, 10 + d, { isStatic: true, angle: Math.PI }),
    Bodies.rectangle(1350 + a, 340 + b, 90 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),

    // right bot road (top down order)
    // in side
    Bodies.rectangle(730 + a, 450 + b, 150 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.6 }),
    Bodies.rectangle(750 + a, 660 + b, 300 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.4 }),
    Bodies.rectangle(1500 + a, 1030 + b, 700 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.1 }),

    // out side
    Bodies.rectangle(1050 + a, 630 + b, 300 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.2 }),
    Bodies.rectangle(980 + a, 920 + b, 380 + c, 10 + d, { isStatic: true, angle: Math.PI }),
    Bodies.rectangle(800 + a, 860 + b, 120 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.5 }),
    Bodies.rectangle(1640 + a, 870 + b, 1000 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.1 }),
    Bodies.rectangle(2180 + a, 1210 + b, 450 + c, 10 + d, { isStatic: true, angle: Math.PI * 0.35 })
  ]);
};
