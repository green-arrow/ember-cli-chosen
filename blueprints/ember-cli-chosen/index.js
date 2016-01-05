module.exports = {
  normalizeEntityName: function() {},
  description: 'Include "Chosen" bower package',

  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
      { name: 'chosen=~1.4.0' }
    ]);
  }
};
