export function calculateBodyHeight ({
  height,
  disableHeader,
  pagination,
  footer,
  headerHeight,
  footerHeight,
  paginationHeight,
  rowHeight,
  rows
}) {
  // let calculatedHeight = `${height}`
  let calculatedHeight = `${height}px`
  if (!disableHeader) {
    calculatedHeight += ` - ${headerHeight}px`
  }

  if (pagination) {
    calculatedHeight += ` - ${paginationHeight}px`
  }

  if (footer) {
    calculatedHeight += ` - ${footerHeight}px`
  }

  return `calc(${calculatedHeight})`
}
