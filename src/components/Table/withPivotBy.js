import React from 'react'


export function withPivotBy(Table) {
  return function ({ columns, data, pivotBy, ...rest }) {
    let tableColumns = columns
    let tableData = data

    if (pivotBy && pivotBy.length) {
      const pivotedColumns = []
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

      tableColumns = [...pivotedColumns, ...restColumns]
    }

    return <Table data={tableData} columns={tableColumns} {...rest}/>
  }
}
