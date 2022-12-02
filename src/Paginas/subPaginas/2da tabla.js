import {useRef, useState, useEffect, Component } from "react";
import axios from "axios";
import {Grid,Typography,Paper,Button,TextField} from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,
    gridClasses,
    esES,
    GridToolbarContainer, 
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarColumnsButton, 
    GridToolbarQuickFilter
} from '@mui/x-data-grid';

import LinearProgress from '@mui/material/LinearProgress';
import Fab from '@mui/material/Fab';
import DocuPDF from "../../docuPDF/DocuPDF";
import EditarTablaEmbarque2da from "../../Editar/EditarTablaEmbarque2da";
import EditIcon from '@mui/icons-material/Edit';
import AnalyticEcommerce from "../../Alertas/AnalyticEcommerce";
import { grey } from "@mui/material/colors";
import { BASE_URL } from "../../misc/consts";
import ReactXlsxExport from "react-xlsx-export"

import ReactToPrint from 'react-to-print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const TableAxios = () => {
//1 - configuramos Los hooks
const [products, setProducts] = useState([]);
const [openEdit, setOpenEdit] = useState(false);
const [selectedUser, setSelectedUser] = useState([]);
const componentRef = useRef();

const [FechaInicio, setFechaInicio] = useState(new Date());
const [FechaTermino, setFechaTermino] = useState(new Date());


const handleChangeInicio = () => {
  setFechaInicio(FechaInicio);
};

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
        <Grid xs={5}>
        <GridToolbarFilterButton />
        </Grid>
        <Grid xs={2}>
        <QuickSearchToolbar />  
        </Grid>
        <Grid xs={1}>
        <GridToolbarColumnsButton />
        </Grid>
        <Grid xs={1}>
        <GridToolbarDensitySelector />
        </Grid>
        <Grid xs={1}>
        <GridToolbarExport 
            csvOptions={{
                fileName: 'Exportacion CSV',
                delimiter: ';',
                utf8WithBom: true,
            }}/>
        </Grid>
        <Grid xs={1}>
        <ReactXlsxExport data={products} filename="TransferView" />
        </Grid>
      </GridToolbarContainer>
    );
  }
  


useEffect( ()=>{
    const getData = async () => {
        await axios.get(`${BASE_URL}/MostrarCliente`).then((response) => {
            const data = response.data
            console.log(data)
            setProducts(data)
        })
    }
    getData()
}, [])


  const columns = [
    {
      field: 'FechaDeTermino',
      headerName: 'F. Transferencia',
      type: 'date',
      width: 200,
    },
    {
      field: 'Folio',
      headerName: 'FOLIO',
      width: 200,
    },
    {
      field: 'Empresa',
      headerName: 'Empresa',
      width: 200,
      editable: true,
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
console.log(FechaInicio)
        return (
            <><Grid rowSpacing={4.5} columnSpacing={2.75}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
                <Grid item xs={12}></Grid>
                    <Grid xs={0}></Grid>
                        <Grid item >
                            <Paper elevation={24}>
                                <TextField
                                label="Fecha Inicio"
                                type="date"
                                onchange={setFechaInicio}
                                sx={{ width: 300 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item >
                            <Paper elevation={24}>
                                <TextField
                                label="Fecha Termino"
                                type="date"
                                sx={{ width: 300 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                />
                            </Paper>
                        </Grid>
                    <Grid xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
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

        <div  ref={componentRef}>
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
            <Grid item xs={12}></Grid>
              <Grid xs={1.9}></Grid>
                <Grid item xs={4}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce xs={12} sm={6} md={4} lg={3} cliente="Fecha de Inicio" extra="asd" />
                    </Paper>
                </Grid>
                <Grid item xs={4} >
                    <Paper elevation={24}>
                        <AnalyticEcommerce cliente="Fecha de Termino" extra="= fecha rango" />
                    </Paper>
                </Grid>
              <Grid xs={2}></Grid>
            </Grid>
        </Grid>

        <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
            <Grid item xs={12}></Grid>
              <Grid item xs={0.5}></Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidor Numero" count="Lipigas" cliente="Cliente =" extra="5" />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Nombre Cliente" count="Enap" cliente="Producto =" extra="4"  />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Embarques" count="15"  cliente="T Masa =" extra="3810"   />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={6} md={4} lg={2.7}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidos" count="Lipigas"  cliente="T Volumen =" extra="4097"   />
                    </Paper>
                </Grid>                               
            </Grid>
            <Grid item xs={0.1}></Grid>
        <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Box sx={{ height: 680, width: '100%' }}>
                                <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={products}
                                    columns={resumen}
                                    filterModel={filterModel}
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
          </Grid>
          </div>

          <ReactToPrint
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
                    />
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

            <h1> Test</h1>
            <input type="file" onChange={<handleFileChange/>}></input>
            <br/>
            <p>{<fileName/>}</p>
            <p>{<fileContent/>}</p>

            

            </>
        )
}

export default TableAxios;




