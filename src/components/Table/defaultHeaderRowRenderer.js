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
  stickyColumns,
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
        'jsx-table__header-row',
        headerClassName
      )}
    >
      {columns.map((column, headerIndex) => {
        const cellProps = {
          columns,
          stickyColumns,
          previousColumnWidth: columns[(headerIndex || 1) - 1].width,
          sticky: stickyColumns && headerIndex < stickyColumns,
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
