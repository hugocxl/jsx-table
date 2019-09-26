import React from 'react'


export const withPagination = Table => ({
  pageSize,
  data,
  onPageChange,
  defaultPage,
  rowHeight,
  disableHeader,
  footer,
  footerHeight,
  headerHeight,
  paginationHeight,
  height,
  ...rest
}) => {

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

  function onPreviousPageClick() {
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

  function getTableHeight() {
    let calculatedHeight = (currentPageData.length * rowHeight) + paginationHeight + 1

    if (footer) {
      calculatedHeight += footerHeight
    }

    if (!disableHeader) {
      calculatedHeight += headerHeight
    }

    if (calculatedHeight > height) {
      return height
    }

    return calculatedHeight
  }

  return (
    <Table
      height={getTableHeight()}
      pageSize={pageSize}
      disableHeader={disableHeader}
      footer={footer}
      footerHeight={footerHeight}
      headerHeight={headerHeight}
      paginationHeight={paginationHeight}
      pagination={true}
      rowHeight={rowHeight}
      onNextPageClick={onNextPageClick}
      onPreviousPageClick={onPreviousPageClick}
      currentPage={currentPage + 1}
      changePageTo={setCurrentPage}
      data={currentPageData}
      {...rest}
    />
  )
}
