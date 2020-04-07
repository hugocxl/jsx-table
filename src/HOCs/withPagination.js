import React, { useState, useMemo } from 'react'

export function withPagination (Component) {
  return function ({
    data,
    defaultPage,
    pageSize,
    onPageChange,
    ...rest
  }) {
    const [activePage, setActivePage] = useState(defaultPage || 0)

    const maxPage = Math.round(data.length / pageSize)

    const activePageData = useMemo(() => {
      return data.slice(activePage * pageSize, (activePage + 1) * pageSize)
    }, [data, activePage])

    function onPageUp () {
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

    function onPageDown () {
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

    return (
      <Component
        data={activePageData}
        activePage={activePage}
        onPageUp={onPageUp}
        onPageDown={onPageDown}
        pageSize={pageSize}
        {...rest}
      />
    )
  }
}
