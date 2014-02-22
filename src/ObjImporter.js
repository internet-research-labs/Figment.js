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
      else if (re.vertex.test(line)) {
        result = re.vertex.exec(line);
        result = [ Number(result[1]), Number(result[2]), Number(result[3]) ];
        mesh.addVertex(result);
      }
      // Normal lines get ignored for now
      else if (re.normal.test(line)) {
        false;
      }
      // UV-patterns get ignored completely
      else if (re.uv.exec(line) !== null) {
        false;
      }
      // Face Type 1 - just vertex
      else if (re.face1.test(line)) {
        result = re.face1.exec(line);
        var face = [ Number(result[1]), Number(result[2]), Number(result[3]), Number(result[4]) ];
        add_face(mesh, face);
      }
      // Face Type 2 - vertices-texture
      // NOTE: Ignoring texture completely
      else if (re.face2.test(line)) {
        result = re.face2.exec(line);
        var face = [ Number(result[2]), Number(result[5]), Number(result[8]), Number(result[11]) ];
        add_face(mesh, face);
      }
      // Face Type 3 - vertex-texture-normal
      // NOTE: Ignoring texture completely and ignoring normal
      else if (re.face3.test(line)) {
        result = re.face3.exec(line);
        var face = [ Number(result[2]), Number(result[6]), Number(result[10]), Number(result[14]) ];
        add_face(mesh, face);
      }
      // Face Type 4 - vertex-normal
      // NOTE: Ignoring normal completely
      else if (re.face4.exec(line)) {
        result = re.face4.exec(line);
        var face = [ Number(result[2]), Number(result[5]), Number(result[8]), Number(result[11]) ];
        add_face(mesh, face);
      }
      else {
        // Probably vendor specific line (or junk)
      }
    }

    /**
     * Create a Face Out of a Set of Vertices
     * Determine whether the face is triangular or square, and correspondingly
     * add it to the mesh.
     * @param {Mesh} mesh a mesh to modify in order to "copy" the OBJ file
     * @param {Number[4]} face an array of numbers, representing indices
     * @return undefined undefined
     */
    function add_face (mesh, face) {
      if (face[3] === undefined)
        mesh.addIndices([ face[0], face[1], face[2] ]);
      else {
        mesh.addIndices([ face[0], face[1], face[2] ]);
        mesh.addIndices([ face[1], face[2], face[3] ]);
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

