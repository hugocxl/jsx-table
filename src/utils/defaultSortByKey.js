export function defaultSortByKey(array, key) {
  return array.sort(function(a, b) {
    let x = a[key]
    let y = b[key]

    if (typeof x === 'string') {
      x = ('' + x).toLowerCase()
    }
    if (typeof y === 'string') {
      y = ('' + y).toLowerCase()
    }

    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}
