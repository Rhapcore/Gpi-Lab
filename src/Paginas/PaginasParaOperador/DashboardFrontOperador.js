
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNavOperador from '../../Sidenav/SideNavOperador';
import Dashboard from '../subPaginas/Dashboard';

const DashboardFrontOperador = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs={0.2} />
                    <SideNavOperador/>
                    <Grid item xs={9.5} >
                    <Dashboard/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardFrontOperador;
