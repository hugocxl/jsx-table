'use strict'

import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { utils } from '../../utils'
import { defaultTableBodyRenderer } from './defaultTableBodyRenderer'
import { defaultTableHeaderRenderer } from './defaultTableHeaderRenderer'


export function Table(
  {
    className, headerClassName, rowClassName,
    id, children, columns, data, style, width, height, defaultSorted, disabled, overscanRowCount,
    tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps, onHeaderClick,
    tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
    noDataRenderer, noDataComponent, noDataMessage, noDataProps, noDataComponentProps,
    loading, loadingRenderer, loadingComponent,
    onSortableClick, sortDirection, sortBy,
    changePageTo, tablePaginationRenderer, paginationComponent, pagination, paginationProps, paginationHeight, pageSize, onNextPageClick, onPreviousPageClick, currentPage,
    virtualized,
    loadMoreRows, threshold,
    onScroll,
    ...rest
  }) {

  const ref = useRef()
  const [scroll, setScroll] = useState({
    scrollTop: 0,
    scrollLeft: 0
  })
  const columnsData = columns || utils.normalizeColumns(children)
  const { computedRowGrid, rowWidth } = utils.computeRowGrid({
    width,
    columns: columnsData
  })
  const tableBodyHeight = utils.calculateBodyHeight({
    height,
    rowHeight,
    headerHeight,
    disableHeader,
    pagination,
    paginationHeight,
    pageSize,
  })

  function renderTableHeader(props) {
    return tableHeaderRenderer
      ? tableHeaderRenderer(props)
      : defaultTableHeaderRenderer(props)
  }

  function renderTableBody(props) {
    return tableBodyRenderer
      ? tableBodyRenderer(props)
      : defaultTableBodyRenderer(props)
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
      {!disableHeader && renderTableHeader({
        headerClassName,
        columns: columnsData,
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
        sortBy,
        computedRowGrid,
        rowWidth,
        scroll
      })}
      {renderTableBody({
        rowClassName,
        data,
        rowHeight,
        height,
        columns: columnsData,
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
        overscanRowCount,
        loadMoreRows,
        threshold,
        computedRowGrid,
        rowWidth,
        setScroll,
      })}
    </div>
  )
}

Table.defaultProps = {
  virtualized: false,
  disabled: false,
  loading: false,
  overscanRowCount: 10,
  disableHeader: false,
  columns: null,
  data: null,
  paginationHeight: 20,
  rowHeight: 20,
  headerHeight: 20,
  footerHeight: 20,
  loadMoreRows: null,
  threshold: 10
}
