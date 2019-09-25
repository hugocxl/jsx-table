import React, { useState } from 'react'
import { SortDirection } from '../constants/SortDirection'
import { utils } from '../utils'


export const withSortBy = Table => ({
  data,
  sortMethod,
  defaultSorted,
  onColumnSort,
  ...rest
}) => {

  const [sortBy, setSortBy] = React.useState(defaultSorted ? defaultSorted.id : null)
  const [sortDirection, setSortDirection] = React.useState(defaultSorted ? defaultSorted.desc ? SortDirection.DESC : SortDirection.ASC : SortDirection.DESC)
  const [sortedData, setSortedData] = useState(defaultSorted ? defaultSortData({ sortBy: defaultSorted.id }) : data)

  // React.useEffect(() => {
  //   setSortedData(utils.defaultSortByKey(data, sortBy))
  // }, [data])

  function defaultSortData({ sortBy }) {
    const orderedTable = utils.defaultSortByKey(sortedData, sortBy)

    if (sortDirection === SortDirection.ASC) {
      return orderedTable
    } else {
      return orderedTable.reverse()
    }
  }

  function customTableSort({ sortBy }) {
    return sortedData.sort((a, b) => sortMethod({ a, b, sortBy, sortDirection }))
  }

  function customColumnSort({ columnSortMethod, sortBy }) {
    return sortedData.sort((a, b) => columnSortMethod({ a, b, sortBy, sortDirection }))
  }

  function onSortableClick({ sortBy, event, columnSortMethod }) {
    // In case a custom sortMethod is provided order by it
    const nextSortedData = columnSortMethod
      ? customColumnSort({ columnSortMethod, sortBy })
      : sortMethod
        ? customTableSort({ sortBy })
        : defaultSortData({ sortBy })

    const nextSortDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC

    setSortDirection(nextSortDirection)
    setSortedData(nextSortedData)
    setSortBy(sortBy)

    // Callback
    onColumnSort && onColumnSort({
      data: nextSortedData,
      sortDirection: nextSortDirection,
      sortBy,
      event
    })
  }

  return (
    <Table
      sortBy={sortBy}
      sortDirection={sortDirection}
      data={sortedData}
      onSortableClick={onSortableClick}
      {...rest}
    />
  )
}
