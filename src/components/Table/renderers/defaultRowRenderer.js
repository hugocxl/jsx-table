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

  return (
    <div
      className={cx('AwesomeTable__body-row'
        // { selected: rowData.selected }
      )}
      {...rowProps}
      onClick={() => onRowClick && onRowClick({ rowData, rowIndex, rowProps })}
      style={{
        position: 'absolute',
        left: 0,
        top: rowHeight * rowIndex,
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
