import React, {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, LinearProgress} from '@mui/material/';
import { LockOpen } from '@mui/icons-material'
import LogoGpi from '../Imagenes/Logo-GPI.png';
import CardMedia from '@mui/material/CardMedia';
import Box from "@mui/material/Box";
import axios from "axios";
import {Alert} from '@mui/material/';
import "../Imagenes/Header.css";
import Alertas from '../Alertas/Alertas';
import { validateRUT, getCheckDigit, generateRandomRUT } from 'validar-rut'


const Login = () => {

    const paperStyle={padding :20,height:'90vh',width:400, margin:"10px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    
    
    const [body, setBody] = useState({})
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
    const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false)

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value,
            
        })
    }


    const onSubmit = () => {
        
        axios.post("http://localhost:3001/Login", body)
            .then(({ data }) => {
                setMensaje({
                    ident: new Date().getTime(),
                    message: "Contraseña Correcta",
                    type: 'success'
                })
                localStorage.setItem('auth', '"yes"')
                setIsLoading(false)
                window.location.href="/Dashboard"
            })
            .catch(({ response }) => {
                setMensaje({
					ident: new Date().getTime(),
					message: response.data,
					type: 'error'
				})
            })
            
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
                    <h2>Iniciar Session </h2>
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
                label='Password'
                type="Password"
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
                    
                    Sign in
                </Button>
                <p> </p>
                <Typography >
                     <Link href="/404error" >
                        Olvido password ?
                </Link>
                <p> </p>
                </Typography>
                
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
