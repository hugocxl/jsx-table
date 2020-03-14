const MIN_ROW_WIDTH = 50

export function computeRowGrid({ columns, width, minColumnWidth }) {
  const isTableOverWidth = isOverWindowWidth({ columns, width })
  let output = ''

  columns.forEach(column => {
    if (!column.width) {
      if (!isTableOverWidth) {
        output += output.length > 0 ? ' minmax(50px, 1fr)' : 'minmax(50px, 1fr)'
      } else {
        output += output.length > 0 ? ' 100px' : '100px'
        output += output.length > 0 ? ` ${minColumnWidth}` : `${minColumnWidth}`
      }
    } else {
      if (typeof column.width === 'number') {
        output += output.length > 0 ? ` ${column.width}px` : `${column.width}px`
      } else {
        output += output.length > 0 ? ` ${column.width}` : `${column.width}`
      }
    }
  })

  return {
    computedRowGrid: output,
    rowWidth: isTableOverWidth ? 'fit-content' : '100%'
  }
}

function isOverWindowWidth({ columns, width }) {
  let value = 0
  columns.map(col => {
    if (col.width && typeof col.width === 'number') {
      value += col.width
    } else {
      value += MIN_ROW_WIDTH
    }
  })

  return value > width
}
