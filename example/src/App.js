import React from 'react'

import { ReactNinjaTable, Column } from 'react-ninja-table'

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
      <ReactNinjaTable
        data={getData(100)}
        rowHeight={25}
        headerHeight={25}
        // pagination={true}
        // paginationHeight={20}
        // pageSize={30}
        onPageChange={props => console.log('PAGINATION', props)}
        defaultPage={2}
        virtualized={true}
        // onRowClick={row => console.log(row)}
        // onHeaderClick={header => console.log(header)}
        // onColumnSort={props => console.log(props)}
        // noDataMessage={'There is no data'}
        // noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
        // loading={loading}
      >
        <Column
          header={'Name'}
          dataKey={'name'}
          sortable={true}
        />
        <Column
          header={'Completed'}
          dataKey={'completed'}
          sortable={true}
          cell={customCell}
        />
        <Column
          header={'Genre'}
          dataKey={'genre'}
          sortable={true}
          columnSortMethod={customColumnSort}
        />
        <Column
          header={'Age'}
          dataKey={'age'}
          sortable={true}
        />

        <Column
          header={'Country'}
          dataKey={'country'}
          sortable={true}
        />

        <Column
          header={'City'}
          dataKey={'city'}
          sortable={true}
        />

      </ReactNinjaTable>

    </div>
  )
}
