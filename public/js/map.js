/**
 * ------------------------------------------------------------
 * Draw the elements of the physics environment
 * ------------------------------------------------------------
 */

Game.initMap = function() {
  drawRoads();
  drawIcePatches(this);
  drawStartingLine();
  //drawWallDecorations();
  drawTree();
  drawForest();
  drawIcerock();
  drawPenguin();
};

var drawStartingLine = function() {
  for (var i = 0 ; i < 5; ++i) {
    var checkerPosition = {x:430,y:169 + (48*i)};
    var checker = factory('checker', checkerPosition);
    World.add(world, checker);
  }
};

var drawIcePatches = function(Game) {
  var icePositions = [
    {x: 0, y: 300},
    {x: 240, y: 200},
    {x: -250, y: 200},
    {x: 1230, y: 120},
    {x: 1150, y: 320},
    {x: 1315, y: 320},
    {x: 950, y: -15},
    // top four ice road
    {x: -100, y: -790},
    {x: 100, y: -790},
    {x: 300, y: -790},
    {x: 500, y: -790},
  ];
  for (var i in icePositions) {
    var ice = icePatchFactory(icePositions[i]);
    World.add(world, ice);
    Game.iceBodies.add(ice);
  }
};

drawIcerock = function() {
  var icerockPosition;
  var icerock;
  var i;
  for (i = 0 ; i < 15; ++i) {
    var x = Math.random() * (500 - 230) + 230;
    var y = Math.random() * (-700 + 800) - 800;
    icerockPosition = {x:x ,y:y};
    icerock = factory('icerock', icerockPosition);
    World.add(world, icerock);
  }
};

drawPenguin = function() {
  var penguinPosition;
  var penguin;
  var i;
  for (i = 0 ; i < 10; ++i) {
    var x = Math.random() * (350 - 100) + 100;
    var y = Math.random() * (-700 + 800) - 800;
    penguinPosition = {x:-x ,y:y};
    penguin = factory('penguin', penguinPosition);
    World.add(world, penguin);
  }

};

drawForest = function() {
  var treePositions = [
    {x: -480, y: -15},
    {x: -390, y: -80},
    {x: -300, y: -230},
    {x: -325, y: -303},
    {x: -375, y: -315},
    {x: -365, y: -205},
    {x: -450, y: -165},
    {x: -500, y: -340},
    {x: -430, y: -230},
    {x: -400, y: -365},
    {x: -445, y: -430},
    {x: -535, y: -410},
    {x: -525, y: -525}
  ];
  for (var i in treePositions) {
    var tree = factory('tree', treePositions[i]);
    tree.groupId = 1;
    World.add(world, tree);
  }
};

