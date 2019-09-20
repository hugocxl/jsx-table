import React, { Component } from 'react'

import { ReactAwesomeTable } from 'react-awesome-table'


const data = [
  { name: 'Hugo', age: 30 },
  { name: 'Angeles', age: 32 }
]

const columns = [
  { Header: 'Name', id: 'name' },
  { Header: 'Age', id: 'age' }
]

export function App() {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    window.setTimeout(() => {
      setLoading(!loading)
    }, 2000)
  }, [loading])

  return (
    <div style={{ height: 300, width: 300, background: 'red' }}>
      <ReactAwesomeTable
        data={data}
        columns={columns}
        onRowClick={row => console.log(row)}
        loading={loading}
      />
    </div>
  )

}
