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
  const [lastThreshold, setLastThreshold] = useState(0)
  const tableBodyRef = useRef(null)
  const { scrollTop = 0, scrollLeft = 0, clientHeight, scrollHeight } = tableBodyRef.current || {}
  const rows = virtualized
    ? renderVirtualizedRows()
    : renderRows()

  useEffect(() => {
    if (virtualized) {
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

    let rows = []
    const firstRowIndexCalc = Math.round(scrollTop / rowHeight) - overscanRowCount - 1
    const lastRowIndexCalc = Math.round((scrollTop + clientHeight) / rowHeight) + overscanRowCount + 1

    const firstRowIndex = firstRowIndexCalc > 0
      ? firstRowIndexCalc
      : 0

    const lastRowIndex = lastRowIndexCalc < data.length
      ? lastRowIndexCalc
      : data.length

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const rowProps = {
        rowData: data[i],
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        ...rest
      }

      rows.push(
        rowRenderer
          ? rowRenderer(rowProps)
          : defaultRowRenderer(rowProps)
      )
    }

    if (stickyRows) {
      rows = [...rows, ...renderStickyRows()]
    }

    return rows
  }

  function renderStickyRows () {
    const rows = []
    let stickyRowIndex = 0
    const limitRow = Math.round(scrollTop / rowHeight)

    for (let m = 0; m < limitRow; m++) {
      const visibleRow = rowHeight * m > scrollTop
      const sticky = stickyRows && stickyRows({
        rowData: data[m],
        rowIndex: m,
        rowHeight
      })

      if (sticky && !visibleRow) {
        rows.push(
          defaultRowRenderer({
            rowData: data[m],
            rowHeight,
            rowIndex: m,
            top: rowHeight * stickyRowIndex,
            visibleRow,
            stickyRowIndex,
            sticky: sticky && !visibleRow,
            ...rest
          })
        )
        stickyRowIndex++
      }
    }

    return rows
  }

  function onBodyScroll (event) {
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
        className={cx('jsx-table__body', { loading })}
        onScroll={onBodyScroll}
        ref={tableBodyRef}
        style={{ height: tableBodyHeight }}
      >
        <div style={{ height: data.length * rowHeight }}>
          {rows}
        </div>
      </div>
    </Fragment>
  )
}
