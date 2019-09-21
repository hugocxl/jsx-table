import React, { Component } from 'react'

import { ReactAwesomeTable } from 'react-awesome-table'


const data = [
  // { name: 'Hugo', age: 30, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' },
  // { name: 'Angeles', age: 32, country: 'Spain', city: 'Barcelona' }
]

const columns = [
  { Header: 'Name', id: 'name' },
  { Header: 'Age', id: 'age' },
  { Header: 'Country', id: 'country' },
  { Header: 'City', id: 'city' }
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
        noDataMessage={'noDataaa'}
        noDataComponent={({ noDataMessage }) => <span>{noDataMessage}</span>}
        // loading={loading}
      />
    </div>
  )

}
