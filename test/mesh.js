var assert = require('assert');
var Mesh = require('../src/Mesh.js');

describe('Mesh', function () {

  // ...
  describe('addVertex + addIndices', function () {
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

  // ...
  describe('addFace', function () {
    it('should build a flat-shaded tetrahedron', function () {
      var mesh = new Mesh();

      var a = [ +1, +1, +1 ];
      var b = [ +1, -1, -1 ];
      var c = [ -1, +1, -1 ];
      var d = [ -1, -1, +1 ];

      mesh.addFace(Mesh.Face(a, b, c));
      mesh.addFace(Mesh.Face(a, b, d));
      mesh.addFace(Mesh.Face(a, c, d));
      mesh.addFace(Mesh.Face(b, c, d));
      
      assert.equal(mesh.m.vertices.length,  2);
      assert.equal(mesh.m.indices.length,   12);
    });

    it('should build a smoothed mesh', function () {
      var mesh = new Mesh();

      var a = [ +1, +1, +1 ];
      var b = [ +1, -1, -1 ];
      var c = [ -1, +1, -1 ];
      var d = [ -1, -1, +1 ];

      mesh.addFace(Mesh.Face(a, b, c));
      mesh.addFace(Mesh.Face(a, b, d));
      mesh.addFace(Mesh.Face(a, c, d));
      mesh.addFace(Mesh.Face(b, c, d));

      mesh.removeDuplicates();
      
      assert.equal(mesh.m.vertices.length,  2);
      assert.equal(mesh.m.indices.length,   12);
    });

    it('should throw an error', function () {
      assert.throws(function () { mesh.addFace([]); }, 'a face must have 3 coordinates');
    });
  });


});
