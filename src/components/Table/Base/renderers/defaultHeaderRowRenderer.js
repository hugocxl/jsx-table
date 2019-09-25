import React from 'react'
import { utils } from '../../../../utils'
import { defaultHeaderCellRenderer } from './defaultHeaderCellRenderer'
import cx from 'classnames'


export function defaultHeaderRowRenderer(
  {
    headerClassName,
    columns,
    headerCellRenderer,
    headerHeight,
    headerRowProps,
    ...rest
  }) {
  return (
    <div
      role={'table'}
      className={cx('AwesomeTable__header-row', headerClassName)}
      {...headerRowProps}>
      {columns.map((column, headerIndex) => {
        const rowProps = {
          column,
          header: column.header,
          width: utils.calculateColumnWidth({ width: column.width, columns }),
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          headerIndex,
          align: column.align,
          dataKey: column.dataKey,
          sortable: column.sortable,
          columnSortMethod: column.columnSortMethod,
          ...rest
        }

        return headerCellRenderer
          ? headerCellRenderer(rowProps)
          : defaultHeaderCellRenderer(rowProps)
      })}
    </div>
  )
}
