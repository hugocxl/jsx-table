import React from 'react'
import memoize from 'memoize-one'


export const withData = Table => ({ data, ...rest }) => {
  const getIndexedData = memoize(function (data) {
    return data.map((el, i) => {
      return {
        ...el,
        dataIndex: i
      }
    })
  })

  return <Table data={getIndexedData(data)} {...rest} />
}
