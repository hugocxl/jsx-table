import React from 'react'


export function defaultCellRenderer(
  {
    onCellClick,
    cellIndex,
    cellData,
    rowData,
    cell,
    width,
    minWidth,
    maxWidth,
    align,
    rowIndex,
    cellProps,
    cellComponentProps
  }) {
  return (
    <div
      key={cellIndex}
      className={'AwesomeTable__body-cell'}
      onClick={event => onCellClick && onCellClick({
        event,
        cellData,
        cellIndex,
        rowData,
        rowIndex,
        cellProps,
        cellComponentProps
      })}
      {...cellProps}
      style={{
        minWidth,
        maxWidth: maxWidth || width,
        width,
        justifyContent: align || 'center',
        ...cellProps && cellProps.style
      }}>
      {cell && typeof cell === 'function' ? (
        cell({ cellData, rowData, cellComponentProps, rowIndex, cellIndex })
      ) : (
        <div className={'AwesomeTable__body-cell-text'}>{cellData}</div>
      )}
    </div>
  )
}
