import React, {useState} from 'react'
import { Grid,Paper, TextField, Button, Typography, LinearProgress} from '@mui/material/';
import { LockOpen } from '@mui/icons-material'
import LogoGpi from '../Imagenes/Logo-GPI.png';
import Box from "@mui/material/Box";
import axios from "axios";
import {Alert} from '@mui/material/';
import Alertas from '../Alertas/Alertas';
import { BASE_URL } from "../misc/consts";
import { validateRUT } from 'validar-rut';

import { useNavigate } from "react-router-dom";
import Image from 'mui-image';




const Login = () => {
    const navigate = useNavigate();
    // const history = useHistory();
      

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
                    //window.location.pathname="/ADashboard"
                    //return (<Navigate replace to="/ADashboard"/>);
                    navigate("/ADashboard2da")
                    //window.location={ListItemLink}}
                    //window.location.href=<ListItemLink 
                    //component={DashboardFront} to="/ADashboard" />
                } else if (user?.Rut && user.Cargo === 'Operador') {
                    navigate("/ODashboard2da")
                    //window.location.href="/ODashboard"
                } else if (user?.Rut && user.Cargo === 'Cliente') {
                    navigate("/CDashboard2da")
                    //window.location.href="/CDashboard2da"
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
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Alertas message={mensaje} />
        <Grid> 
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Image duration={3000} width="100%" src={ LogoGpi } />
                    <Typography sx={{ mt: -5 }} variant="h4" display="block" >Iniciar Sesión</Typography>
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
                <Button
                onClick={onSubmit} 
                />
                <p> </p>
                <Typography >
                <p> </p>
                </Typography>
                <Typography align="center" variant="h4" > GPI Lab © </Typography>
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
