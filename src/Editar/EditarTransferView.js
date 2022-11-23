import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material/";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Alertas from "../Alertas/Alertas";

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

const TransferViewEditar = ({user ,open, setOpen }) => {

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

    const getUsers = async () => {
        const {data} = await axios.get("http://localhost:3001/TransferView")
      }

    useEffect(() => {
        const onEdit = async () => {
            try {
                const sentBody = { ...user, ...body};
                    sentBody.Id = user.Id;
                    

              const {data} = await axios.post("http://localhost:3001/TransferViewEditar", sentBody);
            handleClose()
            getUsers()
            } catch (response) {
                setMensaje({
                    ident: new Date().getTime(),
                    message: "Error al editar los datos",
                    type: 'error'
                })
          }};
        
        onEdit();
    }, [sendData]);

    useEffect( () => { getUsers() }, []);

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
                    TransferView Editar
                    </Typography>
                    <i>ㅤㅤ</i>
                                <div>
                                        <TextField
                                        sx={{ m: 1 }}
                                        label='Mac' 
                                        name='Mac'
                                        value={body.Mac}
                                        defaultValue={user.Mac}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Ip' 
                                        name='Ip'
                                        value={body.Ip}
                                        defaultValue={user.Ip}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Dns' 
                                        name='Dns'
                                        value={body.Dns}
                                        defaultValue={user.Dns}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Puerto' 
                                        name='Puerto'
                                        value={body.Puerto}
                                        defaultValue={user.Puerto}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                    <Button variant="outlined" sx={{ m: 1 }} color="success"
                                        onClick={() => {
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

export default TransferViewEditar;


                                    
