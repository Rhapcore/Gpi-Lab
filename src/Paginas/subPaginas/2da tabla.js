import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Tablacliente2da from "../../Tablas/TablaCliente2da";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const TableAxios = () => {
//1 - configuramos Los hooks
const [products, setProducts] = useState( [] )
const [openEdit, setOpenEdit] = useState(false);

const getData = async () => {
    await axios.get("http://localhost:3001/MostrarCliente").then((response) => {
        const data = response.data
        console.log(data)
        setProducts(data)
    })
}

useEffect( ()=>{
    getData()
}, [getData()])

//3 - Definimos las columns
const columns = [
    {
        name: "FechaDeTermino",
        label: "F. Transferencia"
    },
    {
        name: "Folio",
        label: "Folio"
    },
    {
        name: "Empresa",
        label: "Empresa"
    },
    {
        name: "Masa",
        label: "Masa (TON)"
    },
    {
        name: "VolumenTon",
        label: "Volumen (M3)"
    },
    {
        name: "Acciones",
        label: "Acciones"
    },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



//4 - renderizamos la datatable
        return (
            <Grid>
            <Grid item xs={12}>
                    <Grid container>
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 5 }}>
            {/* <MUIDataTable title={"Panel de busqueda"}data={products}columns={columns}/> */}
            </Grid>
            </Grid>
            </Grid>
                        <Grid item xs={"auto"} container sx={{ mt: 3 }} >
                        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0.5 }} sx={{ mt: 2 }}   >
                        <Grid item xs={2} >
                            <Item>Medidor Numero</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>Lipigas {products.Masa}</Item>
                        </Grid> 
                        <Grid item xs={2}>
                            <Item>Nombre Cliente</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item> ENAP {products.Empresa}</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>Embarque</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>15{products.Embarque}</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>Medidor</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>Ligipas{products.Masa}</Item>
                        </Grid>
                        </Grid>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0.5 }} sx={{ mt: 2 }}>
                        <Grid item xs={2}>
                            <Item>Clientes</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>5 {products.Masa}</Item>
                        </Grid> 
                        <Grid item xs={2}>
                            <Item>Producto</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item> 4 </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>T Masa</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>15</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>T Volumen</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item>4097</Item>
                        </Grid> 
                        </Grid> 
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0.5 }} sx={{ mt: 2 }}>
                        <Grid item xs={3}>
                            <Item>Fecha Inicio</Item>
                        </Grid>
                        <Grid item xs={1.5}>
                            <Item>21-08-2022</Item>
                        </Grid> 
                        <Grid item xs={3}>
                            <Item>Fecha Termino</Item>
                        </Grid>
                        <Grid item xs={1.5}>
                            <Item>21-08-2022</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>Otros</Item>
                        </Grid>
                        <Grid item xs={1}>
                            <Item> nada </Item>
                        </Grid>
                        </Grid>
                        </Grid>
            <Grid item xs={12}>
                    <Grid container>
                        <Grid item lg={12} md={6} sm={6} xs={12} sx={{ mt: 5 }}>
                        <Tablacliente2da
                         data={products}
                        />
            </Grid>
            </Grid>
            </Grid>
            </Grid>

        )

}

export default TableAxios;