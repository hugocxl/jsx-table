import React from 'react'
import { defaultCellRenderer } from './defaultCellRenderer'
import { utils } from '../../../utils'
import cx from 'classnames'


export const defaultRowRenderer = ({
  onRowClick,
  cellRenderer,
  rowData,
  rowIndex,
  rowHeight,
  columns,
  rowProps,
  bodyScrollTop,
  bodyHeight,
  ...rest
}) => {

  function isRowVisible() {
    const rowPosition = rowIndex * rowHeight

    if (bodyHeight && bodyScrollTop) {
      return (rowPosition > bodyScrollTop - 400) && (rowPosition < (bodyScrollTop + bodyHeight) + 400)
    } else {
      return true
    }
  }

  return (
    <div
      className={cx('AwesomeTable__body-row', { selected: rowData.selected })}
      {...rowProps}
      onClick={() => onRowClick && onRowClick({ rowData, rowIndex, rowProps })}
      style={{
        height: rowHeight,
        ...rowProps && rowProps.style
      }}>

      {columns.map((column, cellIndex) => {
        const cellProps = {
          cellIndex,
          cellData: rowData[column.id],
          Cell: column.Cell,
          rowData,
          align: column.align,
          rowIndex,
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
