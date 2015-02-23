module.exports = {
  normalizeEntityName: function() {},
  description: 'Include "Chosen" bower package',

  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
      { name: 'chosen=https://github.com/harvesthq/chosen/releases/download/v1.3.0/chosen_v1.3.0.zip' }
    ]);
  }
};
