export default "import Ember from 'ember';\n" +
              "\n" +
              "export default Ember.Controller.extend({\n" +
              "  // Controller implementation\n" +
              "  actionMessage: null,\n" +
              "  actions: {\n" +
              "    onSelectionChanged: function(selectedValue) {\n" +
              "      this.set('actionMessage', 'You selected ' + selectedValue + '!');\n" +
              "    }\n" +
              "  }" +
              "});";
