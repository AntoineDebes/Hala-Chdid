import React, { useState } from 'react';

import './Body.scss';

import { Box } from '@mui/material';

import CimTable from '../../common/cim-table/CimTable';


const Body = (props) => {

    return (
        <Box>
            <CimTable
              rows={props?.data} 
              columns={props?.columns} 
              isCellEditable={props?.isCellEditable}
              onCellClick={props?.onCellClick}
              onSelectionModelChange={props?.onSelectionModelChange}
              onRowEditStart={props?.onRowEditStart}
              onRowEditStop={props?.onRowEditStop}
              components={props?.components}
              componentsProps={props?.componentsProps}
              apiRef={props?.apiRef}
            />
        </Box>
    );
};

export default Body
