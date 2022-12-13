import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material/";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Alertas from "../Alertas/Alertas";
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


const EditarAcuerdoComercial = ({user ,open, setOpen }) => {

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
              const {data} = await axios.post(`${BASE_URL}/EditarAcuerdoComercial`, sentBody);
              
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
                        Editar Acuerdo Comercial
                    </Typography>
                    <i>ㅤㅤ</i>
                                <div>
                                <TextField 
                                        sx={{ m: 1 }}
                                        label='Toneladas Metricas' 
                                        name='TMProgramaPorAcuerdos' 
                                        value={body.TMProgramaPorAcuerdos}
                                        defaultValue={user.TMProgramaPorAcuerdos}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Fecha Inicio'
                                        value={body.MesAño}
                                        defaultValue={user.MesAño}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Fecha Termino'
                                        value={body.MesAño}
                                        defaultValue={user.MesAño}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='% de Tolerancia' 
                                        name='% de Tolerancia' 
                                        placeholder='% de Tolerancia' 
                                        value={body.Tolerancia}
                                        defaultValue={user.Tolerancia}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Minimo de Tolerancia' 
                                        name='Minimo de Tolerancia' 
                                        placeholder='Minimo de Tolerancia' 
                                        value={body.MinimoTolerancia}
                                        defaultValue={user.MinimoTolerancia}
                                        onChange={onChange}
                                        />
                                        <p> </p>
                                        <TextField 
                                        sx={{ m: 1 }}
                                        label='Maximo de Tolerancia' 
                                        name='Maximo de Tolerancia' 
                                        placeholder='Maximo de Tolerancia' 
                                        value={body.MaximaTolerancia}
                                        defaultValue={user.MaximaTolerancia}
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

export default EditarAcuerdoComercial;


                                    
