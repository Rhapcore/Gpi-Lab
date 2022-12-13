import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alertas from '../Alertas/Alertas';
import { BASE_URL } from "../misc/consts";

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

const TablaClienprod = ({result, TotalEmbarque, TotalTonneladas, TotalVolumen}) => {

  const [setUserList] = useState([])
  const [mensaje] = useState({ ident: null, message: null, type: null })
 

  useEffect( () => { 
    const getUsers = async () => {
      const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
      setUserList(data)
    }
    getUsers();
  }, []);

    return(

    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell>Embarques</StyledTableCell>
              <StyledTableCell>Ton</StyledTableCell>
              <StyledTableCell>M3</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {result.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.Producto}
                </StyledTableCell>
                <StyledTableCell aria-label="customized table">{user.Embarque}</StyledTableCell>
                <StyledTableCell aria-label="customized table">{user.VolumenTon} </StyledTableCell>
                <StyledTableCell aria-label="customized table">{user.Masa}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Table></Table>
        <Table aria-label="customized table">
        <TableHead>
        <TableRow>
        <StyledTableCell >TOTAL GENERAL</StyledTableCell>
        <StyledTableCell aria-label="customized table"> {TotalEmbarque} </StyledTableCell>
        <StyledTableCell aria-label="customized table"> {TotalTonneladas} </StyledTableCell>
        <StyledTableCell aria-label="customized table"> {TotalVolumen} </StyledTableCell>
        </TableRow>
        </TableHead>
        </Table>
      </TableContainer>
  );
}


export default TablaClienprod;