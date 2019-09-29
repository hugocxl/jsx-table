import { utils } from '../utils'
import React from 'react'


export function useGroupBy({ data, columns, groupBy }) {
  const [groupedData, setGroupedData] = React.useState(getDataGrouped(data))
  const [groupedColumns, setGroupedColumns] = React.useState(getColumnsGrouped(columns))

  function getColumnsGrouped(columns) {
    const pivotedColumns = []

    for (let i = 0; i < groupBy.length; i++) {
      columns.forEach(column => {
        if (column.dataKey === groupBy[i]) {
          pivotedColumns.push(column)
        }
      })
    }
    const restColumns = columns.filter(column => {
      return !pivotedColumns.some(el => {
        return el.dataKey === column.dataKey
      })
    })

    return ([...pivotedColumns, ...restColumns])

  }

  function getDataGrouped(data) {
    const groupedData = utils.groupBy(data, groupBy[0])
    return getChildren(groupedData, data, groupBy[0])
  }

  return {
    data: groupedData,
    columns: groupedColumns
  }
}

function getChildren(groupedData, data, groupBy) {
  const dataKeys = Object.keys(data[0])
  const series = []

  for (let field in groupedData) {
    const serie = {}
    dataKeys.forEach(dataKey => {
      if (dataKey === groupBy) {
        return serie[groupBy] = field
      }
      const isNumericKey = typeof groupedData[field][0][dataKey] === 'number'
      let serieValue = ''

      groupedData[field].forEach(el => {
        if (serieValue.length === 0) {
          return serieValue = el[dataKey].toString()
        } else {
          if (!serieValue.includes(el[dataKey])) {
            return serieValue += `, ${el[dataKey]}`
          }
        }
      })
      serie[dataKey] = serieValue
    })

    serie.children = groupedData[field].map(el => {
      return {
        ...el,
        [groupBy]: ''
      }
    })
    serie.expand = true
    series.push(serie)
  }

  return series
}
