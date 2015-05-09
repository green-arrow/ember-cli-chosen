import Ember from 'ember';

// We support these Chosen properties
var CHOSEN_PROPERTIES = ['allowSingleDeselect',
  'disableSearch',
  'disableSearchThreshold',
  'enableSplitWordSearch',
  'inheritSelectClasses',
  'maxSelectedOptions',
  'noResultsText',
  'placeholderTextMultiple',
  'placeholderTextSingle',
  'searchContains',
  'singleBackstrokeDelete',
  'width',
  'displayDisabledOptions',
  'displaySelectedOptions',
  'includeGroupLabelInSelected'];

// Custom handling for these properties
var CUSTOM_PROPERTIES = ['isRtl', 'prompt', 'multiple'];

// All suported properties
var COMPONENT_PROPERTIES = CHOSEN_PROPERTIES.concat(CUSTOM_PROPERTIES);

export default Ember.Component.extend({
  tagName: 'select',
  classNameBindings: ['isRtl:chosen-rtl'],
  attributeBindings: ['prompt:data-placeholder', 'multiple'],

  // select element specific properties 
  prompt: null,

  multiple: false,

  optionLabelPath: null,
  optionValuePath: null,
  optionGroupPath: null,

  content: null,
  selection: null,
  value: null,

  groupView: Ember.SelectOptgroup,
  optionView: Ember.SelectOption,

  isRtl: false,

  // These actions are getting called
  selectionDidChange: null,
  chosenMaxSelected: null,

  didInsertElement: function() {
    this._super();
    this._setupChosen();
  },

  groupedContent: function() {
    var groupPath = this.get('optionGroupPath');
    var groupedContent = Ember.A();
    var content = this.get('content') || [];

    content.forEach(function(item) {
      var label = item[groupPath];

      if (groupedContent.get('lastObject.label') !== label) {
        groupedContent.pushObject({
          label: label,
          content: Ember.A()
        });
      }

      groupedContent.get('lastObject.content').push(item);
    });

    return groupedContent;
  }.property('optionGroupPath', 'content.@each'),

  // Chosen specific options
  _options: Ember.computed(COMPONENT_PROPERTIES, function () {
    var options = {};

    CHOSEN_PROPERTIES.forEach(function (propertyName) {
      var propertyValue = this.get(propertyName);
      if (!Ember.isNone(propertyValue)) {
        options[propertyName.decamelize()] = propertyValue;
      }
    }.bind(this));

    return options;
  }),

  _getFirstContent: function () {
    var optionValuePath = this.get('optionValuePath'),
      content = this.get('content'),
      value = null,
      match;

    if (Ember.isNone(content) || !Ember.isArray(content) || Ember.isEmpty(content)) {
      return null;
    }

    if (optionValuePath) {
      match = optionValuePath.match(/content\.(.+)/);
      if (match) {
        value = content[0][match[1]];
      } else {
        Ember.Logger.error('optionValuePath \'' + optionValuePath + '\' does not reference \'content\'');
      }
    } else {
      value = content[0];
    }

    return value;
  },

  _setupChosen: function() {
    var options = this.get('_options'),
      isMultiple = this.get('multiple'),
      currentSelection = this.get('selection'),
      currentValue = this.get('value');

    // Set initial selection to value and selection
    if (isMultiple) {
      currentSelection = Ember.makeArray(currentSelection);
      this.set('selection', currentSelection);
    } else {
      if (Ember.isNone(currentValue)) {
        if (Ember.isNone(currentSelection)) {
          // If no value or selection supplied, use first value from content
          currentValue = this._getFirstContent();
        } else {
          if (Ember.isArray(currentSelection)) {
            currentValue = currentSelection[0];
          } else {
            currentSelection = currentSelection;
          }
        }
      }
      this.set('selection', currentValue);
      this.set('value', currentValue);
    }

    // Subscribe to chosen events
    this.$().chosen(options)
      .on('change', this._selectionChanged.bind(this))
      .on('chosen:maxselected', this.sendAction.bind(this, 'chosenMaxSelected'));

  }.observes('_options'),

  _selectionChanged: function (ev, params) {
    var selectedValue = params.selected,
      isMultiple = this.get('multiple'),
      currentSelection,
      index;

    if (isMultiple) {
      currentSelection = this.get('selection');

      if (params.selected) {
        currentSelection.pushObject(selectedValue);
      } else {
        index = currentSelection.indexOf(params.deselected);

        if (index !== -1) {
          currentSelection.removeAt(index);
        }
      }
    } else {
      this.set('selection', selectedValue);
      this.set('value', selectedValue);
    }

    this.sendAction('selectionDidChange', selectedValue);
  }
});