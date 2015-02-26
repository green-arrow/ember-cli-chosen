export default "{{#ember-chosen value=singleSelectValue}}\n" +
              "    <option></option>\n" +
              "  {{#each countries as |country|}}\n" +
              "    <option {{bind-attr value=country.code}}>{{country.name}}</option>\n" +
              "  {{/each}}\n" +
              "{{/ember-chosen}}\n" +
              "\n" +
              "<p>Selected value: {{singleSelectValue}}</p>";
