~function (require, exports, module) {

  var Exporter  = require('./Exporter.js');
  var Mesh      = require('./Mesh.js');

  StlExporter.prototype = Exporter.prototype;

  /**
   * STL Exporter
   *
   *
   */
  function StlExporter () {
    this.mesh = new Mesh();
  };

  /**
   * Load a Mesh Object
   * Copy a Mesh into the exporter. This is necessary first step to exporting
   * a valid STL file.
   * @param {!Mesh} meshObj a Mesh object to export as an STL file
   * @return {!StlExporter} this
   */
  StlExporter.prototype.load = function (meshObj) {
    this.mesh = {};
    this.mesh.m = {};
    this.mesh.m.vertices  = meshObj.m.vertices;
    this.mesh.m.indices   = meshObj.m.indices;
    return this;
  };

  /**
   * Make an Ascii STL Object as a String
   * Returns a string representing an ascii-STL object
   * @return {string} a string, representing an Ascii STL object
   */
  StlExporter.prototype.make = function () {
    var vertices  = this.mesh.m.vertices;
    var indices   = this.mesh.m.indices;

    if (indices.length % 3 != 0) {
      console.log(indices.length);
      throw new Error("Mesh cannot be made into a valid STL file: Number of indices is not a multiple of 3.");
    }

    var str  = 'solid ';

    for (var k=0; k < indices.length; k+=3) {

      var v1 = getVertex(3*indices[k+0]);
      var v2 = getVertex(3*indices[k+1]);
      var v3 = getVertex(3*indices[k+2]);
      var n = { x : 0, y : 0, z : 0 };

      str += '\n';
      str += 'facet normal ' + n.x + ' ' + n.y + ' ' + n.z + '\n';
      str += '  loop\n';
      str += '    vertex ' + v1.x + ' ' + v1.y + ' ' + v1.z + '\n';
      str += '    vertex ' + v2.x + ' ' + v2.y + ' ' + v2.z + '\n';
      str += '    vertex ' + v3.x + ' ' + v3.y + ' ' + v3.z + '\n';
      str += '  endloop\n';
      str += 'endfacet';
    }

    return str;

    // Get vertex starting at i-th offset
    function getVertex (i) {
      return { x:vertices[i+0], y:vertices[i+1], z:vertices[i+2] };
    }
    // Get face starting at i-th offset
    function getFace (indices) {
      return [ getVertex(indices[0]), getVertex(indices[1]), getVertex(indices[2]) ];
    }
  };


  /**
   * Output ASCII Text for Face
   *
   */
  function _make_face (face) {
    console.log(face);
  }

  // Appear in main namespace
  module.exports = StlExporter;
}
// Jeez.. cross-browser can suck a dick
(
  require,
  exports,
  module
);
