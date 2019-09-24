import React from 'react'
import { SortIndicator } from '../../SortIndicator'


export function defaultHeaderCellRenderer(
  {
    header,
    width,
    minWidth,
    maxWidth,
    align,
    headerCellProps,
    headerComponentProps,
    onHeaderClick,
    onSortableClick,
    sortable,
    dataKey,
    columnSortMethod,
    sortBy,
    sortDirection
  }) {

  return (
    <div
      className={'AwesomeTable__header-row-cell'}
      style={{ width, minWidth, maxWidth, justifyContent: align || 'center' }}
      onClick={event => {
        sortable && onSortableClick({ sortBy: dataKey, event, columnSortMethod })
        onHeaderClick && onHeaderClick({
          event,
          header,
          dataKey,
          headerCellProps,
          headerComponentProps,
        })
      }}
      {...headerCellProps}>
      {typeof header === 'function' ? (
        header(headerComponentProps)
      ) : (
        <div>{header}</div>
      )}
      {dataKey === sortBy && <SortIndicator sortDirection={sortDirection}/>}
    </div>
  )
}
