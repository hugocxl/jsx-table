import React from 'react'
import { utils } from '../../utils'
import { ExpandArrow } from '../ExpandArrow'


export const withPivotBy = function (Table) {
  return function ({ columns, data, pivotBy, ...rest }) {
    const [tableData, setTableData] = React.useState(data)
    const [tableColumns, setTableColumns] = React.useState(columns)

    React.useEffect(() => {
      if (pivotBy && pivotBy.length) {
        const pivotedColumns = [{
          header: '',
          dataKey: 'expand',
          // cell: ({ data, cellData }) => <ExpandArrow onClick={() => onClickExpand(data)} open={cellData}/>,
          width: 35
        }]

        for (let i = 0; i < pivotBy.length; i++) {
          columns.forEach(column => {
            if (column.dataKey === pivotBy[i]) {
              pivotedColumns.push(column)
            }
          })
        }
        const restColumns = columns.filter(column => {
          return !pivotedColumns.some(el => {
            return el.dataKey === column.dataKey
          })
        })

        setTableColumns([...pivotedColumns, ...restColumns])

        const groupedData = utils.groupBy(data, pivotBy[0])
        const a = getChildren(groupedData, data, pivotBy[0])
        setTableData(a)
      }

    }, [])

    return (
      <Table
        data={tableData}
        columns={tableColumns}
        {...rest}/>
    )
  }

  function getChildren(groupedData, data, pivotBy) {
    const dataKeys = Object.keys(data[0])
    const series = []

    for (let field in groupedData) {
      const serie = {}
      dataKeys.forEach(dataKey => {
        if (dataKey === pivotBy) {
          return serie[pivotBy] = field
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
      serie.children = groupedData[field]
      serie.expand = true
      series.push(serie)
    }

    return series
  }
}
