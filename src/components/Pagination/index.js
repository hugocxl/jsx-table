import React from 'react'


export function Pagination({
  currentPage,
  onNextPageClick,
  onPreviousPageClick
}) {

  return (
    <div
      style={{ padding: '0 40px', height: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
      className={'AwesomeTable__pagination'}>
      <button onClick={onPreviousPageClick}>Previous</button>
      {currentPage}
      <button onClick={onNextPageClick}>Next</button>
    </div>
  )
}
