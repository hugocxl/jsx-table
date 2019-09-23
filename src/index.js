import './styles/index.css'
import { Table } from './components'
import { withSortBy, withRowSelection, withPagination } from './HOCs'


export const ReactAwesomeTable = withPagination(withSortBy(Table))
