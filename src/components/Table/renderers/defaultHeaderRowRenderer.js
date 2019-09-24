import React from 'react'
import { utils } from '../../../utils'
import { defaultHeaderCellRenderer } from './defaultHeaderCellRenderer'


export function defaultHeaderRowRenderer(
  {
    columns,
    headerCellRenderer,
    headerHeight,
    headerRowProps,
    ...rest
  }) {
  return (
    <div
      role={'table'}
      className={'AwesomeTable__header-row'}
      {...headerRowProps}>
      {columns.map((column, headerIndex) => {
        const rowProps = {
          column,
          header: column.header,
          width: utils.calculateColumnWidth({ width: column.width, columns }),
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
