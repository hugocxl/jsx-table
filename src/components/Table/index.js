'use strict'

import React from 'react'
import { BaseNotable } from './Base'
import { withSortBy, withAutoSizer } from './HOCs'


export const Table = ({ autoSizer, sortable, ...rest }) => {
  let Component = BaseNotable

  if (sortable) {
    Component = withSortBy(Component)
  }

  if (autoSizer) {
    Component = withAutoSizer(Component)
  }

  return <Component {...rest}/>
}
