export default "import Ember from 'ember';\n" +
              "\n" +
              "export default Ember.Controller.extend({\n" +
              "  // Controller implementation\n" +
              "  maxSelectedMessage: null,\n" +
              "  actions: {\n" +
              "    onChosenMaxSelected: function(e, chosen) {\n" +
              "      this.set('maxSelectedMessage', \"You can't select any more!\");\n" +
              "    }\n" +
              "  }\n" +
              "});";
