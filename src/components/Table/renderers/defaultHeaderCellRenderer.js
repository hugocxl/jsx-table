import React from 'react'


export function defaultHeaderCellRenderer({
  Header,
  width,
  align,
  headerCellProps,
  headerComponentProps
}) {
  return (
    <div
      className={'AwesomeTable__header-row-cell'}
      style={{ width, justifyContent: align || 'center' }}
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
