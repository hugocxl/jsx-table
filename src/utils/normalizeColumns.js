import React from 'react'


export function normalizeColumns(columns) {
  return React.Children.map(columns, column => {
    return {
      ...column.props,
      key: column.props.dataKey
    }
  })
}
