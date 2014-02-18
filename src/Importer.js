function Importer () {
}

Importer.prototype.load = function (encoded_string) {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "load" reads no file.');
};

Importer.prototype.file = function (file_name) {
  console.log('WARNING: Not input from file is not implemented');
};

Importer.prototype.stream = function (stream) {
  console.log('WARNING: Not input from stream is not implemented');
};

Importer.prototype.make = function () {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "make" method returns an empty "Mesh" object.');
};

module.exports = Importer;
