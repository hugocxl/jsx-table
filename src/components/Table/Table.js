'use strict'

import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import { utils } from '../../utils'
import { defaultTableRenderer } from './defaultTableRenderer'
import { defaultTableHeaderRenderer } from './defaultTableHeaderRenderer'
import { defaultNoDataRenderer } from './defaultNoDataRenderer'
import { defaultTablePaginationRenderer } from './defaultTablePaginationRenderer'
import { withPagination } from './withPagination'
import { withSortBy } from './withSortBy'
import { defaultRowRenderer } from './defaultRowRenderer'


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

  const _ref = ref || useRef()
  const [scrollTop, setScrollTop] = useState(null)
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

  useEffect(() => {
    if (virtualized) {
      setScrollTop(scroll => scroll + 1)
    }
  }, [height])

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

  function renderTableBody() {
    if (!data || (data.length === 0 && !loading)) {
      return renderNoData({
        noDataComponent,
        noDataMessage,
        noDataProps,
        noDataComponentProps,
        tableBodyHeight
      })
    } else {
      return (
        <div style={{ height: data && (data.length * rowHeight) }}>
          {virtualized ? (
            renderVirtualizedRows()
          ) : (
            renderRows()
          )}
        </div>
      )
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

  function renderRows() {
    return data.map((el, i) => {
      const rowProps = {
        rowData: el,
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        ...rest
      }

      return rowRenderer
        ? rowRenderer(rowProps)
        : defaultRowRenderer(rowProps)
    })
  }

  function renderVirtualizedRows() {
    if (!_ref.current) {
      return null
    }

    const { scrollTop, clientHeight } = _ref.current
    const rows = []

    const firstRowIndexCalc = Math.round(scrollTop / rowHeight) - overscanRowCount - 1
    const lastRowIndexCalc = Math.round((scrollTop + clientHeight) / rowHeight) + overscanRowCount + 1

    const firstRowIndex = firstRowIndexCalc > 0 ? firstRowIndexCalc : 0
    const lastRowIndex = lastRowIndexCalc < data.length ? lastRowIndexCalc : data.length

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const elProps = {
        columns: columnsData,
        rowData: data[i],
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        computedRowGrid,
        rowWidth,
        ...rest
      }
      rows.push(
        rowRenderer
          ? rowRenderer(elProps)
          : defaultRowRenderer(elProps)
      )
    }

    return rows
  }

  function onTableScroll() {
    const { scrollTop, clientHeight, scrollHeight } = _ref.current

    // onScroll && onScroll({
    //   scrollTop,
    //   clientHeight,
    //   scrollHeight
    // })

    setScrollTop(scrollTop)
  }

  return (
    <div
      ref={_ref}
      id={id}
      role={'table'}
      onScroll={onTableScroll}
      className={cx('AwesomeTable', className)}
      style={{
        height,
        width,
        ...style
      }}>
      {/*{renderTableHeader({*/}
      {/*  headerRowRenderer,*/}
      {/*  headerCellRenderer,*/}
      {/*  columns: columnsData,*/}
      {/*  computedRowGrid,*/}
      {/*  rowWidth,*/}
      {/*  headerClassName,*/}
      {/*  headerRowProps,*/}
      {/*  headerCellProps,*/}
      {/*  headerComponentProps,*/}
      {/*  disableHeader,*/}
      {/*  headerHeight,*/}
      {/*  onHeaderClick,*/}
      {/*  onSortableClick,*/}
      {/*  sortDirection,*/}
      {/*  sortBy*/}
      {/*})}*/}
 h
      {renderTableBody()}

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
