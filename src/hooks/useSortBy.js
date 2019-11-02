import React, { useState } from 'react'
import { SortDirection } from '../constants/SortDirection'
import { utils } from '../utils'


export function useSortBy({
  data,
  sortMethod,
  defaultSorted,
  onColumnSort,
}) {

  const [state, setState] = useState(() => ({
    sortBy: defaultSorted
      ? defaultSorted.id
      : null,
    sortDirection: defaultSorted
      ? defaultSorted.direction
      : SortDirection.DESC,
    sortedData: defaultSorted
      ? defaultSortData({ sortBy: defaultSorted.id })
      : data
  }))

  function defaultSortData({ sortBy }) {
    const sortedData = utils.defaultSortByKey(data, sortBy)

    return defaultSorted.direction === SortDirection.ASC
      ? sortedData
      : sortedData.reverse()
  }

  function customTableSort({ sortBy }) {
    return state.sortedData.sort((a, b) => {
      return sortMethod({
        a,
        b,
        sortBy,
        sortDirection: state.sortDirection
      })
    })
  }

  function customColumnSort({ columnSortMethod, sortBy }) {
    return state.sortedData.sort((a, b) => {
      return columnSortMethod({
        a,
        b,
        sortBy,
        sortDirection: state.sortDirection
      })
    })
  }

  function onSortableClick({ event, sortBy, columnSortMethod }) {
    // In case a custom sortMethod is provided order by it
    const nextSortedData = columnSortMethod
      ? customColumnSort({ columnSortMethod, sortBy })
      : sortMethod
        ? customTableSort({ sortBy })
        : defaultSortData({ sortBy })

    const nextSortDirection = state.sortDirection === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC

    setState({
      sortBy,
      sortDirection: nextSortDirection,
      sortedData: nextSortedData
    })

    // Callback
    onColumnSort && onColumnSort({
      data: nextSortedData,
      sortDirection: nextSortDirection,
      sortBy,
      event
    })
  }

  return {
    ...state,
    data: state.sortedData,
    onSortableClick
  }
}
