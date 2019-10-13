import React from 'react'
import { defaultCellRenderer } from './defaultCellRenderer'
import cx from 'classnames'


export const defaultRowRenderer = (
  {
    rowClassName,
    onRowClick,
    cellRenderer,
    rowData,
    rowIndex,
    rowHeight,
    rowWidth,
    columns,
    rowProps,
    top,
    computedRowGrid,
    ...rest
  }) => {

  // TODO: styles can be a function (rowStyle)

  return (
    <div
      {...rowProps}
      key={rowIndex}
      className={cx(
        'AwesomeTable__body-row',
        rowIndex % 2 === 0 ? 'even' : 'odd',
        rowClassName,
      )}
      style={{
        ...rowProps && rowProps.style,
        display: 'grid',
        width: rowWidth,
        gridTemplateColumns: computedRowGrid,
        height: rowHeight,
        position: 'absolute',
        left: 0,
        top,
      }}
      onClick={event => {
        onRowClick && onRowClick({
          event,
          rowData,
          rowIndex,
          rowProps
        })
      }}
    >

      {rowData && columns.map((column, cellIndex) => {
        const cellProps = {
          cellIndex,
          cellData: rowData[column.dataKey],
          cell: column.cell,
          rowData,
          align: column.align,
          rowIndex,
          ...rest
        }

        return cellRenderer
          ? cellRenderer(cellProps)
          : defaultCellRenderer(cellProps)
      })}
    </div>
  )
}
