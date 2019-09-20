export function defaultCellRenderer({ onCellClick, cellIndex, cellData, rowData, Cell, width, align, rowIndex, cellProps, cellComponentProps }) {

  return (
    <div
      onClick={() => onCellClick && onCellClick({
        cellData,
        cellIndex,
        rowData,
        rowIndex,
        cellProps,
        cellComponentProps
      })}
      {...cellProps}
      style={{
        width,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 10px',
        justifyContent: align || 'center',
        ...cellProps.style
      }}>
      {Cell ? (
        <Cell cellData={cellData} rowData={rowData} cellComponentProps={cellComponentProps} rowIndex={rowIndex}/>
      ) : (
        <span>{cellData}</span>
      )}
    </div>
  )
}
