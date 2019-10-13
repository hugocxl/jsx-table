import React from 'react'
import { defaultCellRenderer } from './defaultCellRenderer'
import { utils } from '../../utils'
import cx from 'classnames'


export const defaultRowRenderer = (
  {
    rowClassName,
    onRowClick,
    cellRenderer,
    rowData,
    rowIndex,
    rowHeight,
    columns,
    rowProps,
    top,
    ...rest
  }) => {

  // TODO: styles can be a function

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
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: utils.calculateColumnWidth({
            width: column.width,
            columns
          }),
          ...rest
        }

        return cellRenderer
          ? cellRenderer(cellProps)
          : defaultCellRenderer(cellProps)
      })}
    </div>
  )
}
