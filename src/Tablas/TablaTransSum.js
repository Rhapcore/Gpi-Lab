import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alertas from '../Alertas/Alertas';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.white,
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

const TablaTransum = () => {

  const [userList, setUserList] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const getUsers = async () => {
    const {data} = await axios.get("http://localhost:3001/MostrarCliente")
    setUserList(data)
  }

  const [openEdit, setOpenEdit] = useState(false);

  const ton = userList.map((i) => i.VolumenTon);
  const m3 = userList.map((i) => i.Masa);

    useEffect( () => { getUsers() }, []);

    
  let M3 = m3.reduce(
    (acx, r) => Number.parseInt(r) + acx, -m3[0]);
    M3 += Number.parseInt(m3);
    M3 /= 10
  

  let total = ton.reduce(
            (acc, r) => Number.parseInt(r) + acc, -ton[0]);
            total += Number.parseInt(ton);
            total /= 10
    
    return(

    <TableContainer component={Paper} elevation={2}>
      
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableBody>
              <StyledTableRow>
              <StyledTableCell>Transporte PROM TON</StyledTableCell>
              <StyledTableCell>{M3}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell>Transporte PROM M3</StyledTableCell>
                <StyledTableCell>{total}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default TablaTransum;