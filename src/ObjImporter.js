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
    this.mesh = parseObjAsString(this.encoded_string);
    return this.mesh;
  };

  // EXPORT
  module.exports = ObjImporter;

  // Helper Functions Start Here

  // PARSER FUNCTIONS
  // ................
  // ................

  function parseObjAsString (str) {
    // Create Mesh
    var mesh  = new Mesh();

    // Define regular expressions
    var re = {
      vertex  : /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
      normal  : /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
      uv      : /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
      face1   : /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,
      face2   : /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,
      face3   : /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,
      face4   : /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/
    };

    // Split encoded string into new lines
    var result, lines = str.split('\n');
    // Iterate through the lines
    for (var i=0; i < lines.length; i++) {
      var line = lines[i];

      // Empty line or comments get skipped
      if (line.length === 0 || line.charAt(0) === '#')
        continue;
      // Vertex lines get added as a three vertices
      else if (re.vertex.exec(line) !== null) {
        result = re.vertex.exec(line);
        mesh.addVertex(line[1]);
        mesh.addVertex(line[2]);
        mesh.addVertex(line[3]);
      }
      // Normal lines get ignored for now
      else if (re.normal.exec(line) !== null) {
        false;
      }
      // UV-patterns get ignored completely
      else if (re.uv.exec(line)) {
        false;
      }
      // Face Type 1 - just vertices
      else if (re.face1.exec(line)) {
      }
    }

    return new Mesh();
  }
}


(
  require,
  exports,
  module
);

