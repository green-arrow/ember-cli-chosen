export default "{{#ember-chosen multiple=true maxSelectedOptions=2 chosenMaxSelected=\"onChosenMaxSelected\"}}\n" +
              "    <option></option>\n" +
              "  {{#each countries as |country|}}\n" +
              "    <option {{bind-attr value=country.code}}>{{country.name}}</option>\n" +
              "  {{/each}}\n" +
              "{{/ember-chosen}}\n" +
              "\n" +
              "<p><strong>{{maxSelectedMessage}}</strong></p>";
