import React from 'react'


export function defaultHeaderCellRenderer({
  Header,
  width,
  align,
  headerCellProps,
  headerComponentProps,
  onClickHeader,
  onClickSortable,
  sortable,
  id
}) {
  return (
    <div
      className={'AwesomeTable__header-row-cell'}
      style={{ width, justifyContent: align || 'center' }}
      onClick={() => {
        onClickHeader && onClickHeader()
        sortable && onClickSortable({ sortBy: id })
      }}
      {...headerCellProps}
    >
      {typeof Header === 'function' ? (
        <Header {...headerComponentProps}/>
      ) : (
        <span>{Header}</span>
      )}
    </div>
  )
}
