
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNavOperador from '../../Sidenav/SideNavOperador';
import TableAxios from '../subPaginas/2da tabla';

const DashboardSegundaOperador = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid item xs={0.2}> </Grid>
                        <SideNavOperador/>
                <Grid item xs={9.5} >
                    <Grid> </Grid>
                <TableAxios/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default DashboardSegundaOperador;
