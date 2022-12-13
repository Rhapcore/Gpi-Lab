
import * as React from 'react';
import {Grid} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import TableAxios from './subPaginas/2da tabla';

const DashboardSegunda = () => {
    return(
            <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs="auto"/>
                    <SideNav/>
                    <Grid item xs={9.5} > 
                    <TableAxios/>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default DashboardSegunda;
