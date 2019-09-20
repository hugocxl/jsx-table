import React from 'react'
import { NoData } from '../../NoData'


export function defaultNoDataRenderer({ noDataComponent }) {
  return noDataComponent || <NoData/>
}
