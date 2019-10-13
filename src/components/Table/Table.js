'use strict'

import React from 'react'
import memoize from 'memoize-one'
import cx from 'classnames'
import { utils } from '../../utils'
import { defaultTableBodyRenderer } from './defaultTableBodyRenderer'
import { defaultTableHeaderRenderer } from './defaultTableHeaderRenderer'
import { defaultNoDataRenderer } from './defaultNoDataRenderer'
import { defaultTablePaginationRenderer } from './defaultTablePaginationRenderer'
import { withPagination } from './withPagination'
import { withSortBy } from './withSortBy'


const TableComponent = React.forwardRef((
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
    ...rest
  }, ref) => {

  const columnsData = columns || utils.normalizeColumns(children)
  const rowsData = getRowsData()
  const { computedRowGrid, rowWidth } = utils.computeRowGrid({ width, columns: columnsData })
  const tableBodyHeight = utils.calculateBodyHeight({
    height,
    rowHeight,
    headerHeight,
    disableHeader,
    pagination,
    paginationHeight,
    pageSize,
  })

  function getRowsData() {
    return data
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
      ref={ref}
      id={id}
      role={'table'}
      className={cx('AwesomeTable', className)}
      style={{
        height,
        width,
        ...style
      }}>
      {renderTableHeader({
        headerRowRenderer,
        headerCellRenderer,
        columns: columnsData,
        computedRowGrid,
        rowWidth,
        headerClassName,
        headerRowProps,
        headerCellProps,
        headerComponentProps,
        disableHeader,
        headerHeight,
        onHeaderClick,
        onSortableClick,
        sortDirection,
        sortBy
      })}
      {renderTableBody({
        rowRenderer,
        cellRenderer,
        loadingRenderer,
        data: rowsData,
        columns: columnsData,
        computedRowGrid,
        height,
        width,
        rowHeight,
        rowClassName,
        rowWidth,
        rowProps,
        cellProps,
        cellComponentProps,
        loading,
        loadingComponent,
        onRowClick,
        onCellClick,
        tableBodyHeight,
        virtualized,
        overscanRowCount
      })}
      {/*{renderTablePagination({*/}
      {/*  changePageTo,*/}
      {/*  pagination,*/}
      {/*  paginationHeight,*/}
      {/*  onNextPageClick,*/}
      {/*  onPreviousPageClick,*/}
      {/*  currentPage,*/}
      {/*  paginationComponent,*/}
      {/*  paginationProps*/}
      {/*})}*/}

    </div>
  )
})

export const Table = withSortBy(TableComponent)

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
