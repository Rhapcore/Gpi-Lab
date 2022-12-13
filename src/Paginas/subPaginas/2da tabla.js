import {useRef, useState, useEffect, Component } from "react";
import axios from "axios";
import {Grid,Paper,Button,TextField, Typography, TableCell} from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,
    gridClasses,
    esES,
    GridToolbarContainer, 
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton, 
    GridToolbarQuickFilter
} from '@mui/x-data-grid';

import LinearProgress from '@mui/material/LinearProgress';
import Fab from '@mui/material/Fab';
import DocuPDF from "../../docuPDF/DocuPDF";
import EditarTablaEmbarque2da from "../../Editar/EditarTablaEmbarque2da";
import EditIcon from '@mui/icons-material/Edit';
import { grey } from "@mui/material/colors";
import { BASE_URL } from "../../misc/consts";

import ReactToPrint from 'react-to-print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';


const TableAxios = () => {
//1 - configuramos Los hooks
const [products, setProducts] = useState([]);
const [openEdit, setOpenEdit] = useState(false);
const [selectedUser, setSelectedUser] = useState([]);
const componentRef = useRef();
const [ Empresa, setEmpresa] = useState([]);
const [ search, setSearch ] = useState("");
const [ searchFIN, setSearchFIN ] = useState("");
const [ BuscadorEmpresa, setBuscadorEmpresa] = useState("");
const [ BuscadorFolio, setBuscadorFolio] = useState("");
const [ Medidorr, setMedidorr] = useState("");
const [ BuscadorProducto, setBuscadorProducto] = useState("");
const [ Producto, setProducto] = useState([]);



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
const FilProductos = (e) => {
  setBuscadorProducto(e.target.value)   
}
const FilEmpresa = (e) => {
  setBuscadorEmpresa(e.target.value)   
}
const FilFolio = (e) => {
  setBuscadorFolio(e.target.value)   
}



class App extends Component{
    constructor (props) {
        super (props);
        this.state = {
            fileName: "",
            fileContent: ""
        };
    }


handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        this.setState ({fileName: file.Name, fileContent: reader.result})
        console.log(reader)
    }
    reader.onerror = () => {
        console.log("No Coresponde", reader.error)
    }
}
}


const [filterModel, setFilterModel] = React.useState({
    items: [
      { field: 'athlete', filter: 'agMultiColumnFilter' },
    ],
  });

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 1,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }


function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Grid xs={0.1}>
        </Grid>
        <Grid xs={7.7}>
        <QuickSearchToolbar /> 
        </Grid>
        <Grid xs="auto">
        <GridToolbarColumnsButton />
        </Grid>
        <Grid xs="auto">
        <GridToolbarDensitySelector />
        </Grid>
        <Grid xs="auto">
        <GridToolbarExport 
            csvOptions={{
                fileName: 'Exportacion CSV',
                delimiter: ';',
                utf8WithBom: true,
            }}/>
        </Grid>
        <Grid xs="auto">
        <Button 
          sx={{height: 40, width: 180 }}
          variant="outlined" 
          startIcon={<PictureAsPdfIcon/>}>
          Excel Pendiente
          </Button>
        </Grid>
      </GridToolbarContainer>
    );
  }

