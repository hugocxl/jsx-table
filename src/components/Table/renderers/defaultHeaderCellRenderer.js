import React from 'react'
import { SortIndicator } from '../../SortIndicator'


export function defaultHeaderCellRenderer({
  Header,
  width,
  align,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,
  onSortableClick,
  sortable,
  id,
  columnSortMethod,
  sortBy,
  sortDirection
}) {
  return (
    <div
      className={'AwesomeTable__header-row-cell'}
      style={{ width, justifyContent: align || 'center' }}
      onClick={event => {
        sortable && onSortableClick({ sortBy: id, event, columnSortMethod })
        onHeaderClick && onHeaderClick({
          Header,
          id,
          headerCellProps,
          headerComponentProps,
          event
        })
      }}
      {...headerCellProps}>
      {typeof Header === 'function' ? (
        <Header {...headerComponentProps}/>
      ) : (
        <span>{Header}</span>
      )}
      {id === sortBy && <SortIndicator sortDirection={sortDirection}/>}
    </div>
  )
}
