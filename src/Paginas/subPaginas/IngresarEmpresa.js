import React, { useState}  from 'react'
// material mui
import { Grid,Paper, Avatar, TextField, Button} from '@mui/material/';
import Box from "@mui/material/Box"
import axios from "axios";
import Alertas from '../../Alertas/Alertas';
import { BASE_URL } from '../../misc/consts';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


const IngresarEmpresa = () => {

    const navigate = useNavigate();
    const paperStyle={padding :30,height:'auto',width:450, margin:"20px auto"}
    const [setOpenDialog] = useState(false)
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

const [body, setBody] = useState({ Id: ''})

const handleDialog = () => {
    setOpenDialog(prev => !prev)
}

const volver = async () => {
    navigate("/Opciones")
 }
 

const onSubmit = async () => {
    try {
    const {data} = await axios.post(`${BASE_URL}/GuardarEmpresa`, body)
    setMensaje({
        ident: new Date().getTime(),
                message: data.message,
                type: 'success'
    })
    handleDialog()

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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Grid> 
        <Alertas message={mensaje} />
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2>Ingresar Empresa</h2>
                    <p>ㅤ</p>
                </Grid>
                <p> </p>
                <TextField
                sx={{ m: 1 }}
                label='Nombre de Empresa' 
                name='EmpresasNom'
                placeholder='Nombre de Empresa' 
                fullWidth 
                value={body.EmpresasNom}
                />
               <p> </p>
                <p>ㅤ</p>
                <Button 
                variant="outlined"  
                sx={{ m: 1 }} 
                color="success" 
                onClick={onSubmit}
                >
                    Agregar Empresa
                                    </Button>
                                    <i> </i>
                <Button onClick={volver}  variant="outlined"  sx={{ m: 1 }} color="error">
                ㅤㅤㅤCancelarㅤㅤㅤ
                                    </Button>
                <p> </p>
            </Paper>
        </Grid>
        </Box>
        </>
    )
}


export default IngresarEmpresa;