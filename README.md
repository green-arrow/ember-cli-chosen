# ember-cli-chosen

This addon allows you to use the popular [Chosen jQuery plugin](http://harvesthq.github.io/chosen/) in your ember-cli application.

**ember-cli-chosen works with ember-cli version '0.1.5' or later**

## Installation

```bash
ember install:addon ember-cli-chosen
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

In a template, render the component via `ember-chosen`:

```hbs
{{#ember-chosen}}
  <option value="1">Tom Dale</option>
  <option value="2">Yehuda Katz</option>
  ...
{{/ember-chosen}}
```

### Options

`ember-cli-chosen` allows you to specify values for all of the available options that Chosen exposes.

All of the options below are watched for changes. If a change occurs, Chosen is re-initialized with the updated options.

#### prompt

The placeholder for your Chosen input. This will set the `data-placeholder` attribute.

**NOTE: For `prompt` to be displayed for single item select inputs, you must provide an empty <option> as the first
option for your input**

```hbs
{{#ember-chosen prompt="Select one..."}}
  <option></option>
  ...
{{/ember-chosen}}
```

#### isRtl

Right-to-left mode. This will add the `chosen-rtl` class to the select input.

```hbs
{{#ember-chosen isRtl=true}}
  ...
{{/ember-chosen}}
```

### multiple

Allows multiple selections.

```hbs
{{#ember-chosen multiple=true}}
  ...
{{/ember-chosen}}
```

#### disableSearchThreshold

The number of options at which the search functionality should be disabled.

```hbs
{{#ember-chosen disableSearchThreshold=10}}
  ...
{{/ember-chosen}}
```

#### noResultsText

The text to be displayed when no results are available as a result of a search.

```hbs
{{#ember-chosen noResultsText="Sorry, nothing to display!"}}
  ...
{{/ember-chosen}}
```

#### maxSelectedOptions

Set the maximum allowed number of selected options.

```hbs
{{#ember-chosen maxSelectedOptions=5}}
  ...
{{/ember-chosen}}
```

#### width

Sets the width of the input.

**Default:** "100%"
