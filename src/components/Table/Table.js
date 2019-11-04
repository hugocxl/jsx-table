'use strict'

import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import { utils } from '../../utils'
import { defaultNoDataRenderer } from './defaultNoDataRenderer'
import { withSortBy } from './withSortBy'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'


const TableComponent = (
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
  }) => {

  const ref = useRef()
  const [scrollTop, setScrollTop] = useState(null)
  const columnsData = columns || utils.normalizeColumns(children)
  const rowsData = rowsGetter()
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

  function rowsGetter() {
    return data
  }

  function tableRenderer() {
    return (
      <React.Fragment>
        {headerRenderer()}
        {bodyRenderer()}
      </React.Fragment>
    )
  }

  function headerRenderer() {
    const props = {
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
    }

    if (disableHeader) {
      return null
    } else {
      return headerRowRenderer
        ? headerRowRenderer(props)
        : defaultHeaderRowRenderer(props)
    }
  }

  function bodyRenderer() {
    if (!data || (data.length === 0 && !loading)) {
      return renderNoData({
        noDataComponent,
        noDataMessage,
        noDataProps,
        noDataComponentProps,
        tableBodyHeight
      })
    }

    return (
      <div
        style={{
          height: data && (data.length * rowHeight),
          position: 'relative',
        }}>
        {virtualized
          ? virtualizedRowsRenderer()
          : rowsRenderer()})
      </div>
    )
  }

  function rowsRenderer() {
    return rowsData.map((el, i) => {
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

  function virtualizedRowsRenderer() {
    if (!ref.current) {
      return null
    }

    const { scrollTop, clientHeight } = ref.current
    const rows = []

    const firstRowIndexCalc = Math.round(scrollTop / rowHeight) - overscanRowCount - 1
    const lastRowIndexCalc = Math.round((scrollTop + clientHeight) / rowHeight) + overscanRowCount

    const firstRowIndex = firstRowIndexCalc > 0 ? firstRowIndexCalc : 0
    const lastRowIndex = lastRowIndexCalc < data.length ? lastRowIndexCalc : data.length

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const elProps = {
        columns: columnsData,
        rowData: rowsData[i],
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

  function renderNoData(props) {
    return noDataRenderer
      ? noDataRenderer(props)
      : defaultNoDataRenderer(props)
  }

  function onTableScroll(event) {
    const { scrollTop, clientHeight, scrollHeight } = ref.current

    onScroll && onScroll({
      event,
      scrollTop,
      clientHeight,
      scrollHeight
    })

    setScrollTop(scrollTop)
  }

  return (
    <div
      ref={ref}
      id={id}
      role={'table'}
      onScroll={ev => onTableScroll(ev)}
      className={cx('AwesomeTable', className)}
      style={{
        height,
        width,
        ...style
      }}>
      {tableRenderer()}
    </div>
  )
}

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
