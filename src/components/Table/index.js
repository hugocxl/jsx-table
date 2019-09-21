'use strict'

import React from 'react'
import { defaultTableBodyRenderer, defaultTableHeaderRenderer, defaultNoDataRenderer } from './renderers'


export function Table({
  columns, data, style, defaultSorted, disabled,
  tableHeaderRenderer, headerCellRenderer, headerHeight, headerRowRenderer, disableHeader, headerRowProps, headerCellProps, headerComponentProps,
  tableBodyRenderer, rowRenderer, cellRenderer, rowHeight, rowProps, cellProps, cellComponentProps, onRowClick, onCellClick,
  noDataRenderer, noDataComponent, noDataMessage,
  loading, loadingRenderer, loadingComponent,
  ...rest
}) {

  const tableBodyHeight = !disableHeader ? `calc(100% - ${headerHeight}px)` : '100%'
  // const [sortedData, setSortedData] = React.useState(data)
  // const [sortBy, setSortBy] = React.useState(defaultSorted ? defaultSorted.id : null)
  // const [sortDirection, setSortDirection] = React.useState(defaultSorted ? defaultSorted.desc ? SortDirection.DESC : SortDirection.ASC : null)
  //
  //
  // function sort({ sortBy, sortDirection }) {
  //   const sortedList = sortList({ sortBy, sortDirection })
  //
  //   setSortBy(sortBy)
  //   setSortDirection(sortDirection)
  //   setSortedList(sortedList)
  // }
  //
  // function sortList({ sortBy, sortDirection }) {
  //   const orderedTable = _.sortBy(data, function(o) {
  //     return o[sortBy]
  //   })
  //
  //   if (sortDirection === SortDirection.ASC) {
  //     return orderedTable
  //   } else {
  //     return orderedTable.reverse()
  //   }
  // }

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
        headerCellRenderer
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
