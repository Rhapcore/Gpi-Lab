/*
import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Tablacliente = () => {

    return(

        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="left">EMBARQUE</TableCell>
            <TableCell align="left">CLIENTE</TableCell> 
            <TableCell align="left">FECHA DE INGRESO</TableCell>
            <TableCell align="left">PRODUCTO</TableCell>
            <TableCell align="left">TON</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

export default Tablacliente;
*/

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditarTablaEmbarque from '../Editar/EditarTablaEmbarque';
import { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import axios from 'axios';
import Alertas from '../Alertas/Alertas';
import { lime} from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
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

const Tablacliente2da = (data2) => {

  const [userList, setUserList] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const init = async () => {
		const { data } = await axios.post("http://localhost:3001/EditarCliente")
    console.log(data)
	}

  const getUsers = async () => {
    const {data} = await axios.get("http://localhost:3001/MostrarCliente")
    setUserList(data)
  }
  const [openEdit, setOpenEdit] = useState(false);



    return(

    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table item sx={"auto"} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>F de termino</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell>Masa</StyledTableCell>
              <StyledTableCell>Volumen Neto (TON)</StyledTableCell>
              <StyledTableCell>Embarque</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data2.data.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.FechaDeTermino}
                </StyledTableCell>
                <StyledTableCell>{user.Producto}</StyledTableCell>
                <StyledTableCell>{user.Masa}</StyledTableCell>
                <StyledTableCell>{user.VolumenTon}</StyledTableCell>
                <StyledTableCell>{user.Embarque}</StyledTableCell>
                <StyledTableCell>
                    <Fab color="primary" 
                    onClick={() => {setOpenEdit(true);setSelectedUser(user);}}
                    aria-label="Edit" 
                    size="small"
                    >
                    <EditIcon />
                    </Fab>
                    
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      <EditarTablaEmbarque 
                  className="bi bi-pencil-fill"
                  open={openEdit}
                  setOpen={setOpenEdit}
                  user={selectedUser}
                  />
      </TableContainer>
  );
}


export default Tablacliente2da;