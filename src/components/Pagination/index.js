import React from 'react'


export function Pagination({
  currentPage,
  onNextPageClick,
  onPreviousPageClick
}) {

  return (
    <React.Fragment>
      <button onClick={onPreviousPageClick}>Previous</button>
      {currentPage}
      <button onClick={onNextPageClick}>Next</button>
    </React.Fragment>
  )
}
