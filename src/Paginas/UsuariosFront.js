
import * as React from 'react';
import {Grid} from '@mui/material';

import SideNav from '../Sidenav/SideNav';
import Usuarios from './subPaginas/Usuarios';
import { useNavigate } from 'react-router-dom';

const UsuarioFront = () => {
    const navigate = useNavigate();

    const Agregar = async () => {
        navigate("/Usuarios/Agregar")
     }

    return(
        <div>
           <Grid>
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
