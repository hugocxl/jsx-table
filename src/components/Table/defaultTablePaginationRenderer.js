'use strict'

import React from 'react'
import { Pagination } from '../Pagination'

export function defaultTablePaginationRenderer ({
  paginationHeight,
  paginationComponent,
  paginationProps,
  ...rest
}) {
  return (
    <div
      className={'jsx-table__pagination'}
      style={{
        height: paginationHeight,
        ...paginationProps && paginationProps.style
      }}>
      {paginationComponent ? (
        paginationComponent({ paginationHeight, ...rest })
      ) : (
        <Pagination {...rest} />
      )}
    </div>
  )
}
