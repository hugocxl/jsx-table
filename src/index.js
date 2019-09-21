import './styles/index.css'
import { Table } from './components'
import { withSortBy } from './HOCs/withSortBy'


export const ReactAwesomeTable = withSortBy(Table)
