
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import Usuarios from './subPaginas/Usuarios';

const UsuarioFront = () => {
    return(
        <div>
           <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30,md: 5 }}>
                <Grid item xs={0.2}> </Grid>
                        <SideNav/>
                <Grid item xs={9.5} >
                <Usuarios/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default UsuarioFront;
