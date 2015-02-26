import Ember from 'ember';
import maxSelectedHbs from '../code-highlights/options/max-selected-hbs';
import maxSelectedController from '../code-highlights/options/max-selected-controller';

export default Ember.Controller.extend({
  needs: ['index'],
  maxSelectedHbsCode: maxSelectedHbs,
  maxSelectedControllerCode: maxSelectedController,
  countries: Ember.computed.alias('controllers.index.countries'),
  maxSelectedMessage: null,
  actions: {
    onChosenMaxSelected: function(e, chosen) {
      this.set('maxSelectedMessage', "You can't select any more!");
    }
  }
});
