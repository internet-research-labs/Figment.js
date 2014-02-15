function Importer () {
}

Importer.prototype.load = function (fileName) {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "load" reads no file.');
};

Importer.prototype.make = function () {
  console.log('NOTE: "Importer" is an *abstract* class, and has no implementation. So, using the "make" method returns an empty "Mesh" object.');
};
