import './styles/index.css'
import { Table as BaseTable } from './components'
import { withSortBy, withRowSelection, withData, withPagination } from './HOCs'


export const Table = withData(withSortBy(BaseTable))
export * from './components/Column'
