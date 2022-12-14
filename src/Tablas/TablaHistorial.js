import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../misc/consts";
import { DataGrid,
  esES,
} from '@mui/x-data-grid';
import {Grid,Paper,TextField} from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';


const TablaHistorial = () => {
  
  const [ products, setProducts] = useState([]);
  const [ search, setSearch ] = useState("")
  const [ searchFIN, setSearchFIN ] = useState("")
  const [ Nombre, setNombre] = useState("")
  const [ Rut, setRut] = useState("")
  const [ Modulo, setModulo] = useState("")


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
  
  const FilNombre = (e) => {
    setNombre(e.target.value)   
  }

  const FilRut = (e) => {
    setRut(e.target.value)   
  }
  
  const FilModulo = (e) => {
    setModulo(e.target.value)   
  }
  
useEffect( () => { 
  const getUsers = async () => {
    const {data} = await axios.get(`${BASE_URL}/TablaHistorial`)
    const fecha = !search ? data : data.filter((dato)=> dato.FechaTerminoEntrega >= search && dato.FechaTerminoEntrega <= searchFIN)
    const BUSNombre = !Nombre ? fecha : fecha.filter((dato)=> dato.Nombre.toLowerCase().includes(Nombre.toLocaleLowerCase()))
    const BUSRut = !Rut ? BUSNombre : BUSNombre.filter((dato)=> dato.Rut.toLowerCase().includes(Rut.toLocaleLowerCase()))
    const BUSModulo = !Modulo ? BUSRut : BUSRut.filter((dato)=> dato.Modulo.toLowerCase().includes(Modulo.toLocaleLowerCase()))
    setProducts(BUSModulo)
  }
  getUsers();
}, [Nombre,Rut,Modulo,search,searchFIN]);



const resumen = [
  {
    field: 'id',
    headerName: 'id',
    width: 200,
  },
  {
    field: 'Fecha',
    headerName: 'Fecha',
    type: 'date',
    width: 200,
  },
  {
    field: 'Nombre',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'Rut',
    headerName: 'Rut',
    width: 200,
  },
  {
      field: 'CambioRealizado',
      headerName: 'CambioRealizado',
      width: 200,
    },
  {
    field: 'Modulo',
    headerName: 'Módulo',
    width: 150,
  },
];


    return(
      <>
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
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={Nombre}
                                    type="text" 
                                    label="Nombre"
                                    placeholder="Nombre"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilNombre}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={Rut}
                                    type="text" 
                                    label="Rut"
                                    placeholder="Rut"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilRut}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={Modulo}
                                    type="text" 
                                    label="Módulo"
                                    placeholder="Módulo"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilModulo}
                                />
                                </Paper>
                            </Grid>
                    <Grid xs={2}></Grid>
                </Grid>
                <Grid item xs={0.1}></Grid>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Box sx={{ height: 680, width: '100%' }}>
                            <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={products}
                                    columns={resumen}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

      </>
  );
}


export default TablaHistorial;

/*

                <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Box sx={{ height: 680, width: '100%' }}>
                                <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={userList}
                                    columns={columns}
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{
                                        LoadingOverlay: LinearProgress}}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
              </Grid>
*/