/*
  function CustomToolbar1() {
    return (
      <GridToolbarContainer>
        <Grid xs={3}>
        </Grid>
        <Grid xs={2}>
        </Grid>
        <Grid xs={2}>
        </Grid>
        <Grid xs={1}>
        </Grid>
        <Grid xs={1}>
        </Grid>
        <Grid xs={2}>
        </Grid>
        <Grid xs={1}>
        <ReactToPrint
                        trigger={() => ( 
                        <Button 
                        sx={{height: 40, width: 180 }}
                        variant="outlined" 
                        startIcon={<PictureAsPdfIcon/>}>
                          Exportar PDF
                        </Button>
                        )}
                        content={() => componentRef.current}
                        severity="success"
                    />
                    </Grid>
      </GridToolbarContainer>
    );
  }
*/
useEffect( ()=>{
    const getData = async () => {  
            await axios.get(`${BASE_URL}/MostrarCliente`).then((response) => {
            const data = response.data    
            const fecha = !search ? data : data.filter((dato)=> dato.FechaDeTermino >= search && dato.FechaDeTermino <= searchFIN);
            const BUSEmpresas = !BuscadorEmpresa ? fecha : fecha.filter((dato)=> dato.Empresa.toLowerCase().includes(BuscadorEmpresa.toLocaleLowerCase()));
            const BUSProducto = !BuscadorProducto ? BUSEmpresas : BUSEmpresas.filter((dato)=> dato.Producto.toLowerCase().includes(BuscadorProducto.toLocaleLowerCase()));
            const BUsFolio = !BuscadorFolio ? BUSProducto : BUSProducto.filter((dato)=> dato.Folio.includes(BuscadorFolio.toLocaleLowerCase()));
            setProducts(BUsFolio)
            const objListQDEEM = {};
            BUsFolio.forEach((Empresa) => {
            if (!objListQDEEM[Empresa.Empresa]) objListQDEEM[Empresa.Empresa] = { 
                ...Empresa,
                cantidad: 0,
            };
            objListQDEEM[Empresa.Empresa].cantidad += 1 ;
            objListQDEEM[Empresa.Empresa].VolumenTon += Empresa.VolumenTon ;
            objListQDEEM[Empresa.Empresa].Producto += Empresa.Producto + 1 ;
            objListQDEEM[Empresa.Empresa].Masa += Empresa.Masa;
            });
            const resultQDEEM = Object.keys(objListQDEEM).map((key) => objListQDEEM[key]);
            const Empresa = ([...resultQDEEM.map(i => i.Empresa)]);
            setEmpresa(Empresa)
            const Producto = ([...resultQDEEM.map((i) => i.Producto)])
            setProducto(...Producto)

            //################# Configuracion de Tipo de Producto #################

            const objMedidor = {};
            BUsFolio.forEach((Medidor) => {
            if (!objMedidor[Medidor.Medidor]) objMedidor[Medidor.Medidor] = { 
                ...Medidor,
            };
            objMedidor[Medidor.Medidor].cantidad += 0 ;
            });
            const resultMedidor = Object.keys(objMedidor).map((key) => objMedidor[key]);
            const Medidorr = ([...resultMedidor.map(i => i.Medidor)]);
            setMedidorr(Medidorr)

            //################# Configuracion de Tipo de Producto #################

            const objProducto = {};
            BUsFolio.forEach((Producto) => {
            if (!objProducto[Producto.Producto]) objProducto[Producto.Producto] = { 
                ...Producto,
            };
            objProducto[Producto.Producto].cantidad += 0 ;
            });
            const resultProducto = Object.keys(objProducto).map((key) => objProducto[key]);
            const Productoo = ([...resultProducto.map(i => i.Producto)]);
            setProducto(Productoo)



            

            
        })
    }
    getData()
}, [search,searchFIN,BuscadorFolio,BuscadorEmpresa,BuscadorProducto])




const Embar = products.map((i) => i.Embarque);
  let TotalEmbarque = Embar.reduce(
    (acc, r) => Number.parseInt(r) + acc, -Embar[0]);
    TotalEmbarque += Number.parseInt(Embar);

const Masaa = products.map((i) => i.Masa);
  let TotalMasaa = Masaa.reduce(
    (acc, r) => Number.parseInt(r) + acc, -Masaa[0]);
    TotalMasaa += Number.parseInt(Masaa);

