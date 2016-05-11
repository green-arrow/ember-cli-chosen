import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  attributeBindings: ['prompt:data-placeholder', 'multiple'],
  classNameBindings: ['isRtl:chosen-rtl'],
  classNames: ['chosen-select'],
  prompt: null,
  isRtl: false,
  multiple: false,
  allowSingleDeselect: null,
  disableSearch: null,
  disableSearchThreshold: null,
  enableSplitWordSearch: null,
  inheritSelectClasses: null,
  maxSelectedOptions: null,
  noResultsText: null,
  placeholderTextMultiple: null,
  placeholderTextSingle: null,
  searchContains: null,
  singleBackstrokeDelete: null,
  width: '100%',
  displayDisabledOptions: null,
  displaySelectedOptions: null,
  includeGroupLabelInSelected: null,
  value: null,
  selectionDidChange: null,
  _options: function() {
    var options = {};

    if(!Ember.isNone(this.get('allowSingleDeselect'))) { options['allow_single_deselect'] = this.get('allowSingleDeselect'); }
    if(!Ember.isNone(this.get('disableSearch'))) { options['disable_search'] = this.get('disableSearch'); }
    if(!Ember.isNone(this.get('disableSearchThreshold'))) { options['disable_search_threshold'] = this.get('disableSearchThreshold'); }
    if(!Ember.isNone(this.get('enableSplitWordSearch'))) { options['enable_split_word_search'] = this.get('enableSplitWordSearch'); }
    if(!Ember.isNone(this.get('inheritSelectClasses'))) { options['inherit_select_classes'] = this.get('inheritSelectClasses'); }
    if(!Ember.isNone(this.get('maxSelectedOptions'))) { options['max_selected_options'] = this.get('maxSelectedOptions'); }
    if(!Ember.isNone(this.get('noResultsText'))) { options['no_results_text'] = this.get('noResultsText'); }
    if(!Ember.isNone(this.get('placeholderTextMultiple'))) { options['placeholder_text_multiple'] = this.get('placeholderTextMultiple'); }
    if(!Ember.isNone(this.get('placeholderTextSingle'))) { options['placeholder_text_single'] = this.get('placeholderTextSingle'); }
    if(!Ember.isNone(this.get('searchContains'))) { options['search_contains'] = this.get('searchContains'); }
    if(!Ember.isNone(this.get('singleBackstrokeDelete'))) { options['single_backstroke_delete'] = this.get('singleBackstrokeDelete'); }
    if(!Ember.isNone(this.get('width'))) { options['width'] = this.get('width'); }
    if(!Ember.isNone(this.get('displayDisabledOptions'))) { options['display_disabled_options'] = this.get('displayDisabledOptions'); }
    if(!Ember.isNone(this.get('displaySelectedOptions'))) { options['display_selected_options'] = this.get('displaySelectedOptions'); }
    if(!Ember.isNone(this.get('includeGroupLabelInSelected'))) { options['include_group_label_in_selected'] = this.get('includeGroupLabelInSelected'); }

    return options;
  }.property('prompt', 'isRtl', 'multiple', 'disableSearchThreshold',
             'noResultsText', 'maxSelectedOptions', 'width',
             'allowSingleDeselect', 'disableSearch', 'enableSplitWordSearch', 'inheritSelectClasses',
             'placeholderTextMultiple', 'placeholderTextSingle', 'searchContains', 'singleBackstrokeDelete',
             'displayDisabledOptions', 'displaySelectedOptions', 'includeGroupLabelInSelected'),
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
