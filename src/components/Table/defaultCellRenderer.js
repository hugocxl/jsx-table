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
  sticky,
  minColumnWidth,
  rowHeight,
  width,
  previousColumnWidth,
  stickyColumns,
  cellClassName,
  ...rest
}) {

  return (
    <div
      {...cellProps}
      key={rowIndex + cellIndex}
      className={cx(
        'jsx-table__body-row-cell', {
          sticky,
          last: stickyColumns === cellIndex + 1,
          cellClassName
        })}
      style={{
        ...cellProps && cellProps.style,
        ...sticky && {
          left: cellIndex * (previousColumnWidth || minColumnWidth)
        },
        ...align && {
          justifyContent: align
        }
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
        <span className={'jsx-table__body-row-cell-text'}>
          {cellData}
        </span>
      )}
    </div>
  )
}
