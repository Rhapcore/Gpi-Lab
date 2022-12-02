import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransferViewEditar from '../Editar/EditarTransferView';
import { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import axios from 'axios';
import Alertas from '../Alertas/Alertas';
import { lime } from '@mui/material/colors';
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

const TablaTransferView = () => {

  const [userList, setUserList] = useState([])
  const [mensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const getUsers = async () => {
    const {data} = await axios.get(`${BASE_URL}/TransferView`)
    setUserList(data)
  }

  const [openEdit, setOpenEdit] = useState(false);

  useEffect( () => { getUsers() }, [getUsers()]);

    return(

    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Mac</StyledTableCell>
              <StyledTableCell>Ip</StyledTableCell>
              <StyledTableCell>Dns</StyledTableCell>
              <StyledTableCell>Puerto</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userList.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.Id}
                </StyledTableCell>
                <StyledTableCell>{user.Mac}</StyledTableCell>
                <StyledTableCell>{user.Ip}</StyledTableCell>
                <StyledTableCell>{user.Dns}</StyledTableCell>
                <StyledTableCell>{user.Puerto}</StyledTableCell>
                <StyledTableCell>
                    <Fab
                    onClick={() => {setOpenEdit(true);setSelectedUser(user);getUsers()}}
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
      <TransferViewEditar 
                  className="bi bi-pencil-fill"
                  open={openEdit}
                  setOpen={setOpenEdit}
                  user={selectedUser}
                  />
      </TableContainer>
  );
}


export default TablaTransferView;