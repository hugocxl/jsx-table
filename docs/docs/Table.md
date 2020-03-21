---
id: table
title: Table
---

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| autoHeight | Boolean |  | Outer `height` of `Table` is set to "auto". This property should only be used in conjunction with the `WindowScroller` HOC. |
| children | [Column](Column.md) | ✓ | One or more Columns describing the data displayed in this table |
| className | String |  | Optional custom CSS class name to attach to root `Table` element. |
| disableHeader | Boolean |  | Do not render the table header (only the rows) |
| estimatedRowSize | Number |  | Used to estimate the total height of a `Table` before all of its rows have actually been measured. The estimated total height is adjusted as rows are rendered. |
| gridClassName | String |  | Optional custom CSS class name to attach to inner Grid element |
| gridStyle | Object |  | Optional inline style to attach to inner Grid element |
| headerClassName | String |  | CSS class to apply to all column headers |
| headerHeight | Number | ✓ | Fixed height of header row |
| headerRowRenderer | Function |  | Responsible for rendering the table header row given an array of columns. [Learn more](#headerrowrenderer) |
| headerStyle | Object |  | Optional custom inline style to attach to table header columns. |
| height | Number | ✓ | Fixed/available height for out DOM element |
| id | String |  | Optional custom id to attach to root `Table` element. |
| noRowsRenderer | Function |  | Callback used to render placeholder content when :rowCount is 0 |
| onColumnClick | Function |  | Callback invoked when a user clicks on a table column. `({ columnData: any, dataKey: string, event: Event }): void` |
| onHeaderClick | Function |  | Callback invoked when a user clicks on a table header. `({ columnData: any, dataKey: string, event: Event }): void` |
| onRowClick | Function |  | Callback invoked when a user clicks on a table row. `({ event: Event, index: number, rowData: any }): void` |
| onRowDoubleClick | Function |  | Callback invoked when a user double-clicks on a table row. `({ event: Event, index: number, rowData: any }): void` |
| onRowMouseOut | Function | | Callback invoked when the mouse leaves a table row. `({ event: Event, index: number, rowData: any }): void` |
| onRowMouseOver | Function |  | Callback invoked when a user moves the mouse over a table row. `({ event: Event, index: number, rowData: any }): void` |
| onRowRightClick | Function |  | Callback invoked when a user right-clicks on a table row. `({ event: Event, index: number, rowData: any }): void` |
| onRowsRendered | Function |  | Callback invoked with information about the slice of rows that were just rendered: `({ overscanStartIndex: number, overscanStopIndex: number, startIndex: number, stopIndex: number }): void` |
| overscanRowCount | Number |  | Number of rows to render above/below the visible bounds of the list. This can help reduce flickering during scrolling on certain browsers/devices. See [here](overscanUsage.md) for an important note about this property. |
| onScroll | Function |  | Callback invoked whenever the scroll offset changes within the inner scrollable region: `({ clientHeight: number, scrollHeight: number, scrollTop: number }): void` |
| rowClassName | String or Function |  | CSS class to apply to all table rows (including the header row). This value may be either a static string or a function with the signature `({ index: number }): string`. Note that for the header row an index of `-1` is provided. |
| rowCount | Number | ✓ | Number of rows in table. |
| rowGetter | Function | ✓ | Callback responsible for returning a data row given an index. `({ index: int }): any` |
| rowHeight | Number or Function | ✓ | Either a fixed row height (number) or a function that returns the height of a row given its index: `({ index: number }): number` |
| rowRenderer | Function |  | Responsible for rendering a table row given an array of columns. [Learn more](#rowrenderer) |
| rowStyle | Object or Function |  | Optional custom inline style to attach to table rows. This value may be either a style object or a function with the signature `({ index: number }): Object`. Note that for the header row an index of `-1` is provided. |
| scrollToAlignment | String |  | Controls the alignment scrolled-to-rows. The default ("_auto_") scrolls the least amount possible to ensure that the specified row is fully visible. Use "_start_" to always align rows to the top of the list and "_end_" to align them bottom. Use "_center_" to align them in the middle of container. |
| scrollToIndex | Number |  | Row index to ensure visible (by forcefully scrolling if necessary) |
| scrollTop | Number |  | Vertical offset |
| sort | Function |  | Sort function to be called if a sortable header is clicked. `({ defaultSortDirection: string, event: MouseEvent, sortBy: string, sortDirection: SORT_DIRECTION }): void` |
| sortBy | String |  | Data is currently sorted by this `dataKey` (if it is sorted at all) |
| sortDirection | [SORT_DIRECTION](SortDirection.md) |  | Data is currently sorted in this direction (if it is sorted at all) |
| style | Object |  | Optional custom inline style to attach to root `Table` element. |
| tabIndex | Number |  | Optional override of inner `Grid` tab index default; defaults to `0`. |
| width | Number | ✓ | Width of the table |



Describes the header and cell contents of a table column.
It can be expressed in two different forms, as react-dinotable reacognizes it as a react component and an object.

:::important Note
The below description only refers to the column expresed as a react component.
Nevertheless, if you decide to express the columns for your table as objects in an array they work the same,
as long as they are used as keys in the columns objects.

````jsx harmony

// This:

<Table>
  <Column dataKey={'id'} header={'ID'} width={200}/>
  <Column dataKey={'name'} header={'Name'}/>
  <Column dataKey={'lastName'} header={'Last Name'} width={'10%'}/>
</Table>


// Is the same as:

const columns = [
  { dataKey: 'id', header: 'ID', width: 200 },
  { dataKey: 'name', header: 'Name' },
  { dataKey: 'lastName', header: 'Last Name', width: '10%' },
]

<Table columns={columns} />
````
:::


# ````<Column/>````
```jsx harmony
import { Column } from 'react-table'
```

As a react component, the colum works as a children of the table component.
It admits the following props.

## Props


### dataKey
Unique identifier for the row-data attribute (key) corresponding to this cell.

#### <span class="badge badge--info">String</span>

````jsx harmony
<Column
    dataKey={'name'}
/>
````



### width
Optional width for the column. It can be expressed as percentage or a number (pixels).


In case it is not provided the colums be adjusted automatically based on the ``minColumnWidth`` prop of the table.
In case only some of them are provided, the table will adjust the remaining space taking in count ```minColumnWidth```.
Note, that if the remaining space of the viewport would result less than the total, horizontal scrolling will be created.

#### <span class="badge badge--info">String or Number</span>

````jsx harmony
<Column
    width={'15%' || 200}
/>
````


### header
Optional renderer for the column header. It can be a string or a callback responsible for rendering a column's header column.
This second option allows to easily customize header elements with custom components.

#### <span class="badge badge--info">String or Function</span>

````jsx harmony

function headerRenderer ({
  ...headerComponentProps,
  header,
  align,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,
  onSortableClick,
  sortable,
  dataKey,
  columnSortMethod,
  sortBy,
  sortDirection,
  sticky,
  minColumnWidth,
  headerIndex,
  width
}) {
  return <span>{headerIndex}</span>
}

 <Column
     header={'Description' || headerRenderer}
 />
````


### align
Optional alignment for the column. It can be: **_center_, _left_ or _right_**.

:::note Note
Note that if you override the header renderer by providing a custom function you'd have to manually align your component.
:::

#### <span class="badge badge--info">String</span>

````jsx harmony
<Column
    align={'left'}
/>
````

