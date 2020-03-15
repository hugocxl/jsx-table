import React from 'react'

import cx from 'classnames'

export function defaultCellRenderer ({
  onCellClick,
  cellIndex,
  cellData,
  rowData,
  cell,
  align,
  rowIndex,
  cellProps,
  cellComponentProps,
  parentIndex,
  id,
  frozen,
  minColumnWidth,
  rowHeight,
  width,
  previousColumnWidth,
  ...rest
}) {

  // TODO: cellClassname && cellStyle + WRONG ALIGN (FLEX)

  return (
    <div
      {...cellProps}
      key={cellIndex}
      className={cx('AwesomeTable__body-row-cell', { frozen })}
      style={{
        ...frozen && {
          position: 'sticky',
          left: cellIndex * (previousColumnWidth || minColumnWidth),
          width: width || minColumnWidth,
        },
        justifyContent: align || 'center',
        ...cellProps && cellProps.style
      }}
      onClick={event => {
        onCellClick && onCellClick({
          event,
          cellData,
          cellIndex,
          rowData,
          rowIndex,
          cellProps,
          cellComponentProps
        })
      }}
    >
      {cell && typeof cell === 'function' ? (
        cell({
          cellData,
          rowData,
          cellComponentProps,
          rowIndex,
          cellIndex,
          parentIndex,
          id
        })
      ) : (
        <span className={'AwesomeTable__body-row-cell-text'}>
          {cellData}
        </span>
      )}
    </div>
  )
}
