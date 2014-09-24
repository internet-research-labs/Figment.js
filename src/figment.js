~function (require, exports, module) {

  /**
   * Import Interface
   *
   *
   */
  function ImportInterface () {
  }

  ImportInterface.obj = function () {
  };

  /**
   * Export Interface
   *
   *
   */
  function ExportInterface () {
  }

  /**
   * Container for Importer and Exporter
   *
   *
   */
  function ImporterExporter () {
  }
  ImporterExporter.from = ImportInterface;
  ImporterExporter.to   = ExportInterface;

  // 
  module.exports = ImporterExporter;
}
(
  require,
  exports,
  module
);
