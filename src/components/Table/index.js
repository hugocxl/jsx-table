'use strict'

import React from 'react'
import { BaseNotable } from './Base'
import { withSortBy, withAutoSizer, withPagination } from './HOCs'
import {
  DEFAULT_FOOTER_HEIGHT,
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGINATION_HEIGHT,
  DEFAULT_ROW_HEIGHT
} from '../../constants/dimensions'


export const Table = ({ autoSizer, sortable, pagination, ...rest }) => {
  let Component = BaseNotable

  if (pagination) {
    Component = withPagination(Component)
  }

  if (autoSizer) {
    Component = withAutoSizer(Component)
  }

  if (sortable) {
    Component = withSortBy(Component)
  }

  return <Component {...rest}/>
}

Table.defaultProps = {
  virtualized: false,
  disabled: false,
  loading: false,
  overscanRowCount: 10,
  disableHeader: false,
  columns: null,
  data: null,
  paginationHeight: DEFAULT_PAGINATION_HEIGHT,
  rowHeight: DEFAULT_ROW_HEIGHT,
  headerHeight: DEFAULT_HEADER_HEIGHT,
  footerHeight: DEFAULT_FOOTER_HEIGHT
}
