import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid/models';
import { GridProps } from './Grid.types'
import * as S from './Grid.styles'

const columns: GridColDef[] = [
  {
    field: 'column1', headerName: 'Number', width: 100
  },
  {
    field: 'column2', headerName: 'Date', width: 300
  }
]

export const Grid: React.FC<GridProps> = ({ events, loading }) => {
  const rows: GridRowsProp = events.map(({ id, date }, i) => {
    return {
      id,
      column1: i + 1,
      column2: new Date(date).toLocaleDateString("pl-PL")
    }
  })
  return (
    <S.GridWrapper>
      {events.length === 0 ? <p>Add your first event!</p> : <DataGrid loading={loading} columns={columns} rows={rows} disableColumnMenu hideFooter autoHeight columnBuffer={0} showCellRightBorder rowCount={2} showColumnRightBorder scrollbarSize={0} />}

    </S.GridWrapper>
  )
}
