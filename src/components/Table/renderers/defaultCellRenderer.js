import React from 'react'


export function defaultCellRenderer({
  onCellClick,
  cellIndex,
  cellData,
  rowData,
  Cell,
  width,
  align,
  rowIndex,
  cellProps,
  cellComponentProps
}) {
  return (
    <div
      className={'AwesomeTable__body-cell'}
      onClick={() => onCellClick && onCellClick({
        cellData,
        cellIndex,
        rowData,
        rowIndex,
        cellProps,
        cellComponentProps
      })}
      {...cellProps}
      style={{
        width,
        justifyContent: align || 'center',
        ...cellProps && cellProps.style
      }}>
      {Cell ? (
        <Cell cellData={cellData} rowData={rowData} cellComponentProps={cellComponentProps} rowIndex={rowIndex}/>
      ) : (
        <span className={'AwesomeTable__body-cell-text'}>{cellData}</span>
      )}
    </div>
  )
}
