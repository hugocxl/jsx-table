import React from 'react'


export const withPagination = Table => function({
  pageSize,
  data,
  ...rest
}) {

  const [currentPage, setCurrentPage] = React.useState(0)

  function onNextPageClick() {
    setCurrentPage(currentPage + 1)
  }

  function onPreviousPageClick() {
    setCurrentPage(currentPage - 1)
  }

  return (
    <Table
      onNextPageClick={onNextPageClick}
      onPreviousPageClick={onPreviousPageClick}
      currentPage={currentPage}
      data={data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)}
      {...rest}
    />
  )
}
