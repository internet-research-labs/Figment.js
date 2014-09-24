var assert = require('assert');
var fs = require('fs');

var ObjImporter = require('../src/ObjImporter.js');

// ...
describe('ObjImporter', function () {

  var importer;
  var fluidObj;
  var mesh;

  beforeEach(function () {
    importer = new ObjImporter();
    fluidObj = fs.readFileSync('samples/spill.obj', 'utf8');
  });

  afterEach(function () {
    importer = cubeJson = mesh = false;
    delete importer;
    delete mesh;
    delete fluidObj;
  });

  it('should load make a mesh', function () {
    mesh = importer.load(fluidObj).make();
    assert(mesh instanceof Mesh);
  });

  xit('should load normals of a mesh', function () {
  });

  it('should load a ', function () {
    importer.load(fluidObj).make();
  });

});
