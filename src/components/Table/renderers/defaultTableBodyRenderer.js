import { defaultRowRenderer } from './defaultRowRenderer'


export function defaultTableBodyRenderer({ tableBodyHeight, rowRenderer, disableHeader, headerHeight, data, ...rest }) {

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden auto',
      height: tableBodyHeight,
      maxHeight: tableBodyHeight
    }}>
      {data.map((rowData, rowIndex) => {
        const rowProps = {
          rowData,
          rowIndex,
          ...rest
        }

        return rowRenderer
          ? rowRenderer(rowProps)
          : defaultRowRenderer(rowProps)
      })}
    </div>
  )
}
