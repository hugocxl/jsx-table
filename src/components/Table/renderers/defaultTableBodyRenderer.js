import React from 'react'
import { defaultRowRenderer, defaultLoadingRenderer } from './index'
import cx from 'classnames'


class BodyRender extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      scrollTop: null
    }
  }

  componentDidMount() {
    this.setState({
      control: this.ref.current.scrollTop
    })
  }

  renderContent = () => {
    if (!this.ref.current) {
      return null
    }
    const { data, rowRenderer, rowHeight, ...rest } = this.props
    const { scrollTop, clientHeight } = this.ref.current
    const rows = []

    const firstRowIndex = Math.round(scrollTop / rowHeight)
    const lastRowIndex = Math.round((scrollTop + clientHeight) / rowHeight)

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
    this.setState({
      control: this.ref.current.scrollTop
    })
  }

  render() {
    const { tableBodyHeight, data, rowHeight, loadingRenderer, loadingComponent, loading } = this.props

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
          style={{ height: tableBodyHeight, overflow: 'auto' }}>
          <div
            style={{
              position: 'relative',
              height: data && (data.length * rowHeight)
            }}>
            {this.renderContent()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const defaultTableBodyRenderer = (props) => <BodyRender {...props}/>
