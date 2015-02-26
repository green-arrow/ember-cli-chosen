export default "{{#ember-chosen selectionDidChange=\"onSelectionChanged\"}}\n" +
              "    <option></option>\n" +
              "  {{#each countries as |country|}}\n" +
              "    <option {{bind-attr value=country.code}}>{{country.name}}</option>\n" +
              "  {{/each}}\n" +
              "{{/ember-chosen}}\n" +
              "\n" +
              "<p>Message: {{actionMessage}}</p>";
