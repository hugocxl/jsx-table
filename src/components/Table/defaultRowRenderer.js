import React from 'react'
import { defaultCellRenderer } from './defaultCellRenderer'
import cx from 'classnames'

export const defaultRowRenderer = ({
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
  freezeColumns,
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
        rowClassName
      )}
      style={{
        ...rowProps && rowProps.style,
        display: 'grid',
        width: rowWidth,
        gridTemplateColumns: computedRowGrid,
        gridTemplateRows: `${rowHeight}px`,
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
          rowProps,
          columns
        })
      }}
    >

      {rowData && columns.map(({ dataKey, ...restOfColumn }, cellIndex) => {
        const cellProps = {
          rowHeight,
          frozen: freezeColumns && cellIndex < freezeColumns,
          cellIndex,
          cellData: rowData[dataKey],
          rowData,
          rowIndex,
          previousColumnWidth: columns[(cellIndex || 1) - 1].width,
          ...restOfColumn,
          ...rest
        }

        return cellRenderer
          ? cellRenderer(cellProps)
          : defaultCellRenderer(cellProps)
      })}
    </div>
  )
}
