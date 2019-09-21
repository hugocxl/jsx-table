import React from 'react'
import { utils } from '../../../utils'
import { defaultHeaderCellRenderer } from './defaultHeaderCellRenderer'


export function defaultHeaderRowRenderer({
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
          Header: column.Header,
          width: utils.calculateColumnWidth({ width: column.width, columns }),
          headerIndex,
          align: column.align,
          id: column.id,
          sortable: column.sortable,
          ...rest
        }

        return headerCellRenderer
          ? headerCellRenderer(rowProps)
          : defaultHeaderCellRenderer(rowProps)
      })}
    </div>
  )
}
