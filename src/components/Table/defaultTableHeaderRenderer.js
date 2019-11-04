import React from 'react'
import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'


export function defaultTableHeaderRenderer({
  headerRowRenderer,
  headerHeight,
  scroll,
  ...rest
}) {

  return (
    <div
      ref={el => {
        if (el) {
          el.scrollLeft = scroll.scrollLeft
        }
      }}
      className={'AwesomeTable_header'}
      style={{ height: headerHeight, overflow: 'hidden auto' }}>
      {headerRowRenderer
        ? headerRowRenderer(rest)
        : defaultHeaderRowRenderer(rest)}
    </div>
  )
}

