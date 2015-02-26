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
  value: null,
  width: '100%',
  selectionDidChange: null,
  _options: function() {
    var options = {};

    if(!Ember.isNone(this.get('disableSearchThreshold'))) { options['disable_search_threshold'] = this.get('disableSearchThreshold'); }
    if(!Ember.isNone(this.get('noResultsText'))) { options['no_results_text'] = this.get('noResultsText'); }
    if(!Ember.isNone(this.get('maxSelectedOptions'))) { options['max_selected_options'] = this.get('maxSelectedOptions'); }
    if(!Ember.isNone(this.get('width'))) { options['width'] = this.get('width'); }

    return options;
  }.property('prompt', 'isRtl', 'multiple', 'disableSearchThreshold',
             'noResultsText', 'maxSelectedOptions', 'width'),
  _setupChosen: function() {
    var _this = this,
      options = _this.get('_options'),
      isMultiple = _this.get('multiple'),
      currentValue = _this.get('value'),
      selectedValue;

    if(isMultiple) {
      currentValue = Ember.makeArray(currentValue);
      _this.set('value', currentValue);
    } else {
      // If we're going from multiple -> single select, make the selected
      // value the first item in the selected value array, if an item exists
      if(Ember.isArray(currentValue) && currentValue.length > 0) {
        currentValue = currentValue[0];
        _this.set('value', currentValue);
      }
    }

    _this.$().chosen(options)
      .on('change', function (e, params) {
      var index;

      if(isMultiple) {
        currentValue = _this.get('value');

        if(params.selected) {
          currentValue.pushObject(params.selected);
        } else {
          index = currentValue.indexOf(params.deselected);

          if(index !== -1) {
            currentValue.removeAt(index);
          }
        }

        selectedValue = currentValue;
      } else {
        selectedValue = params.selected;
      }

      _this.set('value', selectedValue);
      _this.sendAction('selectionDidChange', selectedValue);
    }).on('chosen:maxselected', function(e, chosen) {
      _this.sendAction('chosenMaxSelected', e, chosen);
    });
  }.observes('_options'),
  didInsertElement: function() {
    this._super();
    this._setupChosen();
  }
});
