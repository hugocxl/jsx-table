
import { defaultRowRenderer } from './defaultRowRenderer'

import cx from 'classnames'


export function defaultTableRenderer({
  virtualized,
  height,
  tableBodyHeight,
  data,
  rowHeight,
  loadingRenderer,
  loadingComponent,
  loading,
  rowRenderer,
  overscanRowCount,
  onScroll,
  ...rest
}) {





  return (
    <React.Fragment>
      {loading && (loadingRenderer ? (
        loadingRenderer({ loadingComponent, height: tableBodyHeight })
      ) : (
        defaultLoadingRenderer({ loadingComponent, height: tableBodyHeight })
      ))}

      <div
        className={cx('AwesomeTable__body', { loading })}

        ref={ref}
        style={{
          height: tableBodyHeight,
        }}
      >



      </div>
    </React.Fragment>
  )

}
