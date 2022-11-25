import { useState, useEffect, Component } from "react";
import axios from "axios";
import {Grid,Stack,Typography,Paper} from '@mui/material';
import Tablacliente2da from "../../Tablas/TablaCliente2da";

import { styled } from '@mui/material/styles';
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
import { grey, lime } from "@mui/material/colors";

const TableAxios = () => {
//1 - configuramos Los hooks
const [products, setProducts] = useState( [] )
const [openEdit, setOpenEdit] = useState(false);
const [selectedUser, setSelectedUser] = useState([]);


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
        this.setState ({fileName: file.fileName, fileContent: reader.result})
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
        <GridToolbarFilterButton  
        csvOptions={{
            
        }}
        />
        </Grid>
        <Grid xs={4}>
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
      </GridToolbarContainer>
    );
  }

useEffect( ()=>{
    const getData = async () => {
        await axios.get("http://localhost:3001/MostrarCliente").then((response) => {
            const data = response.data
            console.log(data)
            setProducts(data)
        })
    }
    getData()
}, [])

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
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

  console.log(selectedUser)

  //<EditarTablaEmbarque/>
//4 - renderizamos la datatable
        return (
            <>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Box sx={{ height: 500, width: '100%' }}>
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
                                        Toolbar: CustomToolbar,}}
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
        
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
            <Grid item xs={12}></Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidor Numero" count="Lipigas" cliente="Cliente =" extra="5" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Nombre Cliente" count="Enap , COPEC" cliente="Producto =" extra="4"  />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Embarques" count="15"  cliente="T Masa =" extra="3810"   />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={24}>
                        <AnalyticEcommerce title="Medidos" count="Lipigas"  cliente="T Volumen =" extra="4097"   />
                    </Paper>
                </Grid>                               
            </Grid> 

        <Grid container rowSpacing={1.5}>             
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <Paper elevation={24}>
                <Typography variant="h5" >ㅤFecha Inicio :  ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ Fecha Fin: ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ   </Typography>
                </Paper>
            </Grid>
        </Grid>

        <Grid item xs={12}>
                <Grid container>
                    <Grid item lg={12} md={8} sm={8} xs={12} sx={{ mt: 5 }}>
                        <Paper elevation={24}>
                            <Box sx={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    //Traspasarlo a español sus componentes DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={products}
                                    columns={columns}
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{
                                        LoadingOverlay: LinearProgress,
                                        Toolbar: CustomToolbar,}}
                                        loading
                                    {...products}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <h1> Test</h1>
            <input type="file" onChange={<handleFileChange/>}>
            </input>
            <p>{<fileContent/>}</p>


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