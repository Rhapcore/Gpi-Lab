import React, { useState, useEffect, Component, useRef}  from 'react'
// material mui
import { Grid,Paper, TextField, Button, Fab} from '@mui/material/';
import axios from "axios";
import Alertas from '../../Alertas/Alertas';
import { BASE_URL } from '../../misc/consts';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import EditarEmpresa from '../../Editar/EditarEmpresa';
import Image from 'mui-image';
import LogoLipigas from '../../Imagenes/Logo-Lipigas.png';
import * as csv from 'csvtojson';



const IngresarEmpresa = () => {

    const [Empresa, setEmpresa] = useState([])
    const [Producto, setProducto] = useState([])
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);

    const buttonRef= useRef(null);

    const handleOnFileLoad = (guarda) => {
        console.log(guarda);
    };

    const onErrorHandler = (err, file, inputElem, reason) => {
        console.log(err);
    };

    const Cambios = ({ target }) => {
    const { name, value } = target
    setBody({
        ...body,
        [name]: value
    })
}

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

      class App extends Component{
        constructor (props) {
            super (props);
            this.state = {
                fileName: "",
                fileContent: "",
                result: ''
            };
        }
    }
    const handleFileChange = async (e)=> {
        const file = e.target.files[0];
        const csv = require("csvtojson")
        csv()
        .fromFile(file)
        .then((jsonObj)=>{
            console.log(file);
        })
        console.log("csv",csv)

///////////////////////////////////////////////////////////////
        /*
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload =  (result) => {
            const data = (result.target.result)
            console.log("data",data)
            const csv = require("csvtojson")

        }
        reader.onerror = () => {
            console.log("No Coresponde", reader.error)
        }
        */
    }


    const handleFileSave = async (e)=> {
        
    }


    const paperStyle={padding :30,height:'auto',width:500, margin:"20px"}
    const [setOpenDialog] = useState(false)
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

    const [body, setBody] = useState({ Id: ''})

    const handleDialog = () => {
        setOpenDialog(prev => !prev)
    }

    useEffect( () => { 
        const getEmpresa = async () => {
        const {data} = await axios.get(`${BASE_URL}/MostrarEmpresas`)
        setEmpresa(data)
        }
        getEmpresa(Empresa) ;
        const getProducto = async () => {
            const {data} = await axios.get(`${BASE_URL}/MostrarProducto`)
            setProducto(data)
            }
            getProducto(Empresa) ;
      }, []);


    const onSubmit = async () => {
        try {
        const {data} = await axios.post(`${BASE_URL}/GuardarEmpresa`, body)
        setMensaje({
            ident: new Date().getTime(),
                    message: data.message,
                    type: 'success'
        })
        handleDialog()
        Empresa()

        } catch (response) {
            setMensaje({
                ident: new Date().getTime(),
                message: response.data.sqlMessage,
                type: 'error'
            })
    }
} 

    return(
    <>
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ mt: 0 }}>
        <Grid item  >
                <Grid item> 
                    <Alertas message={mensaje} />
                        <Paper elevation={20} style={paperStyle}>
                            <Grid align='center'>
                                <h2>Ingresar Empresa</h2>
                                    <TextField
                                    sx={{ m: 1 }}
                                    label='Nombre de Empresa' 
                                    name='EmpresasNom'
                                    placeholder='Nombre de Empresa' 
                                    fullWidth 
                                    value={body.EmpresasNom}
                                    onChange={Cambios}
                                    />
                                    <Grid rowSpacing={4.5} columnSpacing={2.75}>
                                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>             
                                            <Grid item xs={12}></Grid>
                                                <Grid xs={0}></Grid>
                                                <Grid item xs={6} >
                                                <Accordion>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                >
                            <Typography>Empresas en el sistema</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell>Empresas</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {Empresa.map((user, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">{user.Id}</StyledTableCell>
                                        <StyledTableCell aria-label="customized table">{user.EmpresasNom}</StyledTableCell>
                                        <StyledTableCell aria-label="customized table">
                                        <Fab
                                            onClick={() => {setOpenEdit(true);setSelectedUser(user);}}
                                            aria-label="Edit" 
                                            size="small">
                                            <EditIcon/>
                                        </Fab>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                        <Grid item xs={6} >
                        <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Productos del sistema</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Productos</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Producto.map((user, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">{user.Id}</StyledTableCell>
                                    <StyledTableCell aria-label="customized table">{user.ProductoOmni}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
                </Grid>
                <Grid item >
                    </Grid>
            </Grid>
            <p> </p>
                <Button 
                variant="outlined"  
                sx={{ m: 1 }} 
                color="success" 
                onClick={onSubmit}>
                    Agregar 
                </Button>
                <Button 
                        variant="outlined"  
                        sx={{ m: 1 }} 
                        color="primary"
                        component="label">Insertar CSV Empresa<input type="file" hidden onClick={handleFileChange}/></Button>
                <p> </p>
                </Paper>
            </Grid>
        </Grid>
        <Grid item >
            <Grid item> 
                <Alertas message={mensaje} />
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align='center'>
                            <h2>Ingresar Logo</h2>
                            <h4>La imagen debe ser ingresada en formato PNG</h4>
                        </Grid>
                        <p> </p>
                        <Grid align='center'>
                        <Button 
                            variant="outlined"  
                            color="primary"
                            component="label">Insertar Logo Empresa<input type="file" hidden onClick={handleFileSave}/>
                        </Button>
                        <p> </p>
                        <p> </p>
                        <Image height="50%" width="50%"  src={LogoLipigas}/>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>


        </>
    )
}

export default IngresarEmpresa;