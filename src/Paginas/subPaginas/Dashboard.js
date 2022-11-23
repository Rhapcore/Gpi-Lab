

// material mui
import {Grid,Stack,Typography,Paper} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// tablas
import MainCard from '../../Tablas/MainCard';
import Tomm3 from "../../Tablas/TonM3";
import QDeEmbarquesmes from "../../Tablas/QDeEmbarquesMes";
import SegmentacionClienteproducto from "../../Tablas/SegmentacionClienteProducto";
import TipoDeproductos from "../../Tablas/TipoDeProductos";
import Tablacliente from '../../Tablas/TablaCliente';
import Grafico from '../../Tablas/Grafico';
import TablaProducemb from '../../Tablas/TablaProducEmb';
import TablaClienprod from '../../Tablas/TablaClienProd';
import TablaTranssum from "../../Tablas/TablaTransSum";
import { gridSpacing } from './constant';
import axios from 'axios';
import { useState } from 'react';
import { grey, lime } from '@mui/material/colors';

const Dashboard = () => {
    const theme = useTheme();
    const [userList, setUserList] = useState([])

    const getUsers = async () => {
        const {data} = await axios.get("http://localhost:3001/MostrarCliente")
        setUserList(data)
      }
    
    return(
        <div>
            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard sx={{ mt: 4 }}>
                                    <Typography variant="h5" sx={{ mb: -10 }} > TON / M3 Acumulados </Typography>
                                    <Tomm3/>
                            </MainCard>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={4} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard>
                                    <Typography variant="h5"sx={{ mb: 0 }} > Producto y Embarques </Typography>
                                    <TablaClienprod/>
                            </MainCard>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ mt: 1 }} >
                        <Paper elevation={10}>
                            <MainCard>
                                <Typography variant="h5" sx={{ mb: -5 }} > Q de Embarques </Typography>
                                <QDeEmbarquesmes/>
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12} sx={{ mt: -2 }}>
                    <Paper elevation={10}>
                        <MainCard  sx={{ mt: -20 }}>
                            <TablaTranssum/>
                        </MainCard>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={4} md={6} sm={6} xs={15} sx={{ mt: 0 }}>
                        <Paper elevation={10}>
                            <MainCard>
                                    <Typography variant="h5"sx={{ mb: 5 }} > Transporte Total </Typography>
                                    <TablaProducemb/>
                            </MainCard>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ mt: 0 }} >
                        <Paper elevation={10}>
                            <MainCard >
                                <Typography variant="h5" sx={{ mb: -13 }} > Segmentacion Cliente / Producto </Typography>
                                <SegmentacionClienteproducto/>
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={4} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard >
                                    <Typography variant="h5" sx={{ mb: 1 }} > Saldo de Producto para cumplimiento Acuerdo Comercial </Typography>
                                    <Grafico
                                        chartData={[
                                            { label: 'Producto 1', value: 4600 },
                                            { label: 'Producto 2', value: 1600 },
                                            { label: 'Producto 3', value: 3800 },
                                        ]}
                                        chartColors={[
                                            lime[500],
                                            grey[600],
                                            grey[900],
                                        ]}
                                        />
                            </MainCard>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ mt: 1 }} >
                        <Paper elevation={10}>
                            <MainCard >
                                <Typography variant="h5" sx={{ mb: -5 }} > Tipo de Productos </Typography>
                                <TipoDeproductos />
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard >
                                    <Typography variant="h5" sx={{ mb: 1 }} > Tabla de Embarque </Typography>
                                    <Tablacliente/>
                            </MainCard>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
                
        </div>
    )
}

export default Dashboard