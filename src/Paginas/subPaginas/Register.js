import React, { useState,useEffect}  from 'react'
// material mui
import { Grid,Paper, Avatar, TextField, Button} from '@mui/material/';
import Box from "@mui/material/Box"
import axios from "axios";
import Alertas from '../../Alertas/Alertas';
import MenuItem from '@mui/material/MenuItem';
import { BASE_URL } from '../../misc/consts';
import { validateRUT } from 'validar-rut';
// import axios from 'axios';

const Cargo = [
    {value: 'Cliente',label: 'Cliente'},
    {value: 'Operador',label: 'Operador'},
    {value: 'Administrador',label: 'Administrador'},
    {value: 'No habilitado',label: 'No habilitado'},
    
];

const Register = () => {

    const paperStyle={padding :30,height:'auto',width:450, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const [openDialog, setOpenDialog] = useState(false)
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
    const [usuariosList, setUsuariosList] = useState([])

const [body, setBody] = useState({ username: '', password: '' })

const handleDialog = () => {
    setOpenDialog(prev => !prev)
}

const init = async () => {
    const { data } = await axios.post(`${BASE_URL}/Guardar`)
    setUsuariosList(data)
}

const onChange = ({ target }) => {
    const { name, value } = target
    setBody({
        ...body,
        [name]: value
    })
}

const onSubmit = async () => {
    if (validateRUT(body.Rut) === true) {
            try {
            const {data} = await axios.post(`${BASE_URL}/Guardar`, body)
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
    } else {
        setMensaje({
            ident: new Date().getTime(),
            message: "El Rut ingresado no Corresponde",
            type: 'error'
        })
    }
}

  useEffect( () => {}, [onChange]);

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
                     <Avatar style={avatarStyle}/>
                     <p>ㅤ</p>
                    <h2>Ingresar Usuario</h2>
                    <p>ㅤ</p>
                </Grid>
                <p> </p>
                <TextField
                sx={{ m: 1 }}
                label='Nombres' 
                name='FristName'
                placeholder='Ingresa Nombres' 
                fullWidth 
                value={body.FristName}
                onChange={onChange}
                />
                <p> </p>
                <TextField 
                sx={{ m: 1 }}
                label='Apellido' 
                name='LastName'
                placeholder='Ingresa Apellido'
                fullWidth 
                value={body.LastName}
                onChange={onChange}
                />
                <p> </p>
                <TextField 
                sx={{ m: 1 }}
                label='Rut' 
                name='Rut'
                placeholder='Ingresa Rut' 
                fullWidth 
                value={body.Rut}
                onChange={onChange}
                />
                <p> </p>
                <TextField 
                sx={{ m: 1 }} 
                label="Cargo" 
                name='Cargo'
                value={body.Cargo}
                onChange={onChange}
                fullWidth
                select
                >
                {Cargo.map((option) => (
                <MenuItem 
                key={option.value} 
                value={option.value}>
                {option.label}
                </MenuItem>
                ))}
                </TextField>
                <p> </p>
                <TextField 
                sx={{ m: 1 }}
                label='Password' 
                name='password'
                type="Password"
                placeholder='Ingresa Password' 
                fullWidth 
                value={body.password}
                onChange={onChange}
                />
               <p> </p>
                <p>ㅤ</p>
                <Button 
                variant="outlined"  
                sx={{ m: 1 }} 
                color="success" 
                onClick={onSubmit}
                >
                    Agregar Usuario
                                    </Button>
                                    <i> </i>
                <Button href='/AUsuarios'variant="outlined"  sx={{ m: 1 }} color="error">
                ㅤㅤㅤCancelarㅤㅤㅤ
                                    </Button>
                <p> </p>
            </Paper>
        </Grid>
        </Box>
        </>
    )
}


export default Register;