function Importer () {
}

Importer.prototype.load = function (encoded_string) {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "load" reads no file.');
  return this;
};

Importer.prototype.file = function (file_name) {
  return this;
};

Importer.prototype.stream = function (stream) {
  return this;
};

Importer.prototype.make = function () {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "make" method returns an empty "Mesh" object.');
  return this;
};

module.exports = Importer;
