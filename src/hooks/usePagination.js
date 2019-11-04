import React, { useState, useMemo } from 'react'


export function usePagination({
  data,
  defaultPage,
  pageSize,
  onPageChange
}) {

  const [activePage, setActivePage] = useState(defaultPage || 0)

  const maxPage = Math.round(data.length / pageSize)

  const activePageData = useMemo(() => {
    return data.slice(activePage * pageSize, (activePage + 1) * pageSize)
  }, [data, activePage])

  function onPageUp() {
    if (activePage < maxPage - 1) {
      onPageChange && onPageChange({
        pageSize,
        defaultPage,
        activePage,
        maxPage,
        activePageData
      })

      setActivePage(activePage + 1)
    }
  }

  function onPageDown() {
    if (activePage >= 1) {
      onPageChange && onPageChange({
        pageSize,
        defaultPage,
        activePage,
        maxPage,
        activePageData
      })

      setActivePage(activePage - 1)
    }
  }

  return {
    data: activePageData,
    activePage,
    onPageUp,
    onPageDown
  }
}
