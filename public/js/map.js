/**
 * ------------------------------------------------------------
 * Draw the elements of the physics environment
 * ------------------------------------------------------------
 */

Game.initMap = function() {
  drawRoads();
  drawIcePatches(this);
  drawStartingLine();
  drawWallDecorations();
  drawForest();
  drawIcerock();
  drawPenguin(this);
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
    {x: 100, y: -500},
    {x: 300, y: -500},
    {x: 500, y: -500},
  ];
  for (var i in icePositions) {
    var ice = icePatchFactory(icePositions[i]);
    World.add(world, ice);
    Game.iceBodies.add(ice);
  }
};

var drawIcerock = function() {
  var icerockPosition;
  var icerock;
  icerockPosition = {x:425 ,y:-792};
  icerock = factory('icerock', icerockPosition);
  World.add(world, icerock);
  icerockPosition = {x:307 ,y:-758};
  icerock = factory('icerock', icerockPosition);
  World.add(world, icerock);
  icerockPosition = {x:396 ,y:-777};
  icerock = factory('icerock', icerockPosition);
  World.add(world, icerock);
  icerockPosition = {x:459 ,y:-774};
  icerock = factory('icerock', icerockPosition);
  World.add(world, icerock);
  icerockPosition = {x:328 ,y:-756};
  icerock = factory('icerock', icerockPosition);
  World.add(world, icerock);
};

var drawPenguin = function(Game) {
  var penguinPosition;
  var penguin;

  penguinPosition = {x:0 ,y:-780};
  penguin = factory('penguin', penguinPosition);
  penguin.label = 'penguinA';
  World.add(world, penguin);
  Game.penguins.push(penguin);

  penguinPosition = {x:60 ,y:-810};
  penguin = factory('penguin', penguinPosition);
  penguin.label = 'penguinB';
  World.add(world, penguin);
  Game.penguins.push(penguin);

  penguinPosition = {x:80 ,y:-780};
  penguin = factory('penguin', penguinPosition);
  penguin.label = 'penguinC';
  World.add(world, penguin);
  Game.penguins.push(penguin);

  // Notify server about all penguins initial position
  var allPenguins = {};
  for (var p in Game.penguins) {
    var penguin = Game.penguins[p];
    allPenguins[penguin.label] = {
      angle: penguin.angle,
      angularVelocity: penguin.angularVelocity,
      force: penguin.force,
      label: penguin.label,
      position: penguin.position,
      velocity: penguin.velocity
    };
  }
  socket.emit('penguin', allPenguins);
};

var drawForest = function() {
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

var drawWallDecorations = function() {
  var treePosition;
  var tree;
  var i;
  // bot in side road
  for (i = 0 ; i < 35; ++i) {
    treePosition = {x:-380 + (i*40),y:115};
    tree = factory('tree', treePosition);
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
