/* jshint node: true */
'use strict';

var pickFiles     = require('broccoli-static-compiler');
var merge         = require('lodash.merge');

module.exports = {
  name: 'ember-cli-chosen',
  included: function(app) {
    this._super.included(app);

    // Setup default options for ember-cli-chosen
    var options = merge({
      'jQuery': true,
      'importChosenCSS': true
    }, app.options['ember-cli-chosen'] || {});

    options.chosenJSType = options.jQuery ? 'jquery.min' : 'proto';

    // Update `ember-cli-chosen` options on our `app` with updated hash
    app.options['ember-cli-chosen'] = options;

    // Import the correct JS for chosen
    app.import(app.bowerDirectory + '/chosen/chosen.' + options.chosenJSType + '.js');

    // Import Chosen CSS (done by default)
    if(options.importChosenCSS) { app.import(app.bowerDirectory + '/chosen/chosen.min.css'); }
  },
  treeForPublic: function(treeName) {
    var tree;

    // Only include the Chosen sprites if we're including Chosen CSS in the build
    if(this.app.options['ember-cli-chosen'].importChosenCSS) {
      tree = pickFiles(this.app.bowerDirectory + '/chosen', {
        srcDir: '/',
        files: ['*.png'],
        destDir: '/assets'
      });
    }

    return tree;
  }
};
