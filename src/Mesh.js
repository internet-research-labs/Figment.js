/**
 * Create an Empty Mesh
 * Create a mesh by adding vertices and indices separately, or adding faces
 * by their coordinates.
 * @note "addFace" attempts to do a minimal representation. This can be scaled
 * for large meshes using a hash-table.
 */
function Mesh () {
  this.m = {};
  this.m.vertices = [];
  this.m.indices  = [];
}

/**
 * Add Face
 * Adds a face to the mesh, attempting to reuse elements in the vertex buffer.
 * @param Array face three-element 
 * @return undefined undefined
 */
Mesh.prototype.addFace = function (face) {
  if (face && face.length != 3) {
    throw new Error('a face must have 3 coordinates');
  }

  var self = this;

  addWithoutRepeat(face[0]);
  addWithoutRepeat(face[1]);
  addWithoutRepeat(face[2]);

  function addWithoutRepeat (coord) {
    var index = self.m.vertices.indexOf(coord);
    if (index === -1) {
      self.m.vertices.push(coord);
      index = self.m.vertices.length;
    }
    self.m.indices.push(index);
  }
};

Mesh.prototype.addVertex = function (points) {
  if (points && points.length != 3) {
    throw new Error('a vertex must have 3 coordinates');
  }
  this.m.vertices.push(points[0]);
  this.m.vertices.push(points[1]);
  this.m.vertices.push(points[2]);
};

Mesh.prototype.addIndices = function (indices) {
  if (indices && indices.length != 3) {
    throw new Error('an index must have 3 coordinates');
  }
  this.m.indices.push(indices[0]);
  this.m.indices.push(indices[1]);
  this.m.indices.push(indices[2]);
}

/**
 * Structure for Efficiently Adding Faces to a Mesh
 */
function Face (a, b, c, n) {
  this.m.a = a ? a : [];
  this.m.b = b ? b : [];
  this.m.c = c ? c : [];
  this.m.n = n ? n : [ 0, 0, 0 ];
}

module.exports = Mesh;
