import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material/";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Alertas from "../Alertas/Alertas";
import MenuItem from '@mui/material/MenuItem';
import { validateRUT } from 'validar-rut';
import { BASE_URL } from "../misc/consts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const Cargo = [
    {value: 'Cliente',label: 'Cliente'},
    {value: 'Operador',label: 'Operador'},
    {value: 'Administrador',label: 'Administrador'},
    {value: 'No habilitado',label: 'No habilitado'},
];

const Editarusuario = ({user ,open, setOpen }) => {

    const handleClose = () => setOpen(false);
    const [body, setBody] = useState({});
    const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
    const [sendData, setSendData] = useState(false);
    
    const onChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }
    
    useEffect(() => {
        const onEdit = async () => {
            try {
                const sentBody = { ...user, ...body};
                sentBody.Id = user.Id;
              const {data} = await axios.post(`${BASE_URL}/Editar`, sentBody);
              console.log(data)
              
            handleClose()
            } catch (response) {
                setMensaje({
                    ident: new Date().getTime(),
                    message: "Error al editar los datos",
                    type: 'error'
                })
          }};
        
        onEdit();
    }, [sendData]);

        useEffect(() => {
        const onEdit = async () => {
            try {
                const sentBody = { ...user, ...body};
                sentBody.Id = user.Id;
              const {data} = await axios.post(`${BASE_URL}/Editar`, sentBody);
              console.log(data)
              
            handleClose()
            } catch (response) {
                setMensaje({
                    ident: new Date().getTime(),
                    message: "Error al editar los datos",
                    type: 'error'
                })
          }};
        
        onEdit();
    }, [sendData]);

    return (
        <div>
            <Alertas message={mensaje} />
            <Modal
                open={open}
                onClose={() => handleClose()}
                //onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style }>
                    <Typography id="modal-modal-title" variant="h4" component="h4">
                        Editar Cliente
                    </Typography>
                    <i>ㅤㅤ</i>
                                <div>
                                        <TextField
                                        sx={{ m: 1 }}
                                        label='Nombres' 
                                        name='FristName'
                                        value={body.FristName}
                                        defaultValue={user.FristName}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Apellido' 
                                        name='LastName'
                                        placeholder='Ingresa Apellido'
                                        value={body.LastName}
                                        defaultValue={user.LastName}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Rut' 
                                        name='Rut'
                                        placeholder='Ingresa Rut'
                                        value={body.Rut}
                                        defaultValue={user.Rut}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                            <TextField 
                                            sx={{ m: 1 }} 
                                            label="Cargo" 
                                            name='Cargo'
                                            defaultValue={user.Cargo} 
                                            value={body.Cargo}
                                            onChange={onChange}
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
                                        label='password' 
                                        name='password'
                                        placeholder='Ingresa password'
                                        value={body.password}
                                        defaultValue={user.password}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                    <Button variant="outlined" sx={{ m: 1 }} color="success"
                                        onClick={() => {
                                            console.log(validateRUT(body.Rut))
                                            if (validateRUT(body.Rut) === true) {
                                                try {
                                                    setSendData(!sendData);
                                                    setOpen(false)
                                                    setMensaje({
                                                        ident: new Date().getTime(),
                                                        message: "Edito correctamente",
                                                        type: 'success'
                                                    })
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                            } else {
                                                setMensaje({
                                                    ident: new Date().getTime(),
                                                    message: "El Rut ingresado no Corresponde",
                                                    type: 'error'
                                                })
                                            }
                                        }}>
                                        Guardar
                                    </Button>
                                    <Button variant="outlined" sx={{ m: 1 }} color="error"
                                        onClick={() => setOpen(false)}>
                                        
                                        Cerrar
                                    </Button>
                                </div>
                                
                </Box>
            </Modal>
        </div>
    );
}

export default Editarusuario;


                                    
