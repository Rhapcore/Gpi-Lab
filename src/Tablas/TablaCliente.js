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
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { lime} from '@mui/material/colors';
import { BASE_URL } from "../misc/consts";

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

const Tablacliente = () => {

  const [userList, setUserList] = useState([])
  const [selectedUser, setSelectedUser] = useState([]);

  const getUsers = async () => {
    const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
    setUserList(data)
  }

  const [openEdit, setOpenEdit] = useState(false);

    return(

    <TableContainer component={Paper} elevation={2}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>F de termino</StyledTableCell>
              <StyledTableCell>Entrega</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell>MasaTon</StyledTableCell>
              <StyledTableCell>Volumen Neto (TON)</StyledTableCell>
              <StyledTableCell>Embarque</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userList.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.FechaTerminoEntrega}
                </StyledTableCell>
                <StyledTableCell>{user.Empresa}</StyledTableCell>
                <StyledTableCell>{user.Producto}</StyledTableCell>
                <StyledTableCell>{user.MasaTon}</StyledTableCell>
                <StyledTableCell>{user.VolumenM3}</StyledTableCell>
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


export default Tablacliente;