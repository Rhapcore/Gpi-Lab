import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Editarusuario from '../Editar/EditarUsuario';
import { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';

import axios from 'axios';
import Alertas from '../Alertas/Alertas';
import { lime } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: lime[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

const Tablausuarios = () => {

  const [userList, setUserList] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const init = async () => {
		const { data } = await axios.post("http://localhost:3001/Eliminar")
    console.log(data)
	}

  const getUsers = async () => {
    const {data} = await axios.get("http://localhost:3001/TablaUsuarios")
    setUserList(data)
  }

  const onDelete = async (Id) => {
    try {
      const { data } = await axios.post("http://localhost:3001/Eliminar", {Id : Id})
      console.log(data)
      setMensaje({
				ident: new Date().getTime(),
				message: "Se elimino Correctamente",
				type: 'success'
			})
			init()
      getUsers()
    } catch (response) {
      setMensaje({
				ident: new Date().getTime(),
				message: response.data,
				type: 'error'
			})
  }}
  const [openEdit, setOpenEdit] = useState(false);

  useEffect( () => { getUsers() }, [getUsers()]);

    return(

    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombres</StyledTableCell>
              <StyledTableCell>Apellidos</StyledTableCell>
              <StyledTableCell>Rut</StyledTableCell>
              <StyledTableCell>Cargo</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userList.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.Id}
                </StyledTableCell>
                <StyledTableCell>{user.FristName}</StyledTableCell>
                <StyledTableCell>{user.LastName}</StyledTableCell>
                <StyledTableCell>{user.Rut}</StyledTableCell>
                <StyledTableCell>{user.Cargo}</StyledTableCell>
                <StyledTableCell>
                    <Fab
                    onClick={() => {setOpenEdit(true);setSelectedUser(user);}}
                    aria-label="Edit" 
                    size="small"
                    >
                    <EditIcon />
                    </Fab>
                    <i>ㅤ</i>
                    <Fab color="error"  onClick={() => onDelete(user.Id)}
                    aria-label="delete" size="small">
                    <DeleteIcon/>
                    </Fab>
                    
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      <Editarusuario 
                  className="bi bi-pencil-fill"
                  open={openEdit}
                  setOpen={setOpenEdit}
                  user={selectedUser}
                  />
      </TableContainer>
  );
}


export default Tablausuarios;

/*

  const [value, setValue] = useState('Dia');
  const [userList, setUserList] = useState([]);
  const getUsers = async () => {
    const {data} = await axios.get("http://localhost:3001/TablaUsuarios")
    setUserList(data)
  }


  const chartLabels = userList.map((i) => iuser.Entrega);
  const chartSeries = userList.map((i) => i.Embarque);
*/