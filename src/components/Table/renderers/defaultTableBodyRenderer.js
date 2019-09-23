import React from 'react'
import { defaultRowRenderer } from './defaultRowRenderer'
import { defaultLoadingRenderer } from './defaultLoadingRenderer'
import cx from 'classnames'


class BodyRender extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      height: 0,
      scroll: 0
    }
  }

  componentDidMount() {
    this.setState({
      height: this.ref.current.clientHeight,
      scroll: this.ref.current.scrollTop
    })
  }

  onScroll = () => {
    this.setState({
      height: this.ref.current.clientHeight,
      scroll: this.ref.current.scrollTop
    })
  }

  render() {
    console.log('render', this.state.scroll, this.state.height)

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
          onScroll={this.onScroll}
          ref={this.ref}
          className={cx('AwesomeTable__body', { loading })}
          style={{ height: tableBodyHeight, maxHeight: tableBodyHeight }}>
          {data.map((rowData, rowIndex) => {
            const rowProps = {
              // bodyScrollTop: scrollTop,
              // bodyHeight: height,
              rowData,
              rowIndex,
              ...rest
            }

            return rowRenderer
              ? rowRenderer(rowProps)
              : defaultRowRenderer(rowProps)
          })}
        </div>
      </React.Fragment>
    )
  }
}

export const defaultTableBodyRenderer = (props) => <BodyRender {...props}/>
