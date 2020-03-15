export function downloadCSV () {

}

var itemsNotFormatted = [
  {
    model: 'Samsung S7',
    chargers: '55',
    cases: '56',
    earphones: '57',
    scratched: '2'
  },
  {
    model: 'Pixel XL',
    chargers: '77',
    cases: '78',
    earphones: '79',
    scratched: '4'
  },
  {
    model: 'iPhone 7',
    chargers: '88',
    cases: '89',
    earphones: '90',
    scratched: '6'
  }
]

var itemsFormatted = []

// format the data
itemsNotFormatted.forEach((item) => {
  itemsFormatted.push({
    model: item.model.replace(/,/g, ''), // remove commas to avoid errors,
    chargers: item.chargers,
    cases: item.cases,
    earphones: item.earphones
  })
})

export function convertToCSV (objArray) {
  let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
  let str = ''

  for (let i = 0; i < array.length; i++) {
    let line = ''
    for (let index in array[i]) {
      if (line !== '') line += ','

      line += array[i][index]
    }

    str += line + '\r\n'
  }

  return str
}

var headers = {
  model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
  chargers: 'Chargers',
  cases: 'Cases',
  earphones: 'Earphones'
}

export function exportCSVFile (headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers)
  }

  // Convert Object to JSON
  const jsonObject = JSON.stringify(items)

  const csv = this.convertToCSV(jsonObject)

  const exportedFilenmae = fileTitle + '.csv' || 'export.csv'

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae)
  } else {
    const link = document.createElement('a')
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', exportedFilenmae)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
