import React from 'react'
import { NoData } from '../NoData'


export function defaultNoDataRenderer({
  noDataComponent,
  tableBodyHeight,
  noDataProps,
  ...rest
}) {
  return (
    <div
      className={'jsx-table__body-nodata'}
      style={{ height: tableBodyHeight, ...noDataProps && noDataProps.style }}>
      {noDataComponent ? (
        noDataComponent(rest)
      ) : (
        <NoData {...rest}/>
      )}
    </div>
  )
}
