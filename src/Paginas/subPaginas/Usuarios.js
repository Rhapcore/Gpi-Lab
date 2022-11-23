// material mui
import { Button, Grid,Typography, Paper, createTheme} from '@mui/material';
// tablas
import MainCard from "../../Tablas/MainCard";
import Tablausuarios from '../../Tablas/TablaUsuarios';
// paginas

const Usuarios = () => {
    return(
        <div>
               <Grid>
              <Typography variant="h5">  </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: "auto", sm: "auto", md: "auto" }}>
                <Grid item xs={10} sx={{ mt: 5 }}>
                <Paper xs={10} elevation={10}>
                <MainCard  sx={{ mt: 1 }}>
                <Grid container spacing={2} columns={16}>
                        <Grid item xs={4}>
                            <Typography 
                            variant="h5" 
                            columnSpacing={{ xs: "auto"}} > 
                            Tabla de Usuarios 
                            </Typography>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            <Button
                            href='/Usuarios/Agregar'
                            Disable elevation
                            variant="contained"
                            position="left" 
                            color="info"> Nuevo Usuario </Button>
                            </Grid>
                        </Grid>
                        <i>ㅤ</i>
                        <Tablausuarios />
                        </MainCard>
                        </Paper> 
                </Grid>
                </Grid>
                </Grid>
        </div>
    )
}

export default Usuarios;