
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNavCliente from '../../Sidenav/SideNavCliente';
import Dashboard from '../../Paginas/subPaginas/Dashboard';

const DashboardFrontCliente = () => {
    return(
           <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs="auto"/>
                    <SideNavCliente/>
                    <Grid item xs={9.5} >
                    <Dashboard/>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default DashboardFrontCliente;
