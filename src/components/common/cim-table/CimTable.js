import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

import './CimTable.scss';

export default (props) => {

    return (
        <div style={{ height: '80vh', width: '100%' }}>
           <DataGrid 
            rows={props?.rows} 
            columns={props?.columns} 
            isCellEditable={props?.isCellEditable}
            onCellClick={props?.onCellClick}
            onSelectionModelChange={props?.onSelectionModelChange}
            onRowEditStart={props?.onRowEditStart}
            onRowEditStop={props?.onRowEditStop}
            components={props?.components}
            componentsProps={props?.componentsProps}
            apiRef={props?.apiRef}
            editMode={'row'}
            checkboxSelection 
            disableSelectionOnClick
             />
        </div>
    )
}