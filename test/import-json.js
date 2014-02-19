var assert = require('assert');

var JsonImporter = require('../src/JsonImporter.js');

describe('JsonImporter', function () {

  // JSON -> MESH
  describe('to Mesh', function () {
    var importer = new JsonImporter();

    it('should import a JSON file', function () {
    });
  });

  // JSON -> JSON
  describe('to JSON', function () {
    it('should create a valid JSON file', function () {
      var importer = new JsonImporter();
      mesh = importer
                     .file('./files/Cat.json')
                     .make();
    });
  });
});
