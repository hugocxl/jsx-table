import { Loading } from '../../Loading'


export function defaultLoadingRenderer({ loadingComponent }) {
  return loadingComponent || <Loading/>
}
