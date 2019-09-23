import './styles/index.css'
import { Table } from './components'
import { withSortBy, withRowSelection, withPagination, withVirtualization } from './HOCs'


export const ReactAwesomeTable = withSortBy(Table)
