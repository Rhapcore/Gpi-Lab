import { useEffect, useState, useRef } from 'react';

// material mui
import {Grid,Typography,Paper, TextField} from '@mui/material';

// tablas
import MainCard from '../../Tablas/MainCard';
import Tomm3 from "../../Tablas/TonM3";
import QDeEmbarquesmes from "../../Tablas/QDeEmbarquesMes";
import SegmentacionClienteproducto from "../../Tablas/SegmentacionClienteProducto";
import TipoDeproductos from "../../Tablas/TipoDeProductos";
// import Tablacliente from '../../Tablas/TablaCliente';
import TablaProducemb from '../../Tablas/TablaProducEmb';
import TablaClienprod from '../../Tablas/TablaClienProd';
import TablaTranssum from "../../Tablas/TablaTransSum";
import { gridSpacing } from './constant';

// Axios
import axios from 'axios';
// BASE URL
import { BASE_URL } from '../../misc/consts';
//import ReactToPrint from 'react-to-print';
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1,
    },
  }));
  
const Dashboard = () => {
    const [userList, setUserList] = useState([])
    const [resultTablaCli, setResultTablaCli] = useState([])
    const [resultQDEEM, setResultQDEEM] = useState([])
    const [resultTomm3, setResultTomm3] = useState([])
    const [resultTipoPro, setResultTipoPro] = useState([])
    const [cateTon, setCateton] = useState([])
    const [VolumenAcum, setVolumenAcum] = useState([])
    const [TonAcum, setTonAcum] = useState([])
    const [Empresa, setEmpresa] = useState([])
    const [Embarque, setEmbarque] = useState([])
    const componentRef = useRef();
    const [ search, setSearch ] = useState("")
    const [ searchFIN, setSearchFIN ] = useState("")

    //################# prueba de filtro #################
    /*
    const [ users, setUsers ] = useState([])
    const showData = async () => {
        const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
        setUsers(data)
        console.log("users",users)
        
     const testeo = !search ? users : users.filter((dato)=> dato.Empresa.toLowerCase().includes(search.toLocaleLowerCase()))
     const fecha = !search ? users : users.filter((dato)=> dato.FechaDeTermino.toLowerCase().includes(search.toLocaleLowerCase()))

    }
*/
const searcherINI = (e) => {
    const FechaModi = moment(e.target.value).format('YYYY/MM/DD');
    setSearch(FechaModi)
    console.log(FechaModi)
  }
  const searcherFIN = (e) => {
    const FechaModiFIN = moment(e.target.value).format('YYYY/MM/DD');
    setSearchFIN(FechaModiFIN)
    console.log(FechaModiFIN)
  }   





    //################# Configuracion de Tomm3 #################
    // FechaDeTermino

    // let filtrar = account.filter(n => n.date >  && n.date <)

    useEffect( () => { 
        const getUsers = async () => {
            const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
            const fecha = !search ? data : data.filter((dato)=> dato.FechaDeTermino >= search && dato.FechaDeTermino <= searchFIN)
            setUserList(fecha)
            const objListTomm3 = {};
            fecha.forEach((FechaDeTermino) => {
            if (!objListTomm3[FechaDeTermino.FechaDeTermino]) objListTomm3[FechaDeTermino.FechaDeTermino] = {
                ...FechaDeTermino,
                VolumenTon: 0,
                Masa: 0,
                cantidad: 0,
            };
            objListTomm3[FechaDeTermino.FechaDeTermino].cantidad += 0 ;
            objListTomm3[FechaDeTermino.FechaDeTermino].VolumenTon += FechaDeTermino.VolumenTon ;
            objListTomm3[FechaDeTermino.FechaDeTermino].Masa += FechaDeTermino.Masa;
            });

            const resultTomm3 = Object.keys(objListTomm3).map((key) => objListTomm3[key]);
            setResultTomm3(resultTomm3)
            const Fecha = ([...resultTomm3.map(i => i.FechaDeTermino)]);
            setCateton(Fecha)
            const Volumen = ([...resultTomm3.map((i) => i.Masa)]);
            setVolumenAcum(Volumen)
            const Ton = ([...resultTomm3.map((i) => i.VolumenTon)]);
            setTonAcum(Ton)

            //################# Configuracion de TablaClienprod ################# 

            const objListTablaCli = {};
            fecha.forEach((Producto) => {
            if (!objListTablaCli[Producto.Producto]) objListTablaCli[Producto.Producto] = { 
                ...Producto,
                Embarque: 0,
                VolumenTon: 0,
                Masa: 0,
                cantidad: 0,
            };
            objListTablaCli[Producto.Producto].cantidad += 0 ;
            objListTablaCli[Producto.Producto].Embarque += Producto.Embarque;
            objListTablaCli[Producto.Producto].VolumenTon += Producto.VolumenTon ;
            objListTablaCli[Producto.Producto].Masa += Producto.Masa;
            });
            const resultTablaCli = Object.keys(objListTablaCli).map((key) => objListTablaCli[key]);
                setResultTablaCli(resultTablaCli);

            //################# Configuracion de QDeEmbarquesmes y Transporte Total #################

            const objListQDEEM = {};
            fecha.forEach((Empresa) => {
            if (!objListQDEEM[Empresa.Empresa]) objListQDEEM[Empresa.Empresa] = { 
                ...Empresa,
                Embarque: 0,
                cantidad: 0,
            };
            objListQDEEM[Empresa.Empresa].cantidad += 0 ;
            objListQDEEM[Empresa.Empresa].Embarque += Empresa.Embarque;
            objListQDEEM[Empresa.Empresa].VolumenTon += Empresa.VolumenTon ;
            objListQDEEM[Empresa.Empresa].Masa += Empresa.Masa;
            });
            const resultQDEEM = Object.keys(objListQDEEM).map((key) => objListQDEEM[key]);
            setResultQDEEM(resultQDEEM)
            const Empresa = ([...resultQDEEM.map(i => i.Empresa)]);
            setEmpresa(Empresa)
            const Embarque = ([...resultQDEEM.map((i) => i.Embarque)])
            setEmbarque(Embarque)

            //################# Configuracion de Tipo de Producto #################

            const objListTipoPro = {};
            fecha.forEach((Producto) => {
                if (!objListTipoPro[Producto.Producto]) objListTipoPro[Producto.Producto] = { ...Producto, cantidad: 0};
                objListTipoPro[Producto.Producto].cantidad += 0 ;
                objListTipoPro[Producto.Producto].Embarque += Producto.Embarque;
                objListTipoPro[Producto.Producto].VolumenTon += Producto.VolumenTon;
                objListTipoPro[Producto.Producto].Masa += Producto.Masa;
            });
            const resultTipoPro = Object.keys(objListTipoPro).map((key) => objListTipoPro[key]);
            setResultTipoPro(resultTipoPro)
        }
        getUsers();
      }, [search, searchFIN]);

    //################# Configuracion de TablaClienprod ################# 
 
    const EmbarTablaCli = userList.map((i) => i.Embarque);
    const tonTablaCli = userList.map((i) => i.VolumenTon);
    const m3TablaCli = userList.map((i) => i.Masa); 
  
    let TotalEmbarque = EmbarTablaCli.reduce(
        (acc, r) => Number.parseInt(r) + acc, -EmbarTablaCli[0]);
        TotalEmbarque += Number.parseInt(EmbarTablaCli);  
    let TotalTonneladas = tonTablaCli.reduce(
        (acc, r) => Number.parseInt(r) + acc, -tonTablaCli[0]);
        TotalTonneladas += Number.parseInt(tonTablaCli);
    let TotalVolumen = m3TablaCli.reduce(
        (acc, r) => Number.parseInt(r) + acc, -m3TablaCli[0]);
        TotalVolumen += Number.parseInt(m3TablaCli);
        
    //################# Configuracion de QDeEmbarquesmes #################

    const TonTon = userList.map((i) => i.VolumenTon);
    const m3m3 = userList.map((i) => i.Masa);

    let M3M3 = m3m3.reduce(
        (acx, r) => Number.parseInt(r) + acx, -m3m3[0]);
        M3M3 += Number.parseInt(m3m3);
        M3M3 /= 10
      
    
    let totaltotal = TonTon.reduce(
        (acc, r) => Number.parseInt(r) + acc, -TonTon[0]);
        totaltotal += Number.parseInt(TonTon);
        totaltotal /= 10

    //################# Configuracion de Tipo de Producto #################

    const rem3TipoPro = resultTipoPro.map((i) => i.Masa);
    const retonTipoPro = resultTipoPro.map((i) => i.VolumenTon);

    const rem3QDEEM = resultQDEEM.map((i) => i.Masa);
    const retonQDEEM = resultQDEEM.map((i) => i.VolumenTon);

    return(
        <>
        <div ref={componentRef}>
            <Grid rowSpacing={4.5} columnSpacing={2.75}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
                    <Grid item xs={12}></Grid>
                        <Grid xs={0}></Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    id="date Inicio"
                                    type="date"
                                    label="Fecha Inicio"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={searcherINI}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    id="date Termino"
                                    type="date"
                                    label="Fecha Termino"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={searcherFIN}
                                />
                                </Paper>
                            </Grid>
                        <Grid xs={2}></Grid>
                    </Grid>
                </Grid>

            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard sx={{ mt: 4 }}>
                                    <Typography variant="h5" sx={{ mb: -10 }} > TON / M3 Acumulados </Typography>
                                    <Tomm3 cateTon={cateTon} TonAcum={TonAcum}  VolumenAcum={VolumenAcum} result={resultTomm3}/>
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
                                    <TablaClienprod result={resultTablaCli} TotalEmbarque={TotalEmbarque} TotalTonneladas={TotalTonneladas} TotalVolumen={TotalVolumen} />
                            </MainCard>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ mt: 1 }} >
                        <Paper elevation={10}>
                            <MainCard>
                                <Typography variant="h5" sx={{ mb: 0 }} > Q de Embarques </Typography>
                                <QDeEmbarquesmes Empresa={Empresa} Embarque={Embarque} />
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12} sx={{ mt: -2 }}>
                    <Paper elevation={10}>
                        <MainCard  sx={{ mt: -20 }}>
                            <TablaTranssum  M3M3={M3M3} totaltotal={totaltotal} />
                        </MainCard>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={4} md={6} sm={6} xs={15} sx={{ mt: 0 }}>
                        <Paper elevation={10}>
                            <MainCard>
                                    <Typography variant="h5"sx={{ mb: 5 }} > Transporte Total </Typography>
                                    <TablaProducemb result={resultQDEEM} />
                            </MainCard>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ mt: 0 }} >
                        <Paper elevation={10}>
                            <MainCard >
                                <Typography variant="h5" sx={{ mb: -10 }} > Tipo de Productos </Typography>
                                <TipoDeproductos result={resultTipoPro}  retonTipoPro={retonTipoPro} rem3TipoPro={rem3TipoPro} />
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} >
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Paper elevation={10}>
                            <MainCard sx={{ mt: 4 }}>
                                <Typography variant="h5" sx={{ mb: -10 }} > Segmentacion Cliente / Producto </Typography>
                                <SegmentacionClienteproducto result={resultQDEEM} rem3QDEEM={rem3QDEEM} retonQDEEM={retonQDEEM} />
                            </MainCard>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        {/* <ReactToPrint
        trigger={() => ( 
        <Button 
        sx={{mt: 5 ,right: (theme) => theme.spacing(14), position: "absolute", }} 
        container 
        variant="outlined" 
        size="large" 
        startIcon={<PictureAsPdfIcon/>}>
          Exportar PDF
        </Button>
        )}
        content={() => componentRef.current}
        severity="success"
        /> */}
    </>
    )
}

export default Dashboard;