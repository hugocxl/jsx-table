import { defaultHeaderRowRenderer } from './defaultHeaderRowRenderer'


export function defaultTableHeaderRenderer({ headerRowRenderer, ...rest }) {
  return headerRowRenderer
    ? headerRowRenderer(rest)
    : defaultHeaderRowRenderer(rest)
}
