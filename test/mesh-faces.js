var assert = require('assert');
var Mesh = require('../src/Mesh.js');

describe('Mesh', function () {

  describe('#faces-method', function () {

    var mesh = new Mesh();
    
    it('should construct an empty mesh', function () {
      assert.equal(mesh.m.vertices.length,  0);
      assert.equal(mesh.m.indices.length,   0);
    });

    it('should add 3 points', function () {
      var a = [ +1, +1, +1 ];
      var b = [ +1, -1, -1 ];
      var c = [ -1, +1, -1 ];
      var d = [ -1, -1, +1 ];
      mesh.add(Face(a, b, c));
      mesh.add(Face(a, b, d));
      mesh.add(Face(a, c, d));
      mesh.add(Face(b, c, d));
      assert.equal(mesh.m.vertices.length,  2);
      assert.equal(mesh.m.indices.length,   12);
    });
  });

  it('should throw an error', function () {
    assert.throws(function () { mesh.addFace([]); }, 'a face must have 3 coordinates');
  });

});