var drawTree = function() {
  var treePosition;
  var tree;
  var i;
  // bot in side road
  for (i = 0 ; i < 35; ++i) {
    treePosition = {x:-380 + (i*40),y:115};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // right mid in side road
  for (i = 0 ; i < 5; ++i) {
    treePosition = {x:-10 + (i*80),y:-100};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right mid in side road
  for (i = 0 ; i < 9; ++i) {
    treePosition = {x:390 + (i*80),y:-100 + (i*28)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right mid in side road
  for (i = 0 ; i < 2; ++i) {
    treePosition = {x:-10,y:-100 - (i*120)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right mid in side road
  for (i = 0 ; i < 4; ++i) {
    treePosition = {x:-10 - (i*26),y:-280 - (i*60)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right mid in side road
  for (i = 0 ; i < 3; ++i) {
    treePosition = {x:-84 + (i*26),y:-520 - (i*60)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }

  // top in side road
  for (i = 0 ; i < 7; ++i) {
    treePosition = {x:-19 + (i*80),y:-630};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // top in side road
  for (i = 0 ; i < 23; ++i) {
    treePosition = {x:-340 + (i*40),y:-730};
    tree = factory('iceBorder', treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (i = 0 ; i < 5; ++i) {
    treePosition = {x:-340 - (i * 20),y:-700 + (i * 40)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (i = 0 ; i < 6; ++i) {
    treePosition = {x:-385 + (i * 35),y:-495 + (i * 15)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (i = 0 ; i < 4; ++i) {
    treePosition = {x:-210,y:-380 + (i * 40)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left in side road
  for (i = 0 ; i < 8; ++i) {
    treePosition = {x:-225 - (i * 20),y:-200 + (i * 40)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // bot out side road
  for (i = 0 ; i < 50; ++i) {
    treePosition = {x:-500 + (i*40),y:370};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 6; ++i) {
    treePosition = {x:1500 - (i*40),y:380 - (i * 70)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 16; ++i) {
    treePosition = {x:1300 - (i*60),y:0 - (i * 20)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 4; ++i) {
    treePosition = {x:310 - (i*60),y:-330 - (i * 40)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 10; ++i) {
    treePosition = {x:140 + (i*60),y:-470};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 2; ++i) {
    treePosition = {x:710 + (i*40),y:-490 - (i*40)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 2; ++i) {
    treePosition = {x:790,y:-550 - (i*120)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // right out side road
  for (i = 0 ; i < 5; ++i) {
    treePosition = {x:770 - (i*40),y:-720 - (i*30)};
    tree = factory('snowman', treePosition);
    World.add(world, tree);
  }
  // top out side road
  for (i = 0 ; i < 32; ++i) {
    treePosition = {x:570 - (i*30),y:-820};
    var tree = factory('spikes',treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (i = 0 ; i < 7; ++i) {
    treePosition = {x:-360 - (i*30),y:-870 + (i * 25)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (i = 0 ; i < 5; ++i) {
    treePosition = {x:-570 - (i*10),y:-690 + (i * 50)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (i = 0 ; i < 6; ++i) {
    treePosition = {x:-600 + (i*15),y:-440 + (i * 50)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (i = 0 ; i < 6; ++i) {
    treePosition = {x:-540 - (i*15),y:-140 + (i * 50)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left out side road
  for (i = 0 ; i < 6; ++i) {
    treePosition = {x:-610 + (i*15),y:120 + (i * 50)};
    tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // left out side road
  treePosition = {x:100,y:-290};
  tree = factory('olaf0',treePosition);
  World.add(world, tree);
  treePosition = {x:150,y:-220};
  tree = factory('olaf1',treePosition);
  World.add(world, tree);
  treePosition = {x:90,y:-200};
  tree = factory('olaf2',treePosition);
  World.add(world, tree);
  treePosition = {x:40,y:-240};
  tree = factory('olaf3',treePosition);
  World.add(world, tree);
  treePosition = {x:120,y:-140};
  tree = factory('olaf4',treePosition);
  World.add(world, tree);
};


var drawWallDecorations = function() {
  // SECOND PART OF PATH - ICE
  x = -480;
  y = -210;
  for (var i = 0; i < 7; ++i) {
    var icePosition = {x: x, y: y};
    x -= 14;
    y -= 40;
    var ice = factory('iceBorder', icePosition);
    ice.angle = Math.PI * 0.4;
    World.add(world, ice);
  }

  // SPIKES
  x = -253;
  y = -220;
  for (var i = 0; i < 3; ++i) {
    var position = {x: x, y: y};
    x -= 0;
    y -= 70;
    var ice = factory('spikes', position);
    ice.angle = -Math.PI * 0.5;
    World.add(world, ice);
  }


  // FIRST PART OF PATH - TREES
  var cutoff = 33;
  for (var i = 0 ; i < cutoff; ++i) {
    var treePosition = {x:900 - (i*40),y:115};
    tree = factory('tree', treePosition);
    World.add(world, tree);
    var treePosition = {x:900 - (i*40),y:370};
    var tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // finish lower part of path
  for (var i = cutoff; i < cutoff + 3; ++i) {
    var treePosition = {x:900 - (i*40),y:370};
    var tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // Left side of Path
  // draw from higher to lower to fix overlap
  x = -500;
  y = -200;
  for (var i = 0; i < 8; ++i) {
    var treePosition = {x: x, y: y};
    x -= 14;
    y += 40;
    var tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  for (var i = 0; i < 7; ++i) {
    var treePosition = {x: x, y: y};
    x += 15;
    y += 43;
    var tree = factory('tree', treePosition);
    World.add(world, tree);
  }
  // Right side of path
  x = -225;
  y = -200;
  for (var i = 0; i < 8; ++i) {
    var treePosition = {x: x, y: y};
    x -= 20;
    y += 40;
    var tree = factory('tree', treePosition);
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
