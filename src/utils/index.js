'use strict'

import { calculateColumnWidth } from './calculateColumnWidth'
import { defaultSortByKey } from './defaultSortByKey'
import { normalizeColumns } from './normalizeColumns'
import { groupBy } from './groupBy'
import { calculateBodyHeight } from './calculateBodyHeight'
import { generateID } from './generateID'
import { computeRowGrid } from './computeRowGrid'


export const utils = {
  computeRowGrid,
  calculateColumnWidth,
  defaultSortByKey,
  normalizeColumns,
  calculateBodyHeight,
  groupBy,
  generateID,
}

