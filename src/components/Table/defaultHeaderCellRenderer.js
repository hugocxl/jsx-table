import React from 'react'
import { SortIndicator } from '../SortIndicator'


export function defaultHeaderCellRenderer({
  header,
  align,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,
  onSortableClick,
  sortable,
  dataKey,
  columnSortMethod,
  sortBy,
  sortDirection,
  freezed,
  minColumnWidth,
  headerIndex
}) {

  function onClickHeader(event) {
    if (sortable && onSortableClick) {
      onSortableClick({
        sortBy: dataKey,
        event,
        columnSortMethod
      })
    }

    if (onHeaderClick) {
      onHeaderClick({
        event,
        header,
        dataKey,
        headerCellProps,
        headerComponentProps,
      })
    }
  }

  return (
    <div
      {...headerCellProps}
      className={'AwesomeTable__header-row-cell'}
      onClick={onClickHeader}
      style={{
        ...freezed && {
          position: 'sticky',
          left: headerIndex * minColumnWidth,
          width: minColumnWidth
        },
        justifyContent: align || 'center',
        ...headerCellProps && headerCellProps.style
      }}
    >

      {typeof header === 'function' ? (
        header(headerComponentProps)
      ) : (
        <span>{header}</span>
      )}

      {dataKey === sortBy && (
        <SortIndicator
          sortDirection={sortDirection}
        />
      )}

    </div>
  )
}
