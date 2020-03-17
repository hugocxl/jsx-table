import React, { useRef, useEffect, useState, Fragment } from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'

export function defaultTableBodyRenderer ({
  setScroll,
  data,
  rowRenderer,
  rowHeight,
  height,
  overscanRowCount,
  onScroll,
  tableBodyHeight,
  loadingRenderer,
  loadingComponent,
  loading,
  virtualized,
  threshold,
  loadMoreRows,
  stickyRows,
  ...rest
}) {
  const tableBodyRef = useRef(null)
  const [lastThreshold, setLastThreshold] = useState(0)
  const [stickyRowsArray, setStickyRows] = useState([])
  const rows = virtualized
    ? renderVirtualizedRows()
    : renderRows()

  useEffect(() => {
    if (virtualized && tableBodyRef && tableBodyRef.current) {
      const { scrollTop, scrollLeft } = tableBodyRef.current

      setScroll({
        scrollTop,
        scrollLeft
      })
    }
  }, [height])

  function renderRows () {
    return data.map((el, i) => {
      const rowProps = {
        rowData: el,
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        ...rest
      }

      return rowRenderer
        ? rowRenderer(rowProps)
        : defaultRowRenderer(rowProps)
    })
  }

  function renderVirtualizedRows () {
    if (!tableBodyRef.current) {
      return []
    }

    const { scrollTop, clientHeight } = tableBodyRef.current
    const rows = []
    const firstRowIndexCalc = Math.round(scrollTop / rowHeight) - overscanRowCount - 1
    const lastRowIndexCalc = Math.round((scrollTop + clientHeight) / rowHeight) + overscanRowCount + 1
    const firstRowIndex = firstRowIndexCalc > 0 ? firstRowIndexCalc : 0
    const lastRowIndex = lastRowIndexCalc < data.length ? lastRowIndexCalc : data.length

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const visibleRow = rowHeight * i > scrollTop
      const sticky = stickyRows && stickyRows({ rowData: data[i] })
      const rowProps = {
        rowData: data[i],
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        visibleRow,
        sticky,
        ...rest
      }

      rows.push(
        rowRenderer
          ? rowRenderer(rowProps)
          : defaultRowRenderer(rowProps)
      )
    }

    if (stickyRows) {
      let stickyRowIndex = 0
      const limitRow = Math.round(scrollTop / rowHeight)

      for (let m = 0; m < limitRow; m++) {
        const visibleRow = rowHeight * m > scrollTop
        const sticky = stickyRows && stickyRows({ rowData: data[m] })

        if (sticky && !visibleRow) {
          rows.push(
            defaultRowRenderer({
              rowData: data[m],
              rowHeight,
              rowIndex: m,
              top: rowHeight * stickyRowIndex,
              visibleRow,
              stickyRowIndex,
              sticky,
              ...rest
            })
          )
          stickyRowIndex++
        }
      }
    }

    return rows
  }

  function onBodyScroll (event) {
    const { scrollTop, scrollLeft, clientHeight, scrollHeight } = tableBodyRef.current
    setScroll({
      scrollTop,
      scrollLeft
    })

    onScroll && onScroll({
      event,
      scrollLeft,
      scrollTop,
      clientHeight,
      scrollHeight
    })

    if (threshold) {
      const newThreshold = Math.round(scrollTop / rowHeight / threshold)

      if (newThreshold !== lastThreshold && newThreshold > lastThreshold) {
        setLastThreshold(newThreshold)
        loadMoreRows && loadMoreRows()
      }
    }
  }

  function renderLoading () {
    if (loadingRenderer) {
      return loadingRenderer({
        loadingComponent,
        height: tableBodyHeight
      })
    } else {
      return defaultLoadingRenderer({
        loadingComponent,
        height: tableBodyHeight
      })
    }
  }

  return (
    <Fragment>
      {loading && (
        renderLoading()
      )}

      <div
        className={cx('AwesomeTable__body', { loading })}
        onScroll={onBodyScroll}
        ref={tableBodyRef}
        style={{ height: tableBodyHeight }}
      >
        <div style={{ height: data && (data.length * rowHeight) }}>
          {rows}
        </div>
      </div>
    </Fragment>
  )
}
