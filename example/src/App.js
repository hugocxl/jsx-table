import React from 'react'

import { Table, Column } from 'react-ninja-table'

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
  const [data, setData] = React.useState(getData(''))

  // React.useEffect(() => {
  //   window.setTimeout(() => {
  //     setLoading(!loading)
  //   }, 2000)
  // }, [loading])

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Table
        id={'ninja-id'}
        className={'instance-class'}
        headerClassName={'header-classname-demo'}
        rowClassName={'row-classname-demo'}
        height={700}
        width={'100%'}
        data={getData(15000)}
        rowHeight={20}
        headerHeight={25}
        // overscanRowCount={50}
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
          width={100}
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

      </Table>

    </div>
  )
}