const MasaTON = products.map((i) => i.VolumenTon);
  let TotalMasaTON = MasaTON.reduce(
    (acc, r) => Number.parseInt(r) + acc, -MasaTON[0]);
    TotalMasaTON += Number.parseInt(MasaTON);
  
  const columns = [
    {
      field: 'FechaDeTermino',
      headerName: 'Fecha termino entrega',
      type: 'date',
      width: 200,
    },
    {
      field: 'Folio',
      headerName: 'Embarque número',
      width: 200,
    },
    {
      field: 'Medidor',
      headerName: 'Medidor',
      width: 200,
      editable: true,
    },
    {
      field: 'Empresa',
      headerName: 'Nombre Entrega',
      width: 200,
      editable: true,
    },
    {
      field: 'Producto',
      headerName: 'Producto',
      width: 200,
      editable: true,
    },
    {
      field: 'Masa',
      headerName: 'Masa TON',
      width: 150,
    },
    {
      field: 'VolumenTon',
      headerName: 'Volumen M3',
      width: 150,
    },
    {
        field: 'Acciones',
        headerName: 'Acciones',
        type: 'actions',
        width: 150,
        getActions: () => [
            <Fab 
            color="primary" 
            aria-label="Editar" 
            size="small"
            onClick={() => {setOpenEdit(true);setSelectedUser(products);}}
            ><EditIcon/>
            </Fab>,
            <Fab
            color="primary" 
            aria-label="Descargar" 
            size="small">
            <DocuPDF/>
            </Fab>,
        ],
    },
    
  ];

  const resumen = [
    {
      field: 'Empresa',
      headerName: 'Empresa',
      width: 200,
    },
    {
      field: 'Medidor',
      headerName: 'Medidor',
      width: 200,
      editable: true,
    },
    {
      field: 'Producto',
      headerName: 'Producto',
      width: 200,
    },
    {
        field: 'Embarque',
        headerName: 'Embarque',
        width: 200,
      },
    {
      field: 'Masa',
      headerName: 'Masa TON',
      width: 150,
    },
    {
      field: 'VolumenTon',
      headerName: 'Volumen M3',
      width: 150,
    },
  ];

  //<EditarTablaEmbarque/>
