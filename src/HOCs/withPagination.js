import React from 'react'


export const withPagination = Table => function({
  pageSize,
  data,
  onPageChange,
  defaultPage,
  ...rest
}) {

  const [currentPage, setCurrentPage] = React.useState(defaultPage || 0)
  const maxPages = Math.round(data.length / pageSize)
  const currentPageData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  function onNextPageClick() {
    if (currentPage < maxPages - 1) {
      onPageChange && onPageChange({
        pageSize,
        defaultPage,
        currentPage,
        maxPages,
        currentPageData
      })
      return setCurrentPage(currentPage + 1)
    }
  }

  function onPreviousPageClhick() {
    if (currentPage >= 1) {
      onPageChange && onPageChange({
        pageSize,
        defaultPage,
        currentPage,
        maxPages,
        currentPageData
      })
      return setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Table
      onNextPageClick={onNextPageClick}
      onPreviousPageClick={onPreviousPageClick}
      currentPage={currentPage + 1}
      data={currentPageData}
      {...rest}
    />
  )
}
