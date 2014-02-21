var assert = require('assert');
var fs = require('fs');

var JsonImporter = require('../src/JsonImporter.js');

// ...
describe('JsonImporter II', function () {

  var importer;
  var cubeJson;
  var mesh;

  // Before every iteration
  beforeEach(function () {
    importer = new JsonImporter();
    cubeJson = fs.readFileSync('samples/cube.json', 'utf8');
  });

  // After every iteration
  afterEach(function () {
    importer = cubeJson = mesh = false;
    delete importer;
    delete mesh;
    delete cubeJson;
  });

  // Like hell you do
  it('should load a file', function () {
    importer.load(cubeJson);
  });

  // >>>
  it('should create an instance of a mesh', function () {
    importer.load(cubeJson);
    mesh = importer.make();

    assert.ok(mesh);
    if (!(mesh instanceof Mesh))
      throw new Error('mesh is not an instance of class "Mesh"');
  });

  //
  it('should create a mesh ', function () {
    importer.load(cubeJson);
    mesh = importer.make();
    assert.notEqual(mesh.m.vertices.length, 0);
    assertnotEqual(mesh.m.indices.length, 0);
  });

});
