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
    var meshJson;
    try {
      meshJson = JSON.parse(encoded_string);
    }
    catch (e) {
      throw new Error('Encoded String is unrecognizable JSON');
    }
    // ...
    this.meshJson = meshJson;
    return this;
  };

  /**
   * Create the Mesh
   *
   */
  JsonImporter.prototype.make = function () {
    var mesh = new Mesh();

    parse(this.meshJson);

    return mesh;
  };

  module.exports = JsonImporter;


  /**
   * Parse THREE.js JSON Object
   * This is a port of the algorithm created by "mrdoob" for parsing the
   * THREE.js "JSON-Model-Format-3.1". Specification can be found here:
   *   https://github.com/mrdoob/three.js/wiki/JSON-Model-format-3.1
   * @param {Object} json a JSON representation of a THREE.js Mesh
   * @return 
   */
  function parse( json ) {
    // Catch invalid
    if (json.metadata === undefined || json.metadata.formatVersion === undefined || json.metadata.formatVersion !== 3) {
      console.error( 'Deprecated file format.' );
      return;
    }

    // Determine whether a particular bit is set. This is used later to
    // determine properties of the defined mesh
    function isBitSet(value, position) {
      return value & (1 << position);
    };

    var i, j,

        offset, zLength,

        type,
        isQuad, 
        hasMaterial, 
        hasFaceUv, hasFaceVertexUv,
        hasFaceNormal, hasFaceVertexNormal,
        hasFaceColor, hasFaceVertexColor,

        vertex, face,

        faces     = json.faces,
        vertices  = json.vertices,
        normals   = json.normals,
        colors    = json.colors,

        nUvLayers = 0
        ;

    // disregard empty arrays
    for (i = 0; i < json.uvs.length; i++) {
      if (json.uvs[ i ].length) nUvLayers ++;
    }

    // ...
    for (i = 0; i < nUvLayers; i++) {
      scope.faceUvs[i] = [];
      scope.faceVertexUvs[i] = [];
    }

    offset = 0;
    zLength = vertices.length;

    while ( offset < zLength ) {

          vertex = new THREE.Vertex();

          vertex.position.x = vertices[ offset ++ ];
          vertex.position.y = vertices[ offset ++ ];
          vertex.position.z = vertices[ offset ++ ];

          scope.vertices.push( vertex );

      }

      offset = 0;
      zLength = faces.length;

      while ( offset < zLength ) {

          type = faces[ offset ++ ];

          isQuad              = isBitSet( type, 0 );
          hasMaterial         = isBitSet( type, 1 );
          hasFaceUv           = isBitSet( type, 2 );
          hasFaceVertexUv     = isBitSet( type, 3 );
          hasFaceNormal       = isBitSet( type, 4 );
          hasFaceVertexNormal = isBitSet( type, 5 );
          hasFaceColor        = isBitSet( type, 6 );
          hasFaceVertexColor  = isBitSet( type, 7 );

          if ( isQuad ) {

              face = new THREE.Face4();

              face.a = faces[ offset ++ ];
              face.b = faces[ offset ++ ];
              face.c = faces[ offset ++ ];
              face.d = faces[ offset ++ ];

              nVertices = 4;

          } else {

              face = new THREE.Face3();

              face.a = faces[ offset ++ ];
              face.b = faces[ offset ++ ];
              face.c = faces[ offset ++ ];

              nVertices = 3;

          }

          if ( hasMaterial ) {

              materialIndex = faces[ offset ++ ];
              face.materials = scope.materials[ materialIndex ];

          }

          if ( hasFaceUv ) {

              for ( i = 0; i < nUvLayers; i++ ) {

                  uvLayer = json.uvs[ i ];

                  uvIndex = faces[ offset ++ ];

                  u = uvLayer[ uvIndex * 2 ];
                  v = uvLayer[ uvIndex * 2 + 1 ];

                  scope.faceUvs[ i ].push( new THREE.UV( u, v ) );

              }

          }

          if ( hasFaceVertexUv ) {

              for ( i = 0; i < nUvLayers; i++ ) {

                  uvLayer = json.uvs[ i ];

                  uvs = [];

                  for ( j = 0; j < nVertices; j ++ ) {

                      uvIndex = faces[ offset ++ ];

                      u = uvLayer[ uvIndex * 2 ];
                      v = uvLayer[ uvIndex * 2 + 1 ];

                      uvs[ j ] = new THREE.UV( u, v );

                  }

                  scope.faceVertexUvs[ i ].push( uvs );

              }

          }

          if ( hasFaceNormal ) {

              normalIndex = faces[ offset ++ ] * 3;

              normal = new THREE.Vector3();

              normal.x = normals[ normalIndex ++ ];
              normal.y = normals[ normalIndex ++ ];
              normal.z = normals[ normalIndex ];

              face.normal = normal;

          }

          if ( hasFaceVertexNormal ) {

              for ( i = 0; i < nVertices; i++ ) {

                  normalIndex = faces[ offset ++ ] * 3;

                  normal = new THREE.Vector3();

                  normal.x = normals[ normalIndex ++ ];
                  normal.y = normals[ normalIndex ++ ];
                  normal.z = normals[ normalIndex ];

                  face.vertexNormals.push( normal );

              }

          }

          if ( hasFaceColor ) {

              color = new THREE.Color( faces[ offset ++ ] );
              face.color = color;

          }

          if ( hasFaceVertexColor ) {

              for ( i = 0; i < nVertices; i++ ) {

                  colorIndex = faces[ offset ++ ];

                  color = new THREE.Color( colors[ colorIndex ] );
                  face.vertexColors.push( color );

              }

          }

          scope.faces.push( face );

      }

};
}
(
  require,
  exports,
  module
);


