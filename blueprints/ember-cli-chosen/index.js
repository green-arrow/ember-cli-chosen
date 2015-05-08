module.exports = {
  normalizeEntityName: function() {},
  description: 'Include "Chosen" bower package',

  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
      { name: 'chosen=https://github.com/harvesthq/chosen/releases/download/1.4.2/chosen_v1.4.2.zip' }
    ]);
  }
};
