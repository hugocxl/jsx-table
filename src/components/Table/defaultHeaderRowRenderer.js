import React from 'react'
import { defaultHeaderCellRenderer } from './defaultHeaderCellRenderer'
import cx from 'classnames'


export function defaultHeaderRowRenderer(
  {
    headerClassName,
    columns,
    headerCellRenderer,
    headerHeight,
    headerRowProps,
    computedRowGrid,
    rowWidth,
    ...rest
  }) {

  return (
    <div
      {...headerRowProps}
      style={{
        position: 'sticky',
        top: 0,
        height: headerHeight,
        gridTemplateColumns: computedRowGrid,
        display: 'grid',
        width: rowWidth,
        zIndex: 2
      }}
      className={cx(
        'AwesomeTable__header-row',
        headerClassName
      )}
    >
      {columns.map((column, headerIndex) => {
        const cellProps = {
          column,
          header: column.header,
          headerIndex,
          align: column.align,
          dataKey: column.dataKey,
          sortable: column.sortable,
          columnSortMethod: column.columnSortMethod,
          ...rest
        }
        return headerCellRenderer
          ? headerCellRenderer(cellProps)
          : defaultHeaderCellRenderer(cellProps)
      })}
    </div>
  )
}
