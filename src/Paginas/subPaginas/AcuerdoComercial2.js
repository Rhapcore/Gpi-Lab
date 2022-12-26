// material mui
import {Grid,Typography, Paper} from '@mui/material';
import AcuerdoComercial from '../../Tablas/AcuerdoComercial';
import { grey, lime } from '@mui/material/colors';
// tablas
import MainCard from "../../Tablas/MainCard";
import Grafico from '../../Tablas/Grafico';
// paginas
import { useState,useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../misc/consts";

const AcuerdoComercial2 = () => {

    const [userList, setUserList] = useState([])

    useEffect( () => { 
        const getUsers = async () => {
        const {data} = await axios.get(`${BASE_URL}/MostrarAcuerdoComercial`)
        console.log("data",data)
          setUserList(data)
        }
        getUsers(userList);
      }, []);
    console.log("userList afuera",userList)
    const TMP = Number.parseFloat(userList.map((i) => i.TMProgramaPorAcuerdos));
    const TMR = Number.parseFloat(userList.map((i) => i.TMRecepcionada));
    const TMT = TMP - TMR;

    



    return(
        <div>
            <Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: "auto", sm: "auto", md: "auto" }}>
                <Grid item xs={12} sx={{ mt: 5 }}>
                <Paper xs={12} elevation={10}>
                <MainCard  sx={{ mt: 1 }}>
                <Grid container spacing={2} columns={16}>
                        <Grid item xs={12}>
                            <Typography 
                            variant="h4" > 
                            Acuerdo Comercial
                            </Typography>
                        </Grid>
                        </Grid>
                        <i>ㅤ</i>
                        <AcuerdoComercial userList={userList}/>
                        </MainCard>
                        </Paper> 
                </Grid>
                <Grid xs={3}> </Grid>
                <Grid item lg={6} md={6} sm={6} xs={3} sx={{ mt: 5, right: 10}}>
                        <Paper elevation={10}>
                            <MainCard>
                                    <Typography variant="h5" sx={{ mb: 1}} > Saldo de Producto para cumplimiento Acuerdo Comercial </Typography>
                                    <Grafico
                                        chartData={[
                                            { label: 'TM Programa por acuerdos', value: TMP },
                                            { label: 'TM Recepcionada', value: TMR },
                                            { label: 'TM Diferenicia', value: TMT },
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
                </Grid>
                </Grid>
        </div>
    )
}

export default AcuerdoComercial2;