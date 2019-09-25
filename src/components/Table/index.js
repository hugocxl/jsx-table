'use strict'

import { BaseNotable } from './Base'
import { withSortBy, withAutoSizer } from './HOCs'


export const Table = ({ autoSizer, sortable, ...rest }) => {
  let component = BaseNotable

  if (sortable) {
    component = withSortBy(component)
  }

  if (autoSizer) {
    component = withAutoSizer(component)
  }

  return component({ autoSizer, sortable, ...rest })
}
