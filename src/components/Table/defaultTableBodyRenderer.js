import React, { useRef, useEffect, useState, Fragment } from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


export function defaultTableBodyRenderer({
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
  ...rest
}) {
  const tableBodyRef = useRef(null)

  useEffect(() => {
    if (virtualized && tableBodyRef && tableBodyRef.current) {
      const { scrollTop, scrollLeft } = tableBodyRef.current

      setScroll({
        scrollTop,
        scrollLeft
      })
    }
  }, [height])

  function renderRows() {
    return data.map((el, i) => {
      const rowProps = {
        rowData: el,
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        position: i % 2 === 0 ? 'even' : 'odd',
        ...rest
      }

      return rowRenderer
        ? rowRenderer(rowProps)
        : defaultRowRenderer(rowProps)
    })
  }

  function renderVirtualizedRows() {
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
      const rowProps = {
        rowData: data[i],
        rowHeight,
        rowIndex: i,
        top: rowHeight * i,
        position: i % 2 === 0 ? 'even' : 'odd',
        ...rest
      }
      rows.push(
        rowRenderer
          ? rowRenderer(rowProps)
          : defaultRowRenderer(rowProps)
      )
    }

    return rows
  }

  function onBodyScroll(event) {
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
  }

  const rows = virtualized
    ? renderVirtualizedRows()
    : renderRows()

  function renderLoading() {
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
