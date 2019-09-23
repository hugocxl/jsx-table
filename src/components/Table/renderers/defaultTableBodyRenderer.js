import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


class BodyRender extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    this.setState({
      rows: this.renderContent()
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const a = JSON.stringify(this.props.sortBy)
    const b = JSON.stringify(prevProps.sortBy)

    if (a !== b) {
      this.setState({
        rows: this.renderContent()
      })
    }
  }

  renderContent = () => {
    const rows = []

    if (!this.ref.current) {
      return null
    }

    const firstRowIndex = Math.round(this.ref.current.scrollTop / this.props.rowHeight)
    const lastRowIndex = Math.round((this.ref.current.scrollTop + this.ref.current.clientHeight) / this.props.rowHeight)

    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const rowProps = {
        rowData: this.props.data[i],
        selected: false,
        rowIndex: i,
        ...this.props
      }
      rows.push(
        defaultRowRenderer(rowProps)
      )
    }
    return rows
  }

  onScroll = () => {
    this.setState({
      rows: this.renderContent()
    })
  }

  render() {
    const {
      tableBodyHeight,
      rowRenderer,
      disableHeader,
      headerHeight,
      data,
      loadingRenderer,
      loadingComponent,
      loading,
      ...rest
    } = this.props

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
          style={{ height: tableBodyHeight, overflow: 'scroll' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'scroll',
              height: this.props.data.length * this.props.rowHeight
            }}>
            {this.renderContent()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const defaultTableBodyRenderer = (props) => <BodyRender {...props}/>
