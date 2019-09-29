import React from 'react'
import './index.css'


export function ExpandArrow({ open, ...rest }) {
  return (
    <div {...rest}>
      <i className={`arrow ${open ? 'right' : 'down'}`}/>
    </div>
  )
}
