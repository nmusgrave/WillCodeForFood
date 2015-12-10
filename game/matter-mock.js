// Mock the html elements for drawing the game
global.document = {
  createElement: function(){
    // Canvas
    return {
      getContext: function() {
        return {};
      }
    };
  }
};
global.window = {};

// Create a new world
// HACK HACK HACK
// matter.js isn't supposed to work on server-side, we do hacks to make it work.
var options = {
  render: {
    element: null,
    controller: {
      create: function() {},
      clear: function() {},
      world: function() {}
    }
  },
  input: {
    mouse: {}
  }
};
// END OF HACK HACK HACK

module.exports = options;