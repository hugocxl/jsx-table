import React from 'react'

import { Table as BaseTable, Column, AutoSizer, useGroupBy, useExpanded, withPagination } from 'react-notable'

import { getData } from './getData'

function customCell ({ cellData }) {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{ height: '60%', background: 'chartreuse', width: `${cellData}%` }}/>
    </div>
  )
}

function inputCell ({ cellData }) {
  return <input value={cellData}/>
}

function customColumnSort ({ a, b, sortBy, sortDirection }) {
  if (sortDirection === 'ASC') {
    if (a[sortBy] < b[sortBy]) return -1
    if (a[sortBy] > b[sortBy]) return 1
  } else {
    if (a[sortBy] < b[sortBy]) return 1
    if (a[sortBy] > b[sortBy]) return -1
  }
}

function alertMessage (el, data) {
  let message = { ...data, event: '' }
  return window.alert(`${el} clicked!
  ${JSON.stringify(message)}`)
}

export function App () {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(getData(1000))

  const columns = [
    { header: 'Row Index', dataKey: '', sortable: true, cell: ({ rowIndex }) => `row ${rowIndex}` },
    { header: 'ID', dataKey: 'id', sortable: true, width: 250 },
    { header: 'Birth date', dataKey: 'birthDate' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Name', align: 'center', dataKey: 'name', sortable: true },
    { header: 'Last name', dataKey: 'lastName' },
    { header: 'Age', dataKey: 'age', sortable: true },
    { header: 'Genre', dataKey: 'genre', columnSortMethod: customColumnSort, sortable: true },
    { header: 'Country', dataKey: 'country', sortable: true },
    { header: 'City', dataKey: 'city', sortable: true },
    { header: 'Completed', dataKey: 'completed', cell: customCell, sortable: true, }
  ]

  function loadMoreRows () {
    setLoading(true)

    setTimeout(() => {
      const newRows = getData(50)
      setLoading(false)
      setData([...data, ...newRows])
    }, 1000)
  }

  // const groupedData = useGroupBy({ data, columns, groupBy: ['name', 'country'] })
  // const expandedData = useExpanded({ data: groupedData.data, columns: groupedData.columns })
  let Table = BaseTable

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>

      <AutoSizer>
        {({ width, height }) => (
          <Table
            // id={'custom-table-id'}
            // className={'custom-table-class'}
            // headerClassName={'custom-header-class'}
            // rowClassName={'custom-row-class'}
            height={height}
            columns={columns}
            headerHeight={18}
            // stickyColumns={2}
            stickyRows={({ rowData: { name, genre, age } }) => (name === 'Hugo' && genre === 'Male' && age > 30)}
            width={width}
            // loadMoreRows={loadMoreRows}
            // threshold={50}
            rowHeight={18}
            minColumnWidth={100}
            data={data}
            overscanRowCount={20}
            // pagination={true}
            // paginationHeight={30}
            // pageSize={50}
            // defaultPage={2}
            // onPageChange={props => console.log('PAGINATION', props)}
            virtualized={true}
            // sortable={true}
            // onRowClick={row => alertMessage('Row', row)}
            // onCellClick={cell => alertMessage('Cell', cell)}
            // onHeaderClick={header => alertMessage('Header', header)}
            // onColumnSort={props => console.log(props)}
            // noDataMessage={'There is no data'}
            // noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
            loading={loading}
          />
        )}
      </AutoSizer>

    </div>
  )
}
