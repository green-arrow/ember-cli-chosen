import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  attributeBindings: ['prompt:data-placeholder', 'multiple'],
  classNameBindings: ['isRtl:chosen-rtl'],
  classNames: ['chosen-select'],
  prompt: null,
  isRtl: false,
  multiple: false,
  disableSearchThreshold: null,
  noResultsText: null,
  maxSelectedOptions: null,
  width: '100%',
  _options: function() {
    var options = {};

    if(this.get('disableSearchThreshold')) { options['disable_search_threshold'] = this.get('disableSearchThreshold'); }
    if(this.get('noResultsText')) { options['no_results_text'] = this.get('noResultsText'); }
    if(this.get('maxSelectedOptions')) { options['max_selected_options'] = this.get('maxSelectedOptions'); }
    if(this.get('width')) { options['width'] = this.get('width'); }

    return options;
  }.observes('prompt', 'isRtl', 'multiple', 'disableSearchThreshold',
             'noResultsText', 'maxSelectedOptions', 'width'),
  _setupChosen: function() {
    var options = this.get('_options');
    this.$().chosen(options);
  }.observes('_options'),
  didInsertElement: function() {
    this._super();
    this._setupChosen();
  }
});
