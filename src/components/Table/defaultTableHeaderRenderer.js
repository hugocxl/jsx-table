import React, { useRef, useEffect } from 'react'
import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'

export function defaultTableHeaderRenderer ({
  headerRowRenderer,
  headerHeight,
  scroll: { scrollLeft = 0 } = {},
  ...rest
}) {
  const tableHeaderRef = useRef(null)

  useEffect(() => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.scroll({
        top: 0,
        left: scrollLeft,
        behavior: 'auto'
      })
    }
  }, [scrollLeft])

  return (
    <div
      ref={tableHeaderRef}
      className={'jsx-table__header'}
      style={{
        height: headerHeight,
        overflow: 'hidden auto'
      }}
    >
      {headerRowRenderer
        ? headerRowRenderer(rest)
        : defaultHeaderRowRenderer(rest)}
    </div>
  )
}
