import React from 'react'


export function defaultHeaderCellRenderer({ Header, width, align, headerCellProps, headerComponentProps }) {
  return (
    <div
      style={{
        width,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: typeof Header === 'function' ? 0 : '0px 10px',
        justifyContent: align || 'center'
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
