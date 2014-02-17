var assert = require('assert');
var Mesh = require('../src/Mesh.js');

describe('Mesh: vertices & indices', function () {

  var mesh = new Mesh();
  
  it('should construct an empty mesh', function () {
    assert.equal(mesh.m.vertices.length,  0);
    assert.equal(mesh.m.indices.length,   0);
  });

  it('should add 3 points', function () {
    mesh.addVertex([ +1, +1, +1 ]);
    mesh.addVertex([ +1, -1, -1 ]);
    mesh.addVertex([ -1, +1, -1 ]);
    mesh.addVertex([ -1, -1, +1 ]);
    assert.equal(mesh.m.vertices.length,  12);
  });

  it('should *finally* create a pyramid', function () {
    mesh.addIndices([ 0, 1, 2 ]);
    mesh.addIndices([ 0, 1, 3 ]);
    mesh.addIndices([ 0, 2, 3 ]);
    mesh.addIndices([ 1, 2, 3 ]);
    assert.equal(mesh.m.indices.length,   12);
  });

});
