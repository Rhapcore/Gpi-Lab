import React, {useState} from 'react'
import { Grid,Paper, TextField, Button, Typography,Link, LinearProgress} from '@mui/material/';
import { LockOpen } from '@mui/icons-material'
import LogoGpi from '../Imagenes/Logo-GPI.png';
import LogoGpi2 from '../Imagenes/Logo-GPI2.png';
import CardMedia from '@mui/material/CardMedia';
import Box from "@mui/material/Box";
import axios from "axios";
import {Alert} from '@mui/material/';
import "../Imagenes/Header.css";
import Alertas from '../Alertas/Alertas';
import { BASE_URL } from "../misc/consts";
import { validateRUT } from 'validar-rut';


const Login = () => {

    const paperStyle={padding :20,height:'90vh',width:400, margin:"10px auto"}
    const btnstyle={margin:'8px 0'}
    
    
    const [body, setBody] = useState({})
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
    const [errorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false)
    
 

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value,
            
        })
    }
    const onSubmit = () => {
        if (validateRUT(body.Rut) === true) {
            axios.post(`${BASE_URL}/Login`, body)
            .then(({ data }) => {
                setMensaje({
                    ident: new Date().getTime(),
                    message: "Contraseña correcta",
                    type: 'success'
                })
                localStorage.setItem('user', JSON.stringify(data))
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.Rut && user.Cargo === 'Administrador') {
                    window.location.href="/ADashboard"
                } else if (user?.Rut && user.Cargo === 'Operador') {
                    window.location.href="/ODashboard"
                } else if (user?.Rut && user.Cargo === 'Cliente') {
                    window.location.href="/CDashboard2da"
                }
                setIsLoading(false)
            })
            .catch(({ response }) => {
                setMensaje({
					ident: new Date().getTime(),
					message: "Contraseña incorrecta",
					type: 'error'
				})
            })
            
        } else {
            setMensaje({
                ident: new Date().getTime(),
                message: "El Rut ingresado no Corresponde",
                type: 'error'
            })
        }
        }

    return(
        <>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >


        <Alertas message={mensaje} />
        <Grid> 
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                     <CardMedia
                        component="img"
                        src={ LogoGpi }
                    />
                    <h2>Iniciar Sesión </h2>
                </Grid>
                <TextField
                fullWidth
                autoFocus
                color='primary'
                margin='normal'
                variant='outlined'
                label='Rut'
                value={body.Rut}
                onChange={inputChange}
                name='Rut'
                />
                <p> </p>
                <TextField 
                fullWidth
                color='primary'
                margin='normal'
                variant='outlined'
                label='Clave'
                type="password"
                value={body.password}
                onChange={inputChange}
                name='password'
                />
                <p> </p>
                {isLoading ? <LinearProgress color='secondary' /> : null}
                <Button 
                startIcon={<LockOpen />}
                color= 'primary' 
                variant="contained" 
                style={btnstyle} 
                onClick={onSubmit} 
                fullWidth
                >
                    
                    INGRESAR
                </Button>
                <p> </p>
                <Typography >
                <p> </p>
                </Typography>
                <img style={{paddingLeft: 250 }} src={ LogoGpi2 } className="imagenLogoGrande"/>
            </Paper>
        </Grid>
        {errorMessage &&
            <Alert type="error" messages={errorMessage} autoclose={0.1} />
        }
        </Box>
        
        
        </>
    )
}
export default Login

/*
<Link href="/404error" >
¿Olvidaste tú clave?
</Link>
*/
