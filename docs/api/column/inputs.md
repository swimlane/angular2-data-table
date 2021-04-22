# Table Column Options

### `name`: `string`

Column label. If none specified, it will use the prop value and decamelize it.

### `prop`: `string`

The property to bind the row values to. If `undefined`, it will camelcase the name value.

### `flexGrow`: `number`

The grow factor relative to other columns. Same as the [flex-grow API](https://www.w3.org/TR/css3-flexbox/).
It will any available extra width and distribute it proportionally according to all columns' flexGrow values. Default value: `0`

### `minWidth`: `number`

Minimum width of the column in pixels. Default value: `100`

### `maxWidth`: `number`

Maximum width of the column in pixels. Default value: `undefined`

### `width`: `number`

The width of the column by default in pixels. Default value: `150`

### `resizeable`: `boolean`

The column can be resized manually by the user. Default value: `true`

### `comparator`

Custom sort comparator, used to apply custom sorting via client-side.
Function receives five parameters, namely values and rows of items to be sorted as well as direction of the sort ('asc'|'desc'):

```
(valueA, valueB, rowA, rowB, sortDirection) => -1|0|1
```

NOTE: Compare can be a standard JS comparison function (a,b) => -1|0|1 as additional parameters are silently ignored.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more info.

### `sortable`: `boolean`

Sorting of the row values by this column. Default value: `true`

### `draggable`: `boolean`

The column can be dragged to re-order. Default value: `true`

### `canAutoResize`: `boolean`

Whether the column can automatically resize to fill extra space. Default value: `true`

### `cellTemplate`: `TemplateRef`

Angular TemplateRef allowing you to author custom body cell templates. 

NOTE: When you use @ViewChild, make sure you initialize anything that depends on it on or after the ngOnInit lifecycle callback. Demo: https://github.com/swimlane/ngx-datatable/blob/master/src/app/templates/template-obj.component.ts

### `headerTemplate`: `TemplateRef`

Angular TemplateRef allowing you to author custom header cell templates

### `checkboxable`: `boolean`

Indicates whether the column should show a checkbox component for selection. Only
applicable when the selection mode is `checkbox`.

### `headerCheckboxable`: `boolean`

Indicates whether the column should show a checkbox component in the header cell.
Only applicable when the selection mode is `checkbox`.

### `headerClass`: `string|Function`

Header CSS classes to apply to the header cell

### `cellClass`: `string|Function`

Cell classes to apply to the body cell

### `frozenLeft`: `boolean`

Determines if the column is frozen to the left. Default value: `false`

### `frozenRight`: `boolean`

Determines if the column is frozen to the right. Default value: `false`

### `pipe`: `PipeTransform`

Custom pipe transforms. Default value: `undefined`
