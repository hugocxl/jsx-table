
# React Notable

<div align="center">

  [![NPM](https://img.shields.io/npm/v/react-notable.svg)](https://www.npmjs.com/package/react-notable)
  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
  [![Build Status](https://travis-ci.com/hcorta/react-notable.svg?branch=master)](https://travis-ci.com/hcorta/react-notable)
  [![dependencies Status](https://david-dm.org/hcorta/react-notable/status.svg)](https://david-dm.org/hcorta/react-notable)
  [![devDependencies Status](https://david-dm.org/hcorta/react-notable/dev-status.svg)](https://david-dm.org/hcorta/react-notable?type=dev)
  [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

<p>A <strong>simple</strong> but <strong>powerful</strong> lightweight (6.4kB) table for React with <strong>highly-customizable</strong> options</p>

***
### ⚠️🚧🚧 Currently in development stage 🚧🚧⚠️️️️
***


## Features

* Lightweight (6.4kb gziped - no dependencies)
* Auto out of the box, fully controllable API
* Headless (100% customizable, Bring-your-own-UI)
* Virtualization (no performance loss for long data lists)
* Easy-to-customize styling
* AutoSizer
* Sorting
* Pagination



## Pending development tasks

* Multi column sorting
* Export to file
* Freezing rows/columns
* Resizing columns
* Footer
* Infinite scrolling
* scrollToIndex, scrollTop, scrollToAlignment props
* Grouping / Pivoting
* Movable columns




## Install

```bash
yarn add react-notable
```

## Usage
> Columns can be passed as array or components. Both cases are listed below.

### Simple use case

```jsx
import { Table, Column } from 'react-notable'

function Example () {

    const data = [
        { name: 'Hugo', age: 30 },
        { name: 'John', age: 32 }
    ]

    const columns = [
        { header: 'Name', dataKey: 'name' },
        { header: 'Age', dataKey: 'age' }
    ]

    return (
        <Table data={data} columns={columns}/>
    )         
}
```

### Advanced use case

```jsx
import { Table, Column } from 'react-notable'


function CustomCell({ cellData, ...restOfCellProps }) {
  return (
    <span>{cellData}</span>
  )
}

function CustomHeader({ cellData, ...restOfHeaderProps }) {
  return (
    <span>{cellData}</span>
  )
}

function customColumnSort({ a, b, sortBy, sortDirection }) {
  if (sortDirection === 'ASC') {
    if (a[sortBy] < b[sortBy]) return -1
    if (a[sortBy] > b[sortBy]) return 1
  } else {
    if (a[sortBy] < b[sortBy]) return 1
    if (a[sortBy] > b[sortBy]) return -1
  }
}

function Example () {
    const data = [
        { name: 'Hugo', genre: 'Male', age: 30, country: 'Spain' },
        { name: 'Helen', genre: 'Female', age: 32, country: 'France' },
        ...
    ]

    return (
        <Table
            id={'custom-table-id'}
            className={'custom-table-class'}
            headerClassName={'custom-header-class'}
            rowClassName={'custom-row-class'}
            loading={loading}
            height={700}
            width={'100%'}
            data={data}
            rowHeight={20}
            headerHeight={25}
            overscanRowCount={50}
            virtualized={false}
            onRowClick={row => console.log('Row', row)}
            onCellClick={cell => console.log('Cell', cell)}
            onHeaderClick={header => console.log('Header', header)}
            onColumnSort={props => console.log(props)}
            noDataMessage={'There is no data to display'}
            noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
           >
                <Column
                  header={'Name'}
                  width={'20%'}
                  dataKey={'name'}
                  sortable={true}
                />
                <Column
                  header={'Genre'}
                  width={200}
                  dataKey={'genre'}
                  sortable={true}
                  columnSortMethod={customColumnSort}
                />
                <Column
                  header={CustomColumnHeader}
                  dataKey={'age'}
                  sortable={true}
                />
                <Column
                  header={'Country'}
                  dataKey={'country'}
                  sortable={true}
                  cell={CustomColumnCell}
                />
        </Table>
}

```

## Contributing

No one’s perfect. If you’ve found any errors, want to suggest enhancements, or expand on a topic, please feel free to open an Issue or collaborate by PR.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

<br>

## Code of Conduct

[Contributor Code of Conduct](public/docs/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

<br>

## License

`react-notable` is open source software licensed as MIT © [Hugo Corta](https://github.com/hcorta).
