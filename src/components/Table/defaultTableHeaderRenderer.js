import React, { useRef, useEffect } from 'react'
import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'

export function defaultTableHeaderRenderer ({
  headerRowRenderer,
  headerHeight,
  scroll,
  ...rest
}) {
  const tableHeaderRef = useRef(null)

  useEffect(() => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.scroll({
        top: 0,
        left: scroll.scrollLeft,
        behavior: 'auto'
      })
    }
  }, [scroll && scroll.scrollLeft])

  return (
    <div
      ref={tableHeaderRef}
      className={'AwesomeTable_header'}
      style={{ height: headerHeight, overflow: 'hidden auto' }}
    >
      {headerRowRenderer
        ? headerRowRenderer(rest)
        : defaultHeaderRowRenderer(rest)}
    </div>
  )
}
