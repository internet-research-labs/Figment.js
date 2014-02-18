var Mesh = require('../src/Mesh.js');
var StlExporter = require('../src/StlExporter.js');


describe('StlExporter', function () {

  describe('from Mesh', function () {
    var mesh  = new Mesh();
    var maker = new StlExporter();
    mesh.addVertex([ -1, -1, +0 ]);
    mesh.addVertex([ +1, -1, +0 ]);
    mesh.addVertex([ +0, +1, +0 ]);
    mesh.addVertex([ +0, -1, -1 ]);
    mesh.addIndices([ 0, 1, 2 ]);
    mesh.addIndices([ 0, 1, 3 ]);
    mesh.addIndices([ 0, 2, 3 ]);
    mesh.addIndices([ 1, 2, 3 ]);

    it('should load the mesh', function () {
      maker.load(mesh);
    });

    it('should make the string', function () {
      var str = maker.make();
    });
  });

});
