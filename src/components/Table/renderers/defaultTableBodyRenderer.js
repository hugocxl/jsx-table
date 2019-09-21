import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


export function defaultTableBodyRenderer({
  tableBodyHeight,
  rowRenderer,
  disableHeader,
  headerHeight,
  data,
  loadingRenderer,
  loadingComponent,
  loading,
  ...rest
}) {

  return (
    <React.Fragment>
      {loading && (loadingRenderer ? (
        loadingRenderer({ loadingComponent, height: tableBodyHeight })) : (
        defaultLoadingRenderer({ loadingComponent, height: tableBodyHeight })
      ))}

      <div
        className={cx('AwesomeTable__body', { loading })}
        style={{ height: tableBodyHeight, maxHeight: tableBodyHeight }}>
        {data.map((rowData, rowIndex) => {
          const rowProps = {
            rowData,
            rowIndex,
            ...rest
          }

          return rowRenderer
            ? rowRenderer(rowProps)
            : defaultRowRenderer(rowProps)
        })}
      </div>
    </React.Fragment>
  )
}
