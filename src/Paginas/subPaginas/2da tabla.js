import {useRef, useState, useEffect} from "react";
import axios from "axios";
import {Grid,Paper,Button,TextField, Typography, TableCell} from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,
    gridClasses,
    esES,
    GridToolbarContainer, 
    GridToolbarExport,
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
import * as XLSX from 'xlsx';


const TableAxios = () => {
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
const [ fechaIni, setfechaIni ] = useState(moment().subtract(7, 'days').format('YYYY-MM-DD'));
const [ fechaFin, setfechaFin ] = useState(moment().format('YYYY-MM-DD'));

const searcherINI = (e) => {
  setfechaIni(moment(e.target.value).format('YYYY-MM-DD'));
  setSearch(moment(e.target.value).format('YYYY/MM/DD'));
  setSearchFIN(moment().format('YYYY/MM/DD'))
  
}
const searcherFIN = (e) => {
  setfechaFin(moment(e.target.value).format('YYYY-MM-DD'));
  setSearchFIN(moment(e.target.value).format('YYYY/MM/DD'));
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
const Clear = () => {
  setfechaIni(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  setSearch(moment().subtract(7, 'days').format('YYYY/MM/DD'));
  setfechaFin(moment().format('YYYY-MM-DD'));
  setSearchFIN(moment().format('YYYY/MM/DD'));
  setBuscadorProducto("");
  setBuscadorEmpresa("");
  setBuscadorFolio("");
}

useEffect( ()=>{  
  const limpiar = async () => {  
    Clear()
}
limpiar()
}, [])

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
        <Grid xs="auto">???</Grid>
        <Grid xs={7.3}>
        <QuickSearchToolbar /> 
        </Grid>
        <Grid xs="auto">
        <GridToolbarColumnsButton />
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
          onClick={handleOnExportListado}
          >
          Exportar excel
          </Button>
        </Grid>
      </GridToolbarContainer>
    );
  }

  function CustomToolbarResumen() {
    return (
      <GridToolbarContainer>
        <Grid xs="auto">???</Grid>
        <Grid xs="auto">
        <ReactToPrint
          trigger={() => ( 
            <Button 
            sx={{height: 40, width: 200 }}
            variant="outlined" 
            startIcon={<PictureAsPdfIcon/>}>
              Exportar PDF
            </Button>
          )}
          content={() => componentRef.current}
          documenTitle="ResumenDeB??squeda"
          pageStyle="print"
          severity="success"
          />
        </Grid>
        <Grid xs="auto">???</Grid>
        <Grid xs="auto">
        <Button 
          sx={{height: 40, width: 200 }}
          variant="outlined" 
          startIcon={<PictureAsPdfIcon/>}
          onClick={handleOnExportResumen}
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
            const BUsFolio = !BuscadorFolio ? BUSProducto : BUSProducto.filter((dato)=> String(dato.Medidor).toLowerCase().includes(String(BuscadorFolio.toLocaleLowerCase())));
            // const BUsFolio = !BuscadorFolio ? BUSProducto : BUSProducto.filter((dato)=> Number.parseFloat(dato.EmbarqueNumero) === Number.parseFloat(BuscadorFolio));
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
}, [search,searchFIN,BuscadorEmpresa,BuscadorProducto,BuscadorFolio,openEdit])



const Embar = products.map((i) => i.Embarque);
  let TotalEmbarque = Embar.reduce(
    (acc, r) => Number.parseFloat(r) + acc, -Embar[0]);
    TotalEmbarque += Number.parseFloat(Embar);

const MasaTon = products.map((i) => i.MasaTon);
  let TotalMasaTon = MasaTon.reduce(
    (acc, r) => Number.parseFloat(r) + acc, -MasaTon[0]);
    TotalMasaTon += Number.parseFloat(MasaTon);

const VoluM3 = products.map((i) => i.VolumenM3);
  let TotalVoluM3 = VoluM3.reduce(
    (acc, r) => Number.parseFloat(r) + acc, -VoluM3[0]);
    TotalVoluM3 += Number.parseFloat(VoluM3);
    TotalVoluM3 = TotalVoluM3.toFixed(2);
  
  const columns = [
    {
      field: 'FechaTerminoEntrega',
      headerName: 'Fecha termino entrega',
      type: 'date',
      width: 200,
    },
    {
      field: 'EmbarqueNumero',
      headerName: 'Embarque n??mero',
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
      headerName: 'Empresa',
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
        getActions: (row) => [
          <Fab color="primary" 
          onClick={() => {setOpenEdit(true);setSelectedUser(row.row);}}
          aria-label="Edit" 
          size="small"
          >
          <EditIcon />
          </Fab>,
          <Fab
          color="primary" 
          aria-label="Descargar" 
          size="small">
          <DocuPDF
          user={selectedUser}
          />
          </Fab>,
      ],
    },
  ];
  
  const resumen = [
    {
      field: 'FechaTerminoEntrega',
      headerName: 'Fecha termino entrega',
      type: 'date',
      width: 200,
    },
    {
      field: 'Medidor',
      headerName: 'Medidor',
      width: 150,
    },
    {
      field: 'Empresa',
      headerName: 'Empresa',
      width: 150,
      editable: true,
    },
    {
      field: 'Producto',
      headerName: 'Producto',
      width: 150,
    },
    {
      field: 'MasaTon',
      headerName: 'Masa TON',
      width: 120,
    },
    {
      field: 'VolumenM3',
      headerName: 'Volumen M3',
      width: 120,
    },
    {
      field: 'Embarque',
      headerName: 'Cantidad de Embarque',
      width: 170,
    },
  ];

  const handleOnExportResumen = () => {
    
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(products);
    for (let i = 0; i <= products.length+1; i++) {
      delete (ws[`C${i}`])
    }
    XLSX.utils.book_append_sheet(wb, ws, "Resumen de B??squeda");
    XLSX.writeFile(wb, "Resumen de B??squeda.xlsx");
    console.log([ws])
  }

  const handleOnExportListado = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(products);
    for (let i = 0; i <= products.length+1; i++) {
      delete (ws[`I${i}`])
    }
    XLSX.utils.book_append_sheet(wb, ws, "Listado de Reportes");
    XLSX.writeFile(wb, "Listado de Reportes.xlsx");
    console.log([ws])
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
                                    value={fechaIni}
                                    type="date"
                                    label="Fecha Inicio"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                    shrink: true
                                    }}
                                    onChange={(searcherINI)}
                                />
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper elevation={24}>
                                <TextField
                                    value={fechaFin}
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
                                    value={BuscadorFolio}
                                    type="text"
                                    label="Buscador Medidor" 
                                    placeholder="Buscador Medidor"
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
                                  onClick={Clear}
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
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper ref={componentRef} style={{width: "100%"}} elevation={24}>
                            <Typography align="center" variant="h3">Resumen de B??squeda</Typography>
                            <Box  sx={{ height: 635, width: '100%' }}> 
                            <DataGrid
                                    //Traspasarlo a espa??ol sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={products}
                                    pinnedRows={products.pinnedRows}
                                    columns={resumen}
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{
                                      Toolbar: CustomToolbarResumen}}
                                    
                                />
                                </Box>
                                <Typography align="center" variant="h5">Total Resumen de B??squeda</Typography>
                                <Box sx={{ height: 55, width: '100%' }}>
                                <TableCell sx={{height: 70, width: 170,fontWeight: 'bold'  }} align="left"> Inicio??? ??? {fechaIni}</TableCell>
                                <TableCell sx={{height: 70, width: 110,fontWeight: 'bold'  }} align="left">Medidor Total</TableCell>
                                <TableCell sx={{height: 70, width: 110,fontWeight: 'bold'  }} align="left">Empresa Total</TableCell>
                                <TableCell sx={{height: 70, width: 120,fontWeight: 'bold'  }} align="left">Producto Total</TableCell>
                                <TableCell sx={{height: 70, width: 80,fontWeight: 'bold'}} align="left">Masa Total</TableCell>
                                <TableCell sx={{height: 70, width: 100,fontWeight: 'bold' }} align="left">Volumen Total</TableCell>
                                <TableCell sx={{height: 70, width: 200,fontWeight: 'bold'  }} align="left">Embarque Total</TableCell>
                                </Box>
                                <Box sx={{ mt:-4, height: 44, width: '100%' }}>
                                <TableCell sx={{height: 70, width: 170,fontWeight: 'bold'  }} align="left">Termino ???{fechaFin}</TableCell>
                                <TableCell sx={{height: 70, width: 110 }} align="left">{Medidorr.length}</TableCell>
                                <TableCell sx={{height: 70, width: 110 }} align="left">{Empresa.length}</TableCell>
                                <TableCell sx={{height: 70, width: 120 }} align="left">{Producto.length}</TableCell>
                                <TableCell sx={{height: 70, width: 80 }} align="left">{TotalMasaTon}</TableCell>
                                <TableCell sx={{height: 70, width: 100 }} align="left">{TotalVoluM3}</TableCell>
                                <TableCell sx={{height: 70, width: 70 }} align="left">{TotalEmbarque}</TableCell>
                                </Box>
                        </Paper>
                    </Grid>
            <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 10 }}>
              <Paper elevation={24}>
                <Typography align="center" variant="h3">Listado de Reportes</Typography>
                <Box sx={{ height: 635, width: '100%' }}>
                <DataGrid
                  //Traspasarlo a espa??ol sus componentes DataGrid
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                  rows={products}
                  columns={columns}
                  disableSelectionOnClick
                  rowsPerPageOptions={[5,10,20,50,100]}
                  experimentalFeatures={{ newEditingApi: true }}
                  onClick={() => {setOpenEdit(true);setSelectedUser(products);}}
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

