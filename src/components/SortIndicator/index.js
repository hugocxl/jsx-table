import clsx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { SORT_DIRECTION } from '../../constants/sortDirection'


export function SortIndicator({ sortDirection }) {
  const classNames = clsx('ReactVirtualized__Table__sortableHeaderIcon', {
    'ReactVirtualized__Table__sortableHeaderIcon--ASC':
      sortDirection === SORT_DIRECTION.ASC,
    'ReactVirtualized__Table__sortableHeaderIcon--DESC':
      sortDirection === SORT_DIRECTION.DESC
  })

  return (
    <svg className={classNames} width={18} height={18} viewBox="0 0 24 24">
      {sortDirection === SORT_DIRECTION.ASC ? (
        <path d="M7 14l5-5 5 5z"/>
      ) : (
        <path d="M7 10l5 5 5-5z"/>
      )}
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  )
}

SortIndicator.propTypes = {
  sortDirection: PropTypes.oneOf([SORT_DIRECTION.ASC, SORT_DIRECTION.DESC])
}
