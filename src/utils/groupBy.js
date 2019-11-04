export function groupBy(array, key) {
  return array.reduce((rv, x, i) => {
    const resKey = typeof key === 'function' ? key(x, i) : x[key]
    rv[resKey] = Array.isArray(rv[resKey]) ? rv[resKey] : []
    rv[resKey].push(x)
    return rv
  }, {})
}
