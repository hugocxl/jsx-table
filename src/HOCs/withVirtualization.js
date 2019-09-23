import React from 'react'


export const withVirtualization = Table => props => {

  const ref = React.createRef()
  // function onScroll() {
  //   const tableDOM = document.getElementById('AwesomeTable')
  // }

  console.log('REF', ref)

  function onTableScroll() {

  }

  return <Table ref={ref} {...props}/>
}
