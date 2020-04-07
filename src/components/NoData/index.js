import React from 'react'


export function NoData({ noDataMessage }) {
  return (
    <span className={'jsx-table__body-nodata-text'}>
      {noDataMessage || 'No data'}
    </span>
  )
}
