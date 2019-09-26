import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


class BodyRender extends React.PureComponent {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      scrollTop: null
    }
  }

  componentDidMount() {
    this.props.virtualized && this.setState({
      scrollTop: this.ref.current.scrollTop
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.height !== prevProps.height) {
      this.setState({
        scrollTop: this.ref.current.scrollTop
      })
    }
  }

  renderRows = () => {
    const { data, rowRenderer, rowHeight, ...rest } = this.props

    return data.map((el, i) => {
      const rowProps = {
        rowData: el,
        rowHeight,
        selected: false,
        rowIndex: i,
        ...rest
      }
      return rowRenderer
        ? rowRenderer(rowProps)
        : defaultRowRenderer(rowProps)
    })
  }

  renderVirtualizedRows = () => {
    if (!this.ref.current) {
      return null
    }
    const { data, rowRenderer, rowHeight, overscanRowCount, ...rest } = this.props
    const { scrollTop, clientHeight } = this.ref.current
    const rows = []

    const firstRowIndexCalc = Math.round(scrollTop / rowHeight) - overscanRowCount
    const lastRowIndexCalc = Math.round((scrollTop + clientHeight) / rowHeight) + overscanRowCount

    const firstRowIndex = firstRowIndexCalc > 0 ? firstRowIndexCalc : 0
    const lastRowIndex = lastRowIndexCalc < data.length ? lastRowIndexCalc : data.length

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const rowProps = {
        rowData: data[i],
        rowHeight,
        selected: false,
        rowIndex: i,
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

  onScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = this.ref.current
    this.setState({
      scrollTop
    }, () => {
      this.props.onScroll && this.props.onScroll({
        scrollTop,
        clientHeight,
        scrollHeight
      })
    })
  }

  render() {
    const { tableBodyHeight, data, rowHeight, loadingRenderer, loadingComponent, loading, virtualized } = this.props
    const rows = virtualized ? this.renderVirtualizedRows() : this.renderRows()

    return (
      <React.Fragment>
        {loading && (loadingRenderer ? (
          loadingRenderer({ loadingComponent, height: tableBodyHeight })) : (
          defaultLoadingRenderer({ loadingComponent, height: tableBodyHeight })
        ))}

        <div
          className={cx('AwesomeTable__body', { loading })}
          onScroll={this.onScroll}
          ref={this.ref}
          style={{ height: tableBodyHeight }}>
          <div
            style={{
              height: data && (data.length * rowHeight)
            }}>
            {rows}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const defaultTableBodyRenderer = (props) => <BodyRender {...props}/>
