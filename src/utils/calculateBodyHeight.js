export function calculateBodyHeight({
  height,
  disableHeader,
  pagination,
  footer,
  footerHeight,
  headerHeight,
  paginationHeight,
  pageSize,
  rowHeight,
}) {
  let calculatedHeight = height

  if (!disableHeader) {
    calculatedHeight -= headerHeight
  }

  if (pagination) {
    calculatedHeight -= paginationHeight
  }

  if (footer) {
    calculatedHeight -= footerHeight
  }

  return calculatedHeight
}
