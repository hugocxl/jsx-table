'use strict'

import React from 'react'
import {
  defaultTableBodyRenderer,
  defaultTableHeaderRenderer,
  defaultNoDataRenderer,
  defaultTablePaginationRenderer
} from './renderers'


export const Table = ({
  columns, data, style, width, height, defaultSorted, disabled,
  tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps,
  tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
  noDataRenderer, noDataComponent, noDataMessage, noDataProps, noDataComponentProps,
  loading, loadingRenderer, loadingComponent,
  onSortableClick, sortDirection, sortBy,
  onHeaderClick,
  changePageTo, tablePaginationRenderer, paginationComponent, pagination, paginationProps, paginationHeight, onNextPageClick, onPreviousPageClick, currentPage,
  virtualized,
  ...rest
}) => {

  const tableBodyHeight = getBodyHeight()

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
      role={'table'}
      className={'AwesomeTable'}
      style={{
        height,
        width,
        ...style
      }}>
      {renderTableHeader({
        columns,
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
        data,
        rowHeight,
        columns,
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
        virtualized
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
  rowHeight: 25,
  height: '100%',
  width: '100%',
  headerHeight: 30,
  paginationHeight: 20,
  disableHeader: false,
  columns: null,
  data: null
}
