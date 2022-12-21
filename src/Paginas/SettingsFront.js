
import * as React from 'react';
import {Grid,Typography} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import ConfiguracionTransverView from './subPaginas/Configuracion TransferView';
import IngresarEmpresa from './subPaginas/IngresarEmpresa';

const UsuarioFront = () => {
    return(
        <div>
           <Grid>
                <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 30, sm: 20, md: 5 }}>
                <Grid item xs={0.2}> </Grid>
                        <SideNav/>
                <Grid item xs={10}>
                <IngresarEmpresa/>
                <ConfiguracionTransverView/>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default UsuarioFront;
