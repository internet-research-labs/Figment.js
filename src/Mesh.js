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
};

Mesh.prototype.addVertex = function (points) {
  if (points && points.length != 3)
    throw new Error('a vertex must have 3 coordinates');
  this.m.vertices.push(points[0]);
  this.m.vertices.push(points[1]);
  this.m.vertices.push(points[2]);
};

Mesh.prototype.addIndices = function (indices) {
  if (indices && indices.length != 3)
    throw new Error('an index must have 3 coordinates');
  this.m.indices.push(indices[0]);
  this.m.indices.push(indices[1]);
  this.m.indices.push(indices[2]);
};

/**
 * Optimize Element Array Buffer
 */
Mesh.prototype.removeDuplicates = function () {
};

/**
 * Structure for Efficiently Adding Faces to a Mesh
 */
Mesh.Face = function (a, b, c, n) {
  if (this === undefined)
    return new Face(a, b, c, n);
  this.m = {};
  this.m.a = a ? a : [];
  this.m.b = b ? b : [];
  this.m.c = c ? c : [];
  this.m.n = n ? n : [ 0, 0, 0 ];
}

/**
 * Obvious Hash Function
 */
Mesh.Face.prototype.hash = function () {
  return String([ this.m.a, this.m.b, this.m.c, this.m.n ]);
};

/**
 * Face Equality
 *
 */
Mesh.Face.equal = function (lhs, rhs) {
  if (lhs.m.a !== rhs.m.a)
    return false;
  if (lhs.m.b !== rhs.m.b)
    return false;
  if (lhs.m.c !== rhs.m.c)
    return false;
  if (lhs.m.n !== rhs.m.n)
    return false;
  return true;
};

// Export for browser and oodeJS
~function () {
  var root = this;
  if (typeof module === 'object' && 'exports' in module) {
    module.exports = Mesh;
  }
  root.Mesh = Mesh;
}();
