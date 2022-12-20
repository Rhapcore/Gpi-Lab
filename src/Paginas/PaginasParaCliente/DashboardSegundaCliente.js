
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import TableAxios from '../subPaginas/2da tabla';
import SideNavCliente from '../../Sidenav/SideNavCliente';

const DashboardSegundaCliente = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid item xs={0.2}> </Grid>
                        <SideNavCliente/>
                <Grid item xs={9.5} >
                    <Grid> </Grid>
                <TableAxios/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default DashboardSegundaCliente;
