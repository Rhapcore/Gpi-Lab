
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import AcuerdoComercial2 from './subPaginas/AcuerdoComercial2';

const AAcuerdoComercial = () => {
    return(
        <div>
           <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs={0.2} />
                    <SideNav/>
                    <Grid item xs={9.5} >
                    <AcuerdoComercial2/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AAcuerdoComercial;