//4 - renderizamos la datatable

        return (
            <>
            
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
                            
                            <Grid item >
                            <Paper elevation={24}>
                              <TextField
                                    value={BuscadorFolio}
                                    label="Embarque"
                                    placeholder="Embarque"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilFolio}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={BuscadorEmpresa}
                                    type="text" 
                                    label="Buscador Empresa"
                                    placeholder="Buscador Empresa"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilEmpresa}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={BuscadorProducto}
                                    type="text" 
                                    label="Nombre Producto"
                                    placeholder="Nombre Producto***"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilProductos}
                                />
                                </Paper>
                            </Grid>
                            <Grid xs={0.7}></Grid>
                            <Grid sx={{ mt: 2 }}> 
                            </Grid>
                    <Grid xs={2}></Grid>
                </Grid>
            </Grid>
            <div  ref={componentRef}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Typography align="center" variant="h3">Resumen de Busqueda</Typography>
                            <ReactToPrint
                              
                              trigger={() => ( 
                                <Button 
                                sx={{height: 40, width: 180, mt: -10, left: 1300}}
                                variant="outlined" 
                                startIcon={<PictureAsPdfIcon/>}>
                                  Exportar PDF
                                </Button>
                              )}
                              content={() => componentRef.current}
                              severity="success"
                              />
                            <p/>
                            <Box sx={{ height: 635, width: '100%' }}>
                            <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={products}
                                    pinnedRows={products.pinnedRows}
                                    columns={resumen}
                                    filterModel={filterModel}
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{
                                        LoadingOverlay: LinearProgress,
                                        }}loading
                                />
                                
                            </Box>
                            <Box sx={{ mt:-8, height: 55, width: '100%' }}>
                            <TableCell sx={{height: 70, width: 160 }} variant="button" display="block" align="left">Empresa</TableCell>
                            <TableCell sx={{height: 70, width: 170 }} align="left">Medidor</TableCell>
                            <TableCell sx={{height: 70, width: 165 }} align="left">Producto</TableCell>
                            <TableCell sx={{height: 70, width: 170 }} align="left">Embarque</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">Suma Masa</TableCell>
                            <TableCell sx={{height: 70, width: 150 }} align="left">Suma Volumen</TableCell>
                            </Box>
                            <Box sx={{ mt:-4, height: 55, width: '100%' }}>
                            <TableCell sx={{height: 70, width: 160 }} align="left">{Empresa.length}</TableCell>
                            <TableCell sx={{height: 70, width: 170 }} align="left">{Medidorr.length}</TableCell>
                            <TableCell sx={{height: 70, width: 165 }} align="left">{Producto.length}</TableCell>
                            <TableCell sx={{height: 70, width: 170 }} align="left">{TotalEmbarque}</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">{TotalMasaa}</TableCell>
                            <TableCell sx={{height: 70, width: 150 }} align="left">{TotalMasaTON}</TableCell>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            
          </div>
            
        
        <Grid item sx={{ mt: 10 }}></Grid>
        <Grid xs={12} columnSpacing={2.75} >

            <Grid item xs={0.1}></Grid>
        <Grid item xs={12}>
                <Grid container>
                <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Typography align="center" variant="h3">Listado de Reportes</Typography>
                            <p/>
                            <Box sx={{ height: 635, width: '100%' }}>
                            <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    filterModel={filterModel}
                                    onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                                    rows={products}
                                    columns={columns}
                                    disableSelectionOnClick
                                    rowsPerPageOptions={[5,10,20,50,100]}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{
                                        LoadingOverlay: LinearProgress,
                                        Toolbar: CustomToolbar}}
                                        loading
                                    getRowSpacing={(params) => ({
                                        top: params.isFirstVisible ? 0 : 5,
                                        bottom: params.isLastVisible ? 0 : 5
                                      })}
                                    sx={{
                                        [`& .${gridClasses.row}`]: {
                                          bgcolor: (theme) =>
                                            theme.palette.mode === 'light' ? grey[200] : grey[800],
                                        },
                                      }}
                                    componentsProps={{
                                        filterPanel: {
                                            columnsSort: 'asc',
                                            filterFormProps: {
                                            // Customize inputs by passing props
                                            linkOperatorInputProps: {
                                                variant: 'outlined',
                                                size: 'small',
                                            },
                                            valueInputProps: {
                                                InputComponentProps: {
                                                  variant: 'outlined',
                                                  size: 'small',
                                                },
                                              },
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
              </Grid>
          </Grid>

          
          {/* <Button variant="text" size="large"  startIcon={
          <ReactToPrint
                content={() => componentRef.current}
                severity="success"
            />}> Proximamente</Button> */}

            <EditarTablaEmbarque2da 
                  className="bi bi-pencil-fill"
                  open={openEdit}
                  setOpen={setOpenEdit}
                  user={selectedUser}
                  />
            </>
        )
}

export default TableAxios;


/*
<Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={24}>
                    <AnalyticEcommerce center count="Resumen de la Tabla" />
                    </Paper>
                </Grid>
              <Grid xs={3}></Grid>
            </Grid>
        </Grid>
       

        <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
            <Grid item xs={12}></Grid>
              <Grid xs={1.9}></Grid>
                <Grid item xs={4}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce xs={12} sm={6} md={4} lg={3} cliente="Fecha de Inicio =" extra={search} />
                    </Paper>
                </Grid>
                <Grid item xs={4} >
                    <Paper elevation={24}>
                        <AnalyticEcommerce cliente="Fecha de Termino = " extra={searchFIN} />
                    </Paper>
                </Grid>
              <Grid xs={2}></Grid>
            </Grid>
        </Grid>


 <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidor Numero" count="Lipigas" cliente="Cliente =" extra="5" />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Nombre Cliente" count={Empresa} cliente="Producto =" extra={Producto} />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>

                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Embarques" count={TotalEmbarque}  cliente="T Masa =" extra={TotalMasaa}   />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidos" count="Lipigas"  cliente="T Volumen =" extra={TotalMasaTON}   />
                    </Paper>
                </Grid>   

                */




