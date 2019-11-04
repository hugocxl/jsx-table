import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


class BodyRender extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.renderRows = this.renderRows.bind(this)
    this.renderVirtualizedRows = this.renderVirtualizedRows.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.virtualized && (this.props.height !== prevProps.height)) {
      const { scrollTop, scrollLeft } = this.ref.current

      this.props.setScroll({
        scrollTop,
        scrollLeft
      })
    }
  }

  renderRows() {
    const { data, rowRenderer, rowHeight, ...rest } = this.props

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

  renderVirtualizedRows() {
    if (!this.ref.current) {
      return []
    }
    const { data, rowRenderer, rowHeight, overscanRowCount, ...rest } = this.props
    const { scrollTop, clientHeight } = this.ref.current
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

  onScroll(event) {
    const { scrollTop, scrollLeft, clientHeight, scrollHeight } = this.ref.current
    this.props.setScroll({
      scrollTop,
      scrollLeft
    })

    this.props.onScroll && this.props.onScroll({
      event,
      scrollLeft,
      scrollTop,
      clientHeight,
      scrollHeight
    })
  }

  render() {
    const { tableBodyHeight, data, rowHeight, loadingRenderer, loadingComponent, loading, virtualized } = this.props
    const rows = virtualized
      ? this.renderVirtualizedRows()
      : this.renderRows()

    return (
      <React.Fragment>
        {loading && (loadingRenderer ? (
          loadingRenderer({ loadingComponent, height: tableBodyHeight })
        ) : (
          defaultLoadingRenderer({ loadingComponent, height: tableBodyHeight })
        ))}

        <div
          className={cx('AwesomeTable__body', { loading })}
          onScroll={this.onScroll}
          ref={this.ref}
          style={{ height: tableBodyHeight }}
        >

          <div style={{ height: data && (data.length * rowHeight) }}>
            {rows}
          </div>

        </div>
      </React.Fragment>
    )
  }
}

export const defaultTableBodyRenderer = (props) => <BodyRender {...props}/>
