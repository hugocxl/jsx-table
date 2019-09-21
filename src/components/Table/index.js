'use strict'

import React from 'react'
import { defaultTableBodyRenderer, defaultTableHeaderRenderer, defaultNoDataRenderer } from './renderers'


export function Table({
  columns, data, style, defaultSorted, disabled,
  tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps,
  tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
  noDataRenderer, noDataComponent, noDataMessage, noDataProps, noDataComponentProps,
  loading, loadingRenderer, loadingComponent,
  onClickSortable, onClickHeader,
  ...rest
}) {

  const tableBodyHeight = !disableHeader ? `calc(100% - ${headerHeight}px)` : '100%'

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
        onClickHeader,
        onClickSortable
      })}
      {renderTableBody({
        disableHeader,
        headerHeight,
        data: data,
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

    </div>
  )
}

Table.defaultProps = {
  rowHeight: 30,
  headerHeight: 30,
  disableHeader: false,
  columns: null,
  data: null
}
