import Ember from 'ember';

export default Ember.View.extend({
  setupAccordions: Ember.on('didInsertElement', function() {
    Ember.$(accordion);
  })
});
