export default "{{chosen-select prompt=\"Select some country\"\n" +
"                content=countries\n" +
"                optionValuePath=\"content.code\"\n" +
"                optionLabelPath=\"content.name\"\n" +
"                selectionDidChange=\"onSelectionChanged\"}}";