import React from 'react'
import { ExpandArrow } from '../components/ExpandArrow'
import memoize from 'memoize-one'


export function useExpanded({ data, columns }) {
  const [expandedRowsIndex, setExpandedRowsIndex] = React.useState([2])

  const getColumns = memoize(columns => {
    return convertToExpandedColumns(columns)
  })

  const getData = memoize((data, expandedRowsIndex) => {
    return convertToExpandedData(data, expandedRowsIndex)
  })

  function onExpand(rowIndex) {
    const searchedIndex = expandedRowsIndex.filter(el => {
      return el === rowIndex
    })
    if (searchedIndex.length === 0) {
      setExpandedRowsIndex([...expandedRowsIndex, rowIndex])
    } else {
      const filteredData = expandedRowsIndex.filter(el => {
        return el !== rowIndex
      })
      setExpandedRowsIndex(filteredData)
    }
  }

  function convertToExpandedColumns(columns) {
    return [
      {
        header: 'Expandable',
        dataKey: 'expandedRowsIndex',
        width: 30,
        cell: ({ cellData, parentIndex }) => parentIndex && <ExpandArrow onClick={() => {
          onExpand(parentIndex, expandedRowsIndex)
        }}/>
      },
      ...columns
    ]
  }

  function convertToExpandedData(data) {
    let expandedData = []
    let index = 0

    function iterateRow(el) {
      expandedData.push({
        ...el,
        dataIndex: index
      })
      index++
      if (el.children) {
        el.children.forEach(children => {
          iterateRow(children)
        })
      }
    }

    data.forEach(row => {
      iterateRow(row)
    })

    return expandedData
  }

  // function convertToExpandedData(data, expandedRowsIndex) {
  //   if (expandedRowsIndex.length === 0) {
  //     return data.map((el, i) => {
  //       return {
  //         ...el,
  //         parentIndex: i + 1,
  //         expandedRowsIndex
  //       }
  //     })
  //   } else {
  //     let expanded = []
  //     data.forEach((el, index) => {
  //       expanded.push({
  //         ...el,
  //         parentIndex: index + 1
  //       })
  //       for (let i = 0; i < expandedRowsIndex.length; i++) {
  //         if ((index + 1) === expandedRowsIndex[i]) {
  //           expanded = [...expanded, ...el.children]
  //         }
  //       }
  //     })
  //     return expanded
  //   }
  // }

  return {
    columns: getColumns(columns),
    data: getData(data, expandedRowsIndex)
  }
}
