import React, { Component } from 'react'

import { ReactAwesomeTable } from 'react-awesome-table'


const data = [
  { name: 'Hugo', age: 30, country: 'Spain', city: 'Barcelona' },
  { name: 'Angeles', age: 12, country: 'Spain', city: 'Barcelona' },
  { name: 'Ana', age: 42, country: 'Spain', city: 'Barcelona' },
  { name: 'Fer', age: 52, country: 'Spain', city: 'Barcelona' },
  { name: 'Sonia', age: 62, country: 'Spain', city: 'Barcelona' },
  { name: 'Rosita', age: 72, country: 'Spain', city: 'Barcelona' },
  { name: 'Mari', age: 3112, country: 'Spain', city: 'Barcelona' },
  { name: 'Nando', age: 2, country: 'Spain', city: 'Barcelona' },
  { name: 'Ruben', age: 0, country: 'Spain', city: 'Barcelona' },
  { name: 'Paula', age: -1, country: 'Spain', city: 'Barcelona' },
  { name: 'Maria', age: -5, country: 'Spain', city: 'Barcelona' },
  { name: 'Angeles', age: -100, country: 'Spain', city: 'Barcelona' }
]

const columns = [
  {
    Header: 'Name',
    id: 'name',
    sortable: true
  },
  {
    Header: 'Age',
    id: 'age'
  },
  {
    Header: 'Country',
    id: 'country'
  },
  {
    Header: 'City',
    id: 'city'
  }
]

export function App() {
  const [loading, setLoading] = React.useState(false)

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
        data={data}
        columns={columns}
        onRowClick={row => console.log(row)}
        // noDataMessage={'There is no data'}
        // noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
        // loading={loading}
      />
    </div>
  )
}
