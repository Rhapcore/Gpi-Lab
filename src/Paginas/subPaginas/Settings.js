// material mui
import { Button, Grid,Typography, Paper, Box} from '@mui/material';
// tablas
import MainCard from "../../Tablas/MainCard";
import TransferViewEditar from '../../Tablas/TablaTransferView';
// paginas


const Settings = () => {
    return(
        <div><Grid>
        <Typography variant="h5">  </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: "auto", sm: "auto", md: "auto" }}>
          <Grid item xs={10} sx={{ mt: 5 }}>
          <Paper xs={10} elevation={10}>
          <MainCard  sx={{ mt: 1 }}>
          <Grid container spacing={2} columns={16}>
                  <Grid item xs={6}>
                      <Typography 
                      variant="h5" 
                      columnSpacing={{ xs: "auto"}} > 
                      Configuracion de TransferView
                      </Typography>
                  </Grid>
                  <Grid item xs={8}></Grid>
                  </Grid>
                  <i>ㅤ</i>
                  <TransferViewEditar />
                  </MainCard>
                  </Paper> 
          </Grid>
          </Grid>
          </Grid>
        </div>
    )
}

export default Settings;