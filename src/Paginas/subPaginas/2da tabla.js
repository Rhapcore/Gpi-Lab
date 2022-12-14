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

import { styled } from '@mui/material/styles';
// import XLSX from "xlsx";
import * as XLSX from 'xlsx';


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

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: "auto",
  color: theme.palette.text.primary,
}));
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
        <Grid xs={0}>
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
          sx={{height: 40, width: 200 }}
          variant="outlined" 
          startIcon={<PictureAsPdfIcon/>}
          onClick={handleOnExport}
          >
          Exportar excel
          </Button>
        </Grid>
      </GridToolbarContainer>
    );
  }

useEffect( ()=>{
    const getData = async () => {  
            await axios.get(`${BASE_URL}/MostrarCliente`).then((response) => {
            const data = response.data    
            const fecha = !search ? data : data.filter((dato)=> dato.FechaTerminoEntrega >= search && dato.FechaTerminoEntrega <= searchFIN);
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
            objListQDEEM[Empresa.Empresa].VolumenM3 += Empresa.VolumenM3 ;
            objListQDEEM[Empresa.Empresa].Producto += Empresa.Producto + 1 ;
            objListQDEEM[Empresa.Empresa].MasaTon += Empresa.MasaTon;
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

const MasaTona = products.map((i) => i.MasaTon);
  let TotalMasaTona = MasaTona.reduce(
    (acc, r) => Number.parseInt(r) + acc, -MasaTona[0]);
    TotalMasaTona += Number.parseInt(MasaTona);

const MasaTon = products.map((i) => i.VolumenM3);
  let TotalMasaTon = MasaTon.reduce(
    (acc, r) => Number.parseInt(r) + acc, -MasaTon[0]);
    TotalMasaTon += Number.parseInt(MasaTon);
  
  const columns = [
    {
      field: 'FechaTerminoEntrega',
      headerName: 'Fecha termino entrega',
      type: 'date',
      width: 200,
    },
    {
      field: 'EmbarqueNumero',
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
      field: 'MasaTon',
      headerName: 'Masa TON',
      width: 150,
    },
    {
      field: 'VolumenM3',
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
      width: 150,
    },
    {
      field: 'Medidor',
      headerName: 'Medidor',
      width: 150,
      editable: true,
    },
    {
      field: 'Producto',
      headerName: 'Producto',
      width: 150,
    },
    {
        field: 'Embarque',
        headerName: 'Embarque',
        width: 100,
      },
    {
      field: 'MasaTon',
      headerName: 'Masa TON',
      width: 110,
    },
    {
      field: 'VolumenM3',
      headerName: 'Volumen M3',
      width: 100,
    },
  ];

  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(products);
    XLSX.utils.book_append_sheet(wb, ws, "Listado de Reportes");
    XLSX.writeFile(wb, "Listado de Reportes.xlsx");
  }
  

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
                                    label="Buscador Embarque"
                                    placeholder="Buscador Embarque"
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
                                    label="Buscador Producto"
                                    placeholder="Buscador Producto"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={FilProductos}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                  <Button
                                  >
                                    Limpiar Filtro
                                  </Button>
                                </Paper>
                            </Grid>
                            <Grid xs={0.7}></Grid>
                            <Grid sx={{ mt: 2 }}> 
                            </Grid>
                    <Grid xs={2}></Grid>
                </Grid>
            </Grid>
            <div ref={componentRef} style={{width: "100%"}}> 
            <Grid  item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                        <StyledPaper
                          >
                            <Typography align="center" variant="h3">Resumen de Búsqueda</Typography>
                            <Grid container item >
                            <Grid xs={10.5}>
                            </Grid>
                            <Grid xs="auto">
                            </Grid>
                            <Grid xs="auto">
                            <ReactToPrint
                              trigger={() => ( 
                                <Button 
                                sx={{height: 40, width: 180, mt: -10}}
                                variant="outlined" 
                                startIcon={<PictureAsPdfIcon/>}>
                                  Exportar PDF
                                </Button>
                              )}
                              content={() => componentRef.current}
                              documenTitle="ResumenDeBúsqueda"
                              pageStyle="print"
                              severity="success"
                              />
                              </Grid>
                              </Grid>
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
                                        }}
                                />
                            <Box sx={{ mt: -8, height: 55, width: '100%' }}>
                            <TableCell sx={{height: 70, width: 110 }} variant="button" display="block" align="left">Empresa</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">Medidor</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">Producto</TableCell>
                            <TableCell sx={{height: 70, width: 40 }} align="left">Embarque</TableCell>
                            <TableCell sx={{height: 70, width: 80 }} align="left">Suma Masa</TableCell>
                            <TableCell sx={{height: 70, width: 100 }} align="left">Suma Volumen</TableCell>
                            </Box>
                            <Box sx={{ mt:-4, height: 44, width: '100%' }}>
                            <TableCell sx={{height: 70, width: 110 }} align="left">{Empresa.length}</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">{Medidorr.length}</TableCell>
                            <TableCell sx={{height: 70, width: 120 }} align="left">{Producto.length}</TableCell>
                            <TableCell sx={{height: 70, width: 65 }} align="left">{TotalEmbarque}</TableCell>
                            <TableCell sx={{height: 70, width: 80 }} align="left">{TotalMasaTon}</TableCell>
                            <TableCell sx={{height: 70, width: 100 }} align="left">{TotalMasaTon}</TableCell>
                            </Box>
                            </Box>
                            </StyledPaper>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            </div>
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

