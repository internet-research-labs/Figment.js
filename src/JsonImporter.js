~function (require, exports, module) {
  
  var Importer  = require('./Importer.js');
  var Mesh      = require('./Mesh.js');

  JsonImporter.prototype = Importer.prototype;
  JsonImporter.prototype.file = Importer.prototype.file;

  /**
   * Importer for JSON Formatted 3d Model
   * Class used to import JSON-Formatted 3d Models into Mesh Format.
   */
  function JsonImporter () {
    this.mesh = new Mesh();
  }

  /**
   * Load a JSON-Formatted String
   * Loads a Formatted-JSON object, as is common for WebGL Applications. This
   * renders directly to Mesh.
   * @param {string} encoded_string a string, formatted as JSON, representing
   * a 3D object
   * @return undefined undefined
   */
  JsonImporter.prototype.load = function (encoded_string) {
  };

  /**
   * Create the Mesh
   *
   */
  JsonImporter.prototype.make = function () {
    var mesh = new Mesh();

    return mesh;
  };

  module.exports = JsonImporter;

}
(
  require,
  exports,
  module
);
