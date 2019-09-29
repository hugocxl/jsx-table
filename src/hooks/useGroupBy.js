import { utils } from '../utils'
import React from 'react'
import memoize from 'memoize-one'


export function useGroupBy({ data, columns, groupBy }) {
  const getColumns = memoize(columns => {
    return transformToColumnsGrouped(columns)
  })

  const getData = memoize((data, groupBy) => {
    return transformToDataGrouped(data, groupBy)
  })

  function transformToColumnsGrouped(columns) {
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

  function transformToDataGrouped(data, groupByArray) {
    let transformedData = []

    for (let i = 0; i < groupByArray.length; i++) {
      const groupKey = groupByArray[i]

      if (i === 0) {
        transformedData = createDataWithGroupedChildren(data, groupKey)
      } else {
        transformedData = transformedData.map(el => {
          return {
            ...el,
            children: createDataWithGroupedChildren(el.children, groupKey)
          }
        })
      }
    }

    return transformedData
  }

  function createDataWithGroupedChildren(data, groupBy) {
    const groupObject = utils.groupBy(data, groupBy)
    const a = getChildren(groupObject, data, groupBy)
    return a
  }

  return {
    data: getData(data, groupBy),
    columns: getColumns(columns)
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
