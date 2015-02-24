export default "{{#ember-chosen multiple=true value=multipleSelectValue}}\n" +
              "    <option></option>\n" +
              "  {{#each countries as |country|}}\n" +
              "    <option {{bind-attr value=country.code}}>{{country.name}}</option>\n" +
              "  {{/each}}\n" +
              "{{/ember-chosen}}\n" +
              "\n" +
              "<p>\n" +
              "    Selected values:\n" +
              "    <ul>\n" +
              "      {{#each multipleSelectValue as |value|}}\n" +
              "        <li>{{value}}</li>\n" +
              "      {{/each}}\n" +
              "    </ul>\n" +
              "</p>\n";
