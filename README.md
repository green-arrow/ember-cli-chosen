# ember-cli-chosen

This addon allows you to use the popular [Chosen jQuery plugin](http://harvesthq.github.io/chosen/) in your ember-cli application. The current supported version of Chosen plugin is 1.4.2.

**ember-cli-chosen works with ember-cli version '0.1.5' or later**

## Installation

```bash
ember install git://github.com/kklisura/ember-cli-chosen.git
```

## Build Options

There are two different build options you can supply to customize what Chosen files are included in your build.

### jQuery

By default, `ember-cli-chosen` will provide the version of Chosen that includes jQuery (`chosen.jquery.js`).
To use the version of Chosen without jQuery, specify `false` for the `jQuery` property.

```javascript
var EmberApp = new EmberApp({
  'ember-cli-chosen': {
    'jQuery': false
  }
});
```

### Chosen CSS

By default, `ember-cli-chosen` will include Chosen's CSS (as well as its sprites) in the build. 

To prevent Chosen's CSS from being included in the build, specify `false` for the `importChosenCSS` property.'

**NOTE: Specifying `false` for the `importChosenCSS` property will also cause the Chosen sprites to be removed from the build.**

```javascript
var EmberApp = new EmberApp({
  'ember-cli-chosen': {
    'importChosenCSS': false
  }
});
```

## Component

### Usage

In a template, render the component via `chosen-select`:

```hbs
{{chosen-select value=selectedValue
                content=stringsArray}}
```

```hbs
{{chosen-select value=selectedValue
                content=complexObjectsArray
                optionValuePath="content.value"
                optionLabelPath="content.label"}}
```

You may notice that attributes are as same as for Ember.Select view, so you can easily switch your select views for chosen-select.

Selecting multiple of elements with grouped content:

```hbs
{{chosen-select selection=multipleSelectedValue
                multiple=true
                content=countries
                optionValuePath="content.code"
                optionLabelPath="content.name"
                optionGroupPath="group"}}
```

### Options

`ember-cli-chosen` allows you to specify values for all of the available options that Chosen exposes.

    allowSingleDeselect
    disableSearch
    disableSearchThreshold
    enableSplitWordSearch
    inheritSelectClasses
    maxSelectedOptions
    noResultsText
    placeholderTextMultiple
    placeholderTextSingle
    searchContains
    singleBackstrokeDelete
    width
    displayDisabledOptions
    displaySelectedOptions
    includeGroupLabelInSelected

For more information about these properties see [Chosen docs](http://harvesthq.github.io/chosen/options.html).

Example: Selecting multiple values from array of complex objects, grouped by some group, with selected group shown on selected option label:

```hbs
{{chosen-select selection=multipleSelectedValue
                multiple=true
                content=countries
                optionValuePath="content.code"
                optionLabelPath="content.name"
                optionGroupPath="group"
                includeGroupLabelInSelected=true}}
```

### Actions

`ember-cli-chosen` supports the following actions:

    selectionDidChange
    chosenReady
    chosenMaxSelected
    chosenShowingDropdown
    chosenHidingDropdown
    chosenNoResults

For more information about these properties see [Chosen docs](http://harvesthq.github.io/chosen/options.html#triggered-events).

Example:

```hbs
{{chosen-select value=singleSelectValue
                prompt="Select some country"
                content=countries
                optionValuePath="content.code"
                optionLabelPath="content.name"
                selectionDidChange="onSelectionChanged"}}
```

```javascript
export default Ember.Controller.extend({
  // Controller implementation
  actions: {
    onSelectionChanged: function(selectedValue) {
      // selectedValue will be a single value for single selects
      // and an Array for multiple selects
      console.log('User selected:', selectedValue);
    }
  }
});
```
