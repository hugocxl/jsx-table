import React from 'react'
import { SortIndicator } from '../SortIndicator'
import cx from 'classnames'

export function defaultHeaderCellRenderer ({
  header,
  align,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,
  onSortableClick,
  sortable,
  dataKey,
  columnSortMethod,
  sortBy,
  sortDirection,
  frozen,
  minColumnWidth,
  headerIndex,
  width,
  previousColumnWidth,
  ...rest
}) {

  function onClickHeader (event) {
    if (sortable && onSortableClick) {
      onSortableClick({
        sortBy: dataKey,
        event,
        columnSortMethod
      })
    }

    if (onHeaderClick) {
      onHeaderClick({
        event,
        header,
        dataKey,
        headerCellProps,
        headerComponentProps,
        ...rest
      })
    }
  }

  return (
    <div
      {...headerCellProps}
      className={cx('AwesomeTable__header-row-cell', { frozen })}
      onClick={onClickHeader}
      style={{
        ...frozen && {
          position: 'sticky',
          left: headerIndex * (previousColumnWidth || minColumnWidth),
          width: width || minColumnWidth
        },
        justifyContent: align || 'center',
        ...headerCellProps && headerCellProps.style
      }}
    >

      {typeof header === 'function' ? (
        header({
          ...headerComponentProps,
          header,
          align,
          headerCellProps,
          headerComponentProps,
          onHeaderClick,
          onSortableClick,
          sortable,
          dataKey,
          columnSortMethod,
          sortBy,
          sortDirection,
          frozen,
          minColumnWidth,
          headerIndex,
          width
        })
      ) : (
        <span className={'AwesomeTable__header-row-cell-text'}>{header}</span>
      )}

      {dataKey === sortBy && (
        <SortIndicator
          sortDirection={sortDirection}
        />
      )}

    </div>
  )
}
