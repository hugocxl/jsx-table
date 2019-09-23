import React from 'react'

import { ReactAwesomeTable } from 'react-awesome-table'

import { getData } from './getData'


const columns = [
  {
    Header: 'Name',
    id: 'name',
    sortable: true,
    columnSortMethod: ({ a, b, sortBy, sortDirection }) => {
      if (sortDirection === 'ASC') {
        if (a[sortBy] < b[sortBy]) return -1
        if (a[sortBy] > b[sortBy]) return 1
      } else {
        if (a[sortBy] < b[sortBy]) return 1
        if (a[sortBy] > b[sortBy]) return -1
      }
    }
  },
  {
    Header: 'Genre',
    id: 'genre',
    sortable: true
  },
  {
    Header: 'Age',
    id: 'age',
    sortable: true
  },
  {
    Header: 'Country',
    id: 'country',
    sortable: true
  },
  {
    Header: 'City',
    id: 'city'
  }
]

export function App() {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(getData(''))

  // React.useEffect(() => {
  //   window.setTimeout(() => {
  //     setLoading(!loading)
  //   }, 2000)
  // }, [loading])

  return (
    <div style={{
      height: 500,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ReactAwesomeTable
        data={getData(50)}
        columns={columns}
        rowHeight={20}
        headerHeight={30}
        pagination={true}
        pageSize={20}
        virtualized={true}
        // onRowClick={row => console.log(row)}
        // onHeaderClick={header => console.log(header)}
        // onColumnSort={props => console.log(props)}
        // noDataMessage={'There is no data'}
        // noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
        // loading={loading}
      />
    </div>
  )
}
