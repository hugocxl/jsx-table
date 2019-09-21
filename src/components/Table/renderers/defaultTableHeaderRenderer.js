import React from 'react'
import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'


export function defaultTableHeaderRenderer({
  headerRowRenderer,
  headerHeight,
  ...rest
}) {
  return (
    <div
      className={'AwesomeTable_header'}
      style={{ height: headerHeight }}>
      {headerRowRenderer
        ? headerRowRenderer(rest)
        : defaultHeaderRowRenderer(rest)}
    </div>
  )
}
