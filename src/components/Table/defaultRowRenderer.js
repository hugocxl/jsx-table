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
    bodyScrollTop,
    bodyHeight,
    top,
    parentIndex,
    ...rest
  }) => {

  return (
    <div
      key={`${rowIndex} ${top}`}
      className={cx('AwesomeTable__body-row', rowClassName, { selected: rowData && rowData.selected })}
      {...rowProps}
      onClick={event => onRowClick && onRowClick({ event, rowData, rowIndex, rowProps })}
      style={{
        ...rowProps && rowProps.style,
        position: 'absolute',
        left: 0,
        top,
        height: rowHeight,
      }}>

      {rowData && columns.map((column, cellIndex) => {
        const cellProps = {
          parentIndex,
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
