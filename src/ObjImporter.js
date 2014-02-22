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
        result = [ Number(result[1]), Number(result[2]), Number(result[3]) ];
        mesh.addVertex(result);
      }
      // Normal lines get ignored for now
      else if (re.normal.exec(line) !== null) {
        false;
      }
      // UV-patterns get ignored completely
      else if (re.uv.exec(line) !== null) {
        false;
      }
      // Face Type 1 - just vertex
      else if (re.face1.exec(line) !== null) {
        result = re.face1.exec(line);
        var face = [ Number(result[1]), Number(result[2]), Number(result[3]) ];
        add_face(face);
      }
      // Face Type 2 - vertices-texture
      else if (re.face2.exec(line) !== null) {
        result = re.face2.exec(line);
        var face = [ Number(result[1]), Number(result[2]), Number(result[3]) ];
        add_face(face);
      }
      // Face Type 3 - vertex-texture-normal
      else if (re.face3.exec(line) !== null) {
      }
      // Face Type 4 - vertex-normal
      else if (re.face4.exec(line) !== null) {
      }
      else {
        // This didn't work
      }
    }

    /**
     * Create a Face Out of a Set of Vertices
     */
    function add_face (face) {
      // Triangle Face
      if (face.length === 3)
        1;
      // Square Face
      else if (face.length === 4)
        2;
    }
    /**
     * Add a UV-Texture-Coordinate to a Face
     */
    function add_uv (normal) {
      // no-op
    }
    /**
     * Add a Normal to a Face
     */
    function add_normal () {
    }

    return new Mesh();
  }
}
(
  require,
  exports,
  module
);

