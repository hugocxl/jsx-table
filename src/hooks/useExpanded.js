import React, { useMemo } from 'react'
import { ExpandArrow } from '../components/ExpandArrow'

export function useExpanded ({ data, columns }) {
  // const [expandedRowsIndex, setExpandedRowsIndex] = React.useState([2])
  const [expandedData, setExpandedData] = React.useState(data)

  const getColumns = useMemo(columns => {
    return convertToExpandedColumns(columns)
  }, [])

  const getData = useMemo((data, expandedRowsIndex) => {
    return convertToExpandedData(data, expandedRowsIndex)
  }, [])

  // function onExpand(rowIndex) {
  //   const searchedIndex = expandedRowsIndex.filter(el => {
  //     return el === rowIndex
  //   })
  //   if (searchedIndex.length === 0) {
  //     setExpandedRowsIndex([...expandedRowsIndex, rowIndex])
  //   } else {
  //     const filteredData = expandedRowsIndex.filter(el => {
  //       return el !== rowIndex
  //     })
  //     setExpandedRowsIndex(filteredData)
  //   }
  // }

  function onExpand (id) {
    const demo = expandedData.map(el => {
      return iterateTree(el)
    })

    function iterateTree (row) {
      if (row.id === id) {
        return {
          ...row,
          expanded: !row.expanded
        }
      } else if (row.children) {
        return {
          ...row,
          children: row.children.map(el => iterateTree(el))
        }
      } else {
        return row
      }
    }

    return setExpandedData(demo)
  }

  function convertToExpandedColumns (columns) {
    // return [
    //   {
    //     header: 'Expandable',
    //     dataKey: 'expandedRowsIndex',
    //     width: 30,
    //     cell: ({ cellData, id }) => <ExpandArrow onClick={() => {
    //       onExpand(id)
    //     }}/>
    //   },
    //   ...columns
    // ]
    let modifiedColums = columns
    modifiedColums[0] = {
      header: 'Name', align: 'left', dataKey: 'name', sortable: true,
      cell: ({ id, cellData }) => <span onClick={() => onExpand(id)}>{cellData}</span>
    }

    modifiedColums[1] = {
      header: 'Country', align: 'left', dataKey: 'country', sortable: true,
      cell: ({ id, cellData }) => <span onClick={() => onExpand(id)}>{cellData}</span>
    }

    return modifiedColums
  }

  function convertToExpandedData (data) {
    let expandedData = []

    function iterateRow (el) {
      expandedData.push(el)
      if (el.children && el.expanded) {
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
    data: convertToExpandedData(expandedData)
  }
}
