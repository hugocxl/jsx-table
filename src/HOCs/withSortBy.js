import React, { useState } from 'react'
import { SortDirection } from '../constants/SortDirection'
import { utils } from '../utils'


export const withSortBy = Table => ({
  data,
  sort,
  defaultSorted,
  onColumnSort,
  ...rest
}) => {

  const [sortDirection, setSortDirection] = React.useState(defaultSorted ? defaultSorted.desc ? SortDirection.DESC : SortDirection.ASC : SortDirection.DESC)
  const [sortedData, setSortedData] = useState(defaultSorted ? sortData({ sortBy: defaultSorted.id }) : data)

  function sortData({ sortBy }) {
    const orderedTable = utils.defaultSortByKey(sortedData, sortBy)

    if (sortDirection === SortDirection.ASC) {
      return orderedTable
    } else {
      return orderedTable.reverse()
    }
  }

  function onClickSortable({ sortBy }) {
    const nextSortedData = sortData({ sortBy })
    const nextSortDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC

    setSortDirection(nextSortDirection)
    setSortedData(nextSortedData)

    // Callback
    onColumnSort && onColumnSort({
      data: nextSortedData,
      sortDirection: nextSortDirection,
      sortBy
    })
  }

  return (
    <Table data={sortedData} onClickSortable={onClickSortable} {...rest}/>
  )
}
