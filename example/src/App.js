import React from 'react'

import { Table, Column, AutoSizer } from 'react-notable'

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
  const [data, setData] = React.useState(getData(100))

  const columns = [
    { header: 'Name', dataKey: 'name', sortable: true },
    { header: 'Completed', dataKey: 'completed', width: 100, cell: customCell, sortable: true },
    { header: 'Genre', dataKey: 'genre', columnSortMethod: customColumnSort, sortable: true },
    { header: 'Age', dataKey: 'age', sortable: true },
    { header: 'Country', dataKey: 'country', sortable: true },
    { header: 'City', dataKey: 'city', sortable: true }
  ]

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          id={'ninja-id'}
          className={'instance-class'}
          headerClassName={'header-classname-demo'}
          rowClassName={'row-classname-demo'}
          height={height}
          columns={columns}
          width={width}
          data={data}
          rowHeight={20}
          headerHeight={25}
          overscanRowCount={0}
          // pagination={true}
          // paginationHeight={20}
          // pageSize={30}
          // defaultPage={2}
          onPageChange={props => console.log('PAGINATION', props)}
          virtualized={true}
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
  )
}
