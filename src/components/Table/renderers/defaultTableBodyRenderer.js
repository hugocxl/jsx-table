import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'


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

      <div style={{
        width: '100%',
        overflow: 'hidden auto',
        height: tableBodyHeight,
        maxHeight: tableBodyHeight,
        opacity: loading ? 0.25 : 1
      }}>
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
