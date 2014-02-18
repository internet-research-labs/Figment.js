~function (require, exports, module) {

  function Figment () {
  }

  // ...
  Figment.from = function () {
    return this;
  };

  // ...
  Figment.to = function () {
    return this;
  };

  module.exports = Figment;
}
(
  require,
  exports,
  module
);
