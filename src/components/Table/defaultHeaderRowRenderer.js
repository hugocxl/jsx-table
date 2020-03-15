'use strict'

import React from 'react'
import { defaultHeaderCellRenderer } from './defaultHeaderCellRenderer'
import cx from 'classnames'

export function defaultHeaderRowRenderer ({
  headerClassName,
  columns,
  headerCellRenderer,
  headerHeight,
  headerRowProps,
  computedRowGrid,
  rowWidth,
  freezeColumns,
  ...rest
}) {

  return (
    <div
      {...headerRowProps}
      style={{
        height: '100%',
        gridTemplateColumns: computedRowGrid,
        display: 'grid',
        width: rowWidth,
      }}
      className={cx(
        'AwesomeTable__header-row',
        headerClassName
      )}
    >
      {columns.map((column, headerIndex) => {
        const cellProps = {
          columns,
          freezeColumns,
          previousColumnWidth: columns[(headerIndex || 1) - 1].width,
          frozen: freezeColumns && headerIndex < freezeColumns,
          headerIndex,
          ...column,
          ...rest
        }
        return headerCellRenderer
          ? headerCellRenderer(cellProps)
          : defaultHeaderCellRenderer(cellProps)
      })}
    </div>
  )
}
