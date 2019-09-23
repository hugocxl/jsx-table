'use strict'

import React from 'react'
import { defaultTableBodyRenderer, defaultTableHeaderRenderer, defaultNoDataRenderer } from './renderers'

import { Pagination } from '../Pagination'


export const Table = ({
  columns, data, style, defaultSorted, disabled,
  tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps,
  tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
  noDataRenderer, noDataComponent, noDataMessage, noDataProps, noDataComponentProps,
  loading, loadingRenderer, loadingComponent,
  onSortableClick, onHeaderClick,
  onNextPageClick, onPreviousPageClick, currentPage,
  ...rest
}) => {

  const tableBodyHeight = !disableHeader ? `calc(100% - ${headerHeight}px - 20px)` : '100%'

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

  function renderNoData(props) {
    return noDataRenderer
      ? noDataRenderer(props)
      : defaultNoDataRenderer(props)
  }

  return (
    <div
      role={'table'}
      className={'AwesomeTable'}
      style={{ ...style }}>
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
        onSortableClick
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
        tableBodyHeight
      })}
      {/*<Pagination*/}
      {/*  onNextPageClick={onNextPageClick}*/}
      {/*  onPreviousPageClick={onPreviousPageClick}*/}
      {/*  currentPage={currentPage}*/}
      {/*/>*/}

    </div>
  )
}

Table.defaultProps = {
  rowHeight: 25,
  headerHeight: 30,
  disableHeader: false,
  columns: null,
  data: null
}
