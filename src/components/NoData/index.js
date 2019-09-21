import React from 'react'


export function NoData({ noDataMessage }) {
  return (
    <span className={'AwesomeTable__body-nodata-text'}>
      {noDataMessage || 'No data'}
    </span>
  )
}
