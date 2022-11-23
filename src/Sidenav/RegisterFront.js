
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from './SideNav';
import Dashboard from '../Paginas/Dashboard';

const DashboardFront = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid xs={0.3}> </Grid>
                        <SideNav/>
                <Grid item xs={10} >
                <Dashboard/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default DashboardFront;
