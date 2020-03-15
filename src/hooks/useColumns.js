'use strict'

import React, { useState, useEffect } from 'react'
import { utils } from '../utils'

export function useColumns (columns, children) {
  const [tableColumns, setTableColumns] = useState(() => {
    return columns || utils.normalizeColumns(children)
  })

  useEffect(() => {
    setTableColumns(columns || utils.normalizeColumns(children))
  }, [JSON.stringify(columns)])

  return tableColumns
}
