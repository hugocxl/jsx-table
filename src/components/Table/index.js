'use strict'

import React from 'react'
import memoize from 'memoize-one'
import cx from 'classnames'
import { utils } from '../../utils'
import {
  defaultTableBodyRenderer,
  defaultTableHeaderRenderer,
  defaultNoDataRenderer,
  defaultTablePaginationRenderer
} from './renderers'


export const Table = (
  {
    className, headerClassName, rowClassName,
    id, children, columns, data, style, width, height, defaultSorted, disabled, overscanRowCount,
    tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps, onHeaderClick,
    tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
    noDataRenderer, noDataComponent, noDataMessage, noDataProps, noDataComponentProps,
    loading, loadingRenderer, loadingComponent,
    onSortableClick, sortDirection, sortBy,
    changePageTo, tablePaginationRenderer, paginationComponent, pagination, paginationProps, paginationHeight, onNextPageClick, onPreviousPageClick, currentPage,
    virtualized,
    ...rest
  }) => {
  const tableBodyHeight = getBodyHeight()
  const getColumns = memoize((columns, children) => {
    return columns || utils.normalizeColumns(children)
  })
  const tableColumns = getColumns(columns, children)

  function getBodyHeight() {
    let height = '100%'
    if (!disableHeader) {
      height += ` - ${headerHeight}px`
    }

    if (pagination) {
      height += ` - ${paginationHeight}px`
    }

    return `calc(${height})`
  }

  function renderTableHeader(props) {
    if (disableHeader) {
      return null
    } else {
      return tableHeaderRenderer
        ? tableHeaderRenderer(props)
        : defaultTableHeaderRenderer(props)
    }
  }

  function renderTableBody(props) {
    if (!data || (data.length === 0 && !loading)) {
      return renderNoData({
        noDataComponent,
        noDataMessage,
        noDataProps,
        noDataComponentProps,
        tableBodyHeight
      })
    } else {
      return tableBodyRenderer
        ? tableBodyRenderer(props)
        : defaultTableBodyRenderer(props)
    }
  }

  function renderTableFooter() {

  }

  function renderTablePagination(props) {
    return tablePaginationRenderer
      ? tablePaginationRenderer(props)
      : defaultTablePaginationRenderer(props)
  }

  function renderNoData(props) {
    return noDataRenderer
      ? noDataRenderer(props)
      : defaultNoDataRenderer(props)
  }

  return (
    <div
      id={id}
      role={'table'}
      className={cx('AwesomeTable', className)}
      style={{
        height,
        width,
        ...style
      }}>
      {renderTableHeader({
        headerClassName,
        columns: tableColumns,
        headerRowProps,
        headerCellProps,
        disableHeader,
        headerHeight,
        headerComponentProps,
        headerRowRenderer,
        headerCellRenderer,
        onHeaderClick,
        onSortableClick,
        sortDirection,
        sortBy
      })}
      {renderTableBody({
        rowClassName,
        data,
        rowHeight,
        columns: tableColumns,
        rowProps,
        cellProps,
        cellComponentProps,
        loading,
        loadingComponent,
        loadingRenderer,
        rowRenderer,
        cellRenderer,
        onRowClick,
        onCellClick,
        tableBodyHeight,
        virtualized,
        overscanRowCount
      })}
      {renderTablePagination({
        changePageTo,
        pagination,
        paginationHeight,
        onNextPageClick,
        onPreviousPageClick,
        currentPage,
        paginationComponent,
        paginationProps
      })}

    </div>
  )
}

Table.defaultProps = {
  overscanRowCount: 10,
  rowHeight: 25,
  height: '100%',
  width: '100%',
  headerHeight: 30,
  paginationHeight: 20,
  disableHeader: false,
  columns: null,
  data: null
}
