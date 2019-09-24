import './styles/index.css'
import { Table, Column } from './components'
import { withSortBy, withRowSelection, withData, withPagination } from './HOCs'


export const ReactNinjaTable = withData(withSortBy(Table))
export * from './components/Column'
