import React from 'react'

import { Table, Column, AutoSizer, useGroupBy, useExpanded } from 'react-notable'

import { getData } from './getData'


function customCell({ cellData }) {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{ height: '60%', background: 'chartreuse', width: `${cellData}%` }}/>
    </div>
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

function alertMessage(el, data) {
  return window.alert(`${el} clicked!
  ${JSON.stringify(data)}`)
}

export function App() {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(getData(5000))

  const columns = [
    { header: 'Row Index', dataKey: '', sortable: true, cell: ({ rowIndex }) => `row ${rowIndex}`, width: 60 },
    { header: 'Name', dataKey: 'name', sortable: true },
    // { header: 'Completed', dataKey: 'completed', width: 100, cell: customCell, sortable: true },
    { header: 'Genre', dataKey: 'genre', columnSortMethod: customColumnSort, sortable: true },
    { header: 'Age', dataKey: 'age', sortable: true },
    { header: 'Country', dataKey: 'country', sortable: true },
    { header: 'City', dataKey: 'city', sortable: true }
  ]

  function loadMoreRows() {
    const newRows = getData(20)
    setData([...data, ...newRows])
  }

  const groupedData = useGroupBy({ data, columns, groupBy: ['country'] })
  const expandedData = useExpanded({ data: groupedData.data, columns: groupedData.columns })

  debugger

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr'
    }}>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            id={'custom-table-id'}
            className={'custom-table-class'}
            headerClassName={'custom-header-class'}
            rowClassName={'custom-row-class'}
            height={height}
            columns={expandedData.columns}
            width={width}
            loadMoreRows={loadMoreRows}
            threshold={10}
            rowHeight={50}
            data={expandedData.data}
            overscanRowCount={0}
            // pagination={true}
            // paginationHeight={20}
            // pageSize={100}
            // defaultPage={2}
            pivotBy={['country']}
            // onPageChange={props => console.log('PAGINATION', props)}
            virtualized={true}
            sortable={true}
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
