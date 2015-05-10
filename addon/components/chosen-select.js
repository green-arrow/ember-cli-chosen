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

// We support these Chosen events
var CHOSEN_EVENTS = ['change',
  'ready',
  'maxselected',
  'showing_dropdown',
  'hiding_dropdown',
  'no_results'];

// Custom handling for these properties
var CUSTOM_PROPERTIES = ['isRtl', 'prompt', 'multiple', 'content.@each'];

// All suported properties
var COMPONENT_PROPERTIES = CHOSEN_PROPERTIES.concat(CUSTOM_PROPERTIES);

// Mapping of CHOSEN_EVENTS to Component methods
var CHOSEN_EVENT_MAPING = {
  'ready': 'chosenReady',
  'maxselected': 'maxSelected'
};

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'select',
  classNameBindings: ['isRtl:chosen-rtl'],
  attributeBindings: ['prompt:data-placeholder', 'multiple'],

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

  // Chosen properties default values
  width: '100%',

  // These actions are getting called on chosen events
  selectionDidChange: null,
  chosenMaxSelected: null,
  chosenReady: null,
  chosenShowingDropdown: null,
  chosenHidingDropdown: null,
  chosenNoResults: null,

  /**
   * didInsertElement sets up chosen when component is inserted into DOM.
   * 
   */
  didInsertElement: function() {
    this._super();
    this._setupChosen();
  },

  /**
   * groupedContent creates a grouped content with respect to optionGroupPath.
   * 
   * @return {Array} Content in a grouped form.
   */
  groupedContent: computed('optionGroupPath', 'content.@each', function() {
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
  }),

  /**
   * _options watches property changes and builds up chosen options that are 
   * passed to chosen component.
   * 
   * @return {Object} Chosen options.
   */
  _options: computed.apply(null, COMPONENT_PROPERTIES.concat(function () {
    var options = {};

    CHOSEN_PROPERTIES.forEach(function (propertyName) {
      var propertyValue = this.get(propertyName);
      if (!Ember.isNone(propertyValue)) {
        options[propertyName.decamelize()] = propertyValue;
      }
    }.bind(this));

    return options;
  })),

  /**
   * _getFirstContent returns initial selected value from content property with
   * respect to optionValuePath.
   * 
   * @return {Object} Initial selected value or null.
   */
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

  /**
   * _setInitialSelectionValue sets the initial values for selection and value
   * properties.
   * 
   */
  _setInitialSelectionValue: function () {
    var isMultiple = this.get('multiple'),
      currentSelection = this.get('selection'),
      currentValue = this.get('value');

    if (!Ember.isNone(this.get('prompt'))) {
      return;
    }

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
  },

  /**
   * _setupChosen intializes chosen component.
   * 
   */
  _setupChosen: function() {
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  }.observes('_options'),

  /**
   * _subscribeToChosenEvents subscribes to chosen events.
   * 
   * @param  {Element} chosenElement
   */
  _subscribeToChosenEvents: function (chosenElement) {
    chosenElement.on('change', this._selectionChanged.bind(this));

    // Subscribe to chosen events
    CHOSEN_EVENTS.forEach(function (eventName) {
      var eventHandlerName = '_' + CHOSEN_EVENT_MAPING[eventName] || eventName.decamelize();
      if (this[eventHandlerName]) {
        chosenElement.on('chosen:' + eventName, this[eventHandlerName].bind(this));
      }
    }.bind(this));
  },

  /**
   * _unsubscribeFromChosenEvents unsubscribes from chosen events.
   * 
   * @param  {Element} chosenElement
   */
  _unsubscribeFromChosenEvents: function (chosenElement) {
    chosenElement.off('change');

    // Subscribe to chosen events
    CHOSEN_EVENTS.forEach(function (eventName) {
      var eventHandlerName = '_' + CHOSEN_EVENT_MAPING[eventName] || eventName.decamelize();
      if (this[eventHandlerName]) {
        chosenElement.off('chosen:' + eventName);
      }
    }.bind(this));
  },


  /**
   * afterRenderEvent is called after all child views are rendered
   * 
   */
  afterRenderEvent: function () {
    var options = this.get('_options'),
      alreadyInitialized = this.get('_chosenInitialized');

    if (alreadyInitialized) {
      this._unsubscribeFromChosenEvents(this.$());
    }

    this._setInitialSelectionValue();

    // Initialize chosen 
    var chosenElement = this.$().chosen(options);
    this._subscribeToChosenEvents(chosenElement);

    if (alreadyInitialized) {
      this.$().trigger('chosen:updated');
    }

    this.set('_chosenInitialized', true);
  },

  /**
   * _selectionChanged is triggered when selection on chosen components is 
   * changed. Selection and value properties are updated here. selectionDidChange
   * is triggered after setting selection values.
   * 
   * @param  {Object} ev     Event
   * @param  {Object} params Chosen params
   * 
   */
  _selectionChanged: function (ev, params) {
    var selectedValue = params.selected,
      isMultiple = this.get('multiple'),
      currentSelection,
      index;

    if (isMultiple) {
      currentSelection = this.get('selection');
      if (!currentSelection) {
        currentSelection = Ember.A();
        this.set('selection', currentSelection);
      }

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
  },

  /**
   * _maxSelected is triggered when max number of items is selected on chosen
   * component. Max number of items can be controlled through maxSelectedOptions
   * property.
   * 
   */
  _maxSelected: function () {
    this.sendAction('chosenMaxSelected');
  },

  /**
   * _chosenReady is triggered on chosen:ready event.
   * 
   */
  _chosenReady: function () {
    this.sendAction('chosenReady');
  },

  /**
   * _showingDropdown is triggered on chosen:showing_dropdown event.
   * 
   */
  _showingDropdown: function () {
    this.sendAction('chosenShowingDropdown');
  },

  /**
   * _hidingDropdown is triggered on chosen:hiding_dropdown event.
   * 
   */
  _hidingDropdown: function () {
    this.sendAction('chosenHidingDropdown');
  },

  /**
   * _noResults is triggered on chosen:no_results event.
   * 
   */
  _noResults: function () {
    this.sendAction('chosenNoResults');
  }
});