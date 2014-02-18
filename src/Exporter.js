function Exporter () {
  this.mesh = {};
}

Exporter.prototype.load = function (meshObj) {
  console.log('NOTE: "Exporter" is an *abstract* class, and has no implementation. So, using the "load" reads no object.');
};

Exporter.prototype.make = function () {
  console.log('NOTE: "Exporter" is an *abstract* class, and has no implementation. So, using the "make" creates no file.');
};

module.exports = Exporter;
