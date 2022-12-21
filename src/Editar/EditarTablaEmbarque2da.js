import React, {useState, useEffect} from "react";
import { TextField, Button, MenuItem } from "@mui/material/";
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
/*
// Tiene que ser remplzadado por el SCV
const Empresa = [
    {value: 'CLIENTE1',label: 'CLIENTE1'},
    {value: 'CLIENTE2',label: 'CLIENTE2'},
    {value: 'CLIENTE3',label: 'CLIENTE3'},
    {value: 'CLIENTE4',label: 'CLIENTE4'},
    {value: 'CLIENTE5',label: 'CLIENTE5'},
];
*/
// Tiene que ser remplzadado por el ESP32
const Producto = [
    {value: 'PRODUCTO1',label: 'PRODUCTO1'},
    {value: 'PRODUCTO2',label: 'PRODUCTO2'},
    {value: 'PRODUCTO3',label: 'PRODUCTO3'},
    {value: 'PRODUCTO4',label: 'PRODUCTO4'},
    {value: 'PRODUCTO5',label: 'PRODUCTO5'},
    {value: 'PRODUCTO6',label: 'PRODUCTO6'},
    {value: 'PRODUCTO7',label: 'PRODUCTO7'},
    {value: 'PRODUCTO8',label: 'PRODUCTO8'},
    {value: 'PRODUCTO9',label: 'PRODUCTO9'},
    {value: 'PRODUCTO10',label: 'PRODUCTO10'},

];

    

const EditarTablaEmbarque2da = ({user ,open, setOpen }) => {

    const [Empresa, setEmpresa] = useState([])

    useEffect( () => { 
        const getUsers = async () => {
        const {data} = await axios.get(`${BASE_URL}/MostrarEmpresas`)
        setEmpresa(data)
        }
        getUsers(Empresa);
      }, []);
    const NomEmpresas = (Empresa.map((i) => i.EmpresasNom))
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
                sentBody.id = user.id;
              const {data} = await axios.post(`${BASE_URL}/EditarCliente`, sentBody);
              
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
                                    label="Empresa" 
                                    name='Empresa'
                                    value={body.Empresa}
                                    onChange={onChange}
                                    defaultValue={user.Empresa}
                                    select
                                    >
                                    {NomEmpresas.map((option) => (
                                    <MenuItem 
                                    key={option} 
                                    value={option}>
                                    {option}
                                    </MenuItem>
                                    ))}
                                    </TextField>
                                        <p> </p>
                                        <TextField 
                                    sx={{ m: 1 }} 
                                    label="Producto" 
                                    name='Producto'
                                    value={body.Producto}
                                    onChange={onChange}
                                    defaultValue={user.Producto}
                                    select
                                    >
                                    {Producto.map((option) => (
                                    <MenuItem 
                                    key={option.value} 
                                    value={option.value}
                                     defaultValue={user.Producto}>
                                    {option.label}
                                    </MenuItem>
                                    ))}
                                    </TextField>
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

export default EditarTablaEmbarque2da;



                                    
