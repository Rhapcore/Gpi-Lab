
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import Dashboard from '../Paginas/subPaginas/Dashboard';

const DashboardFront = () => {
    return(
           <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs="auto"/>
                    <SideNav/>
                    <Grid item xs={9.5} >
                    <Dashboard/>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default DashboardFront;
