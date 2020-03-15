import React from 'react'

export function Pagination ({
  activePage,
  onPageUp,
  onPageDown
}) {
  return (
    <div
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <button onClick={onPageDown}>Previous</button>
      {activePage}
      <button onClick={onPageUp}>Next</button>
    </div>
  )
}
