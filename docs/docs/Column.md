---
id: column
title: Column
---

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
