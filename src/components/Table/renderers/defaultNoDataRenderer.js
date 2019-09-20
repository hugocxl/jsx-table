import { NoData } from '../../NoData'


export function defaultNoDataRenderer({ noDataComponent }) {
  return noDataComponent || <NoData/>
}
