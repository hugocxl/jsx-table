import React from 'react'
import { Loading } from '../../../Loading'


export function defaultLoadingRenderer({ loadingComponent, height }) {
  return (
    <div style={{
      width: '100%',
      height,
      zIndex: 2,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {loadingComponent || <Loading/>}
    </div>
  )
}
