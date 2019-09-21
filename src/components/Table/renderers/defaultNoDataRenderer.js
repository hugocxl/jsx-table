import React from 'react'
import { NoData } from '../../NoData'


export function defaultNoDataRenderer({
  noDataComponent,
  tableBodyHeight,
  ...rest
}) {
  return (
    <div
      className={'AwesomeTable__body-nodata'}
      style={{ height: tableBodyHeight }}>
      {noDataComponent ? (
        noDataComponent(rest)
      ) : (
        <NoData {...rest}/>
      )}
    </div>
  )
}
