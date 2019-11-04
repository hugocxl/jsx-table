import React from 'react'


export class AutoSizer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.autoSizer = React.createRef()
    this.parentNode = null

    this.state = {
      height: this.props.defaultHeight || 0,
      width: this.props.defaultWidth || 0
    }
  }

  componentDidMount() {
    if (this.autoSizer && this.autoSizer.current && this.autoSizer.current.parentNode) {
      this.parentNode = this.autoSizer.current.parentNode
      this.onResize()

      window.addEventListener('resize', this.onResize)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const { onResize } = this.props

    if (this.parentNode) {
      const height = this.parentNode.offsetHeight || 0
      const width = this.parentNode.offsetWidth || 0

      const style = window.getComputedStyle(this.parentNode) || {}
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0
      const paddingRight = parseInt(style.paddingRight, 10) || 0
      const paddingTop = parseInt(style.paddingTop, 10) || 0
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0

      const newHeight = height - paddingTop - paddingBottom
      const newWidth = width - paddingLeft - paddingRight

      if (this.state.height !== newHeight || this.state.width !== newWidth) {
        this.setState({
          height: newHeight,
          width: newWidth
        })

        onResize && onResize({ height, width })
      }
    }
  }

  render() {
    const { height, width } = this.state
    const { disableHeight, disableWidth, className, children, style, ...rest } = this.props

    const outerStyle = {
      overflow: 'visible',
      width: 0,
      height: 0
    }
    const childParams = {
      height,
      width
    }

    // if (!disableHeight) {
    //   outerStyle.height = 0
    //   childParams.height = height
    // }
    //
    // if (!disableWidth) {
    //   outerStyle.width = 0
    //   childParams.width = width
    // }

    return (
      <div
        className={className}
        ref={this.autoSizer}
        style={{
          ...outerStyle,
          ...style,
        }}>
        {children(childParams)}
      </div>
    )
  }
}

AutoSizer.defaultProps = {
  disableHeight: true,
  disableWidth: true,
  style: {}
}
