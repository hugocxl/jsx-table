'use strict'

import { BaseNotable } from './Base'
import { withSortBy } from './HOCs'


export const Table = ({ autoSizer, sortable, ...rest }) => {
  let component = BaseNotable

  if (sortable) {
    component = withSortBy(component)
  }

  return component({ autoSizer, sortable, ...rest })
}
