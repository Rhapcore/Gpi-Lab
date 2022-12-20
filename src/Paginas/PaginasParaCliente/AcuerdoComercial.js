
import * as React from 'react';
import {Grid} from '@mui/material';

import AcuerdoComercial2 from '../subPaginas/AcuerdoComercial2';
import SideNavCliente from '../../Sidenav/SideNavCliente';

const CAcuerdoComercialCliente = () => {
    return(
        <div>
           <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                    <Grid item xs={0.2} />
                    <SideNavCliente/>
                    <Grid item xs={9.5} >
                    <AcuerdoComercial2/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CAcuerdoComercialCliente;
