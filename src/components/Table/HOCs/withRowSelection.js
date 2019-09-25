import React from 'react'


export const withRowSelection = Table => function({
  onRowSelect,
  selectableRows,
  columns,
  data,
  ...rest
}) {

  function getSelectedRows() {
    return data.filter(row => row.selected)
  }

  function getColumns() {
    return [
      {
        Header: '',
        id: 'selected',
        width: 35,
        sortable: true,
        Cell: ({ cellData, rowIndex, rowData }) => {
          return (
            <input
              type={'checkbox'}
              checked={cellData}
              onChange={() => {
                onRowSelect && onRowSelect({
                  rowIndex,
                  cellData,
                  rowData,
                  selectedRows: getSelectedRows(),
                  data
                })
              }}
            />
          )
        }
      },
      ...columns
    ]
  }

  return (
    <Table
      columns={getColumns()}
      data={data}
      {...rest}
    />
  )
}
