export default "{{#ember-chosen}}\n" +
              "    <option></option>\n" +
              "  {{#each countries as |country|}}\n" +
              "    <option {{bind-attr value=country.code}}>{{country.name}}</option>\n" +
              "  {{/each}}\n" +
              "{{/ember-chosen}}";
