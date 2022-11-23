
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import Settings from './subPaginas/Settings';

const UsuarioFront = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid xs={0.2}> </Grid>
                        <SideNav/>
                <Grid item xs={10} >
                <Settings/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default UsuarioFront;
