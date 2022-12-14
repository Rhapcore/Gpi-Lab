
import * as React from 'react';
import {Grid} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import Register from './subPaginas/Register';

const RegisterFront = () => {
    return(
        <div>
           <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid item xs={0.2}> </Grid>
                        <SideNav/>
                <Grid item xs={10} >
                <Register/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default RegisterFront;
