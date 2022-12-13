import React, { useState}  from 'react'
// material mui
import { Grid,Paper, TextField, Button, FormControlLabel, Checkbox} from '@mui/material/';
import axios from "axios";
import Alertas from '../../Alertas/Alertas';
import { BASE_URL } from '../../misc/consts';
// import axios from 'axios';


const ConfiguracionTransverView = () => {

    const paperStyle={padding :30,height:'auto',width:500, margin:"20px"}
    const [setOpenDialog] = useState(false)
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

const [body, setBody] = useState({ username: '', password: '' })

const handleDialog = () => {
    setOpenDialog(prev => !prev)
}

const Cambios = ({ target }) => {
    const { name, value } = target
    setBody({
        ...body,
        [name]: value
    })
}

const onSubmit = async () => {
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
}

    return(
    <>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item >
                <Grid item> 
                    <Alertas message={mensaje} />
                        <Paper elevation={20} style={paperStyle}>
                            <Grid align='center'>
                            <h2>Configuracion de TransferView</h2>
                            <h4> !!!  Por el momento solo se puede conectar a red administrativa mediante Wifi o 
                                Ethernet, lo cual no permite la conexión de ambos simultaneamente !!!
                            </h4>
                            </Grid>
                            <i>ㅤ</i>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Wifi" />
                            <i>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Ethernet" />
                            <TextField
                            sx={{ m: 1 }}
                            label='SSID' 
                            name='SSID'
                            placeholder='SSID (Solo Wifi)' 
                            fullWidth 
                            />
                            <TextField 
                            sx={{ m: 1 }}
                            label='Password' 
                            name='Password'
                            type="Password"
                            placeholder='Ingresa Contraseña'
                            fullWidth 
                            />
                            <Grid align='center'>
                            <h4>Configuracion de Red</h4>
                            </Grid>
                            <TextField
                            sx={{ m: 1 }}
                            label='DNS' 
                            name='DNS'
                            placeholder='DNS' 
                            fullWidth 
                            />
                            <TextField
                            sx={{ m: 1 }}
                            label='IP' 
                            name='IP'
                            placeholder='IP' 
                            fullWidth 
                            />
                        <TextField
                            sx={{ m: 1 }}
                            label='Gateway' 
                            name='Gateway'
                            placeholder='Gateway' 
                            fullWidth 
                            />
                            <TextField
                            sx={{ m: 1 }}
                            label='Mask' 
                            name='Mask'
                            placeholder='Mask' 
                            fullWidth 
                            />
                            <TextField
                            sx={{ m: 1 }}
                            label='DNS 1' 
                            name='DNS 1'
                            placeholder='DNS 1' 
                            fullWidth 
                            />
                            <TextField
                            sx={{ m: 1 }}
                            label='DNS 1' 
                            name='DNS 1'
                            placeholder='DNS 1' 
                            fullWidth 
                            />
                            <p> </p>
                            <i>ㅤ</i>
                            <Button 
                            variant="outlined"  
                            sx={{ m: 1 }} 
                            color="success" 
                            onClick={onSubmit}
                            >
                            Actualizar
                            </Button>
                            <i>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>
                            <Button variant="outlined" color="error">
                            Restauracion
                            </Button>
                    </Paper>
                </Grid>
        </Grid>
        <Grid item >
            <Grid item> 
                <Alertas message={mensaje} />
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align='center'>
                        <h2>Configuracion de Omniflow</h2>
                        <h4>Parametros de configuracion en el dispositivo Omniflow</h4>
                        </Grid>
                        <TextField
                        sx={{ m: 1 }}
                        label='ID Slave' 
                        name='ID Slave'
                        placeholder='ID Slave'
                        fullWidth 
                        />
                        <TextField 
                        sx={{ m: 1 }}
                        label='IP Address' 
                        name='IP Address'
                        placeholder='IP Address'
                        fullWidth 
                        />
                        <TextField 
                        sx={{ m: 1 }}
                        label='Port' 
                        name='Port'
                        placeholder='Port'
                        fullWidth 
                        />
                        <Grid align='center'>
                        <h4>Parametros a configuracion para la comunicacion con Omniflow</h4>
                        </Grid>
                        <TextField
                        sx={{ m: 1 }}
                        label='IP' 
                        name='IP'
                        placeholder='IP' 
                        fullWidth 
                        />
                        <TextField
                        sx={{ m: 1 }}
                        label='Gateway' 
                        name='Gateway'
                        placeholder='Gateway' 
                        fullWidth 
                        />
                        <TextField
                        sx={{ m: 1 }}
                        label='Mask' 
                        name='Mask'
                        placeholder='Mask' 
                        fullWidth 
                        />
                        <TextField
                        sx={{ m: 1 }}
                        label='DNS 1' 
                        name='DNS 1'
                        placeholder='DNS 1' 
                        fullWidth 
                        />
                        <TextField
                        sx={{ m: 1 }}
                        label='DNS 1' 
                        name='DNS 1'
                        placeholder='DNS 1' 
                        fullWidth
                        />
                        <p> </p>
                        <i>ㅤ</i>
                        <Button 
                        variant="outlined"  
                        sx={{ m: 1 }} 
                        color="success" 
                        >
                        Actualizar
                        </Button>
                        <i>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>
                        <Button variant="outlined" color="error">
                        Restauracion
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </>
    )
}


export default ConfiguracionTransverView;