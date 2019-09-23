import React from 'react'


export const withRowSelection = Table => function({
  onRowSelect,
  selectableRows,
  columns,
  data,
  ...rest
}) {

  const [selectedRows, setSelectedRows] = React.useState(data.map(el => ({
    ...el,
    selected: el.selected || false
  })))

  function onSelectableClick({ rowIndex }) {
    let nextSelectedRows = [...selectedRows]

    nextSelectedRows[rowIndex] = {
      ...nextSelectedRows[rowIndex],
      selected: !nextSelectedRows[rowIndex].selected
    }

    setSelectedRows(nextSelectedRows)
  }

  const withSelectColumns = [
    {
      Header: '',
      id: 'selected',
      width: 35,
      Cell: ({ cellData, rowIndex }) => {
        return (
          <input
            type={'checkbox'}
            checked={cellData}
            onClick={() => onSelectableClick({ rowIndex })}
          />
        )
      }
    },
    ...columns
  ]

  return (
    <Table
      onRowSelect={onRowSelect}
      columns={withSelectColumns}
      data={selectedRows}
      {...rest}
    />
  )
}
