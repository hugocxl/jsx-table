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
  stickyColumns,
  visibleRow,
  sticky,
  stickyRowIndex,
  ...rest
}) => {

  // TODO: styles can be a function (rowStyle)

  return (
    <div
      {...rowProps}
      key={`${top}${rowIndex}${JSON.stringify(rowData)}${sticky}${stickyRowIndex}`}
      className={cx(
        'AwesomeTable__body-row',
        rowIndex % 2 === 0 ? 'even' : 'odd',
        { sticky, rowClassName }
      )}
      style={{
        ...rowProps && rowProps.style,
        width: rowWidth,
        gridTemplateColumns: computedRowGrid,
        height: rowHeight,
        top
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
          sticky: stickyColumns && cellIndex < stickyColumns,
          stickyColumns,
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
