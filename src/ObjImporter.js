~function (require, exports, module) {
  
  var Importer  = require('./Importer.js');
  var Mesh      = require('./Mesh.js');

  ObjImporter.prototype = Importer.prototype;
  ObjImporter.prototype.file = Importer.prototype.file;

  /**
   * Importer for JSON Formatted 3d Model
   * Class used to import JSON-Formatted 3d Models into Mesh Format.
   */
  function ObjImporter () {
    this.mesh = new Mesh();
  }

  /**
   */
  ObjImporter.prototype.load = function (encoded_string) {
    this.encoded_string = encoded_string;
    return this;
  };

  /**
   * Create the Mesh
   *
   */
  ObjImporter.prototype.make = function () {
    var mesh = new Mesh();
    return mesh;
  };

  module.exports = ObjImporter;


  // PARSER FUNCTIONS
  // PARSER FUNCTIONS
  // PARSER FUNCTIONS

  /**
   * Vector
   */
  function vector (x, y, z, w) {
  }
  /**
   * Texture Coordinates
   */
  function uv (u, v) {
    // ignored
  }
  /**
   *
   */
  function face3 (a, b, c, normals) {
  }
}
(
  require,
  exports,
  module
);



