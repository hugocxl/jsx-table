export function calculateColumnWidth({ width, columns }) {
  if (!width) {
    return width
  } else {
    let unknownColumnsWidth = 0

    const columnsWidth = columns.map(column => {

      if (!column.width) {
        unknownColumnsWidth++
      } else {
        return typeof column.width === 'number' ? `${column.width}px` : column.width
      }
    })

    if (unknownColumnsWidth === columns.length) {
      return `${100 / columns.length}%`
    }


    if (unknownColumnsWidth !== 0) {
      const calculatedWidth = columnsWidth.filter(el => el)
      const mixWidths = calculatedWidth.join(' - ')

      return `calc((100% - ${mixWidths})/${unknownColumnsWidth})`
    } else {
      return `calc(100%/${unknownColumnsWidth})`
    }
  }
}
