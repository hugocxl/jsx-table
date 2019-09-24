import './styles/index.css'
import { Table, Column } from './components'
import { withSortBy, withRowSelection, withPagination } from './HOCs'


export const ReactNinjaTable = withSortBy(Table)
export * from './components/Column'
