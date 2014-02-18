var assert  = require('assert');
var figment = require('../src/figment.js');

describe('Figment', function () {

  it('should evaluate `from`', function () {
    figment .from.obj('files/duck.obj');
    figment .from.stl('files/duck.stl');
  });

  it('should evaluate `to`', function () {
    figment .from .obj('files/duck.obj')
            .to   .stl('out/duck.stl');

    figment .from .json('file/duck.json')
            .to   .stl('out/duck.stl');
  });

});
