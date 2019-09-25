export function calculateBodyHeight({
  height,
  disableHeader,
  pagination,
  footer,
  headerHeight,
  paginationHeight
}) {
  let calculatedHeight = `${height}px`
  if (!disableHeader) {
    calculatedHeight += ` - ${headerHeight}px`
  }

  if (pagination) {
    calculatedHeight += ` - ${paginationHeight}px`
  }

  return `calc(${calculatedHeight})`
}
