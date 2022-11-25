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

const TablaClienprod = () => {

  const [userList, setUserList] = useState([])
  const [result, setResult] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const Embar = userList.map((i) => i.Embarque);
  const ton = userList.map((i) => i.VolumenTon);
  const m3 = userList.map((i) => i.Masa); 

    let EMb = Embar.reduce(
    (acc, r) => Number.parseInt(r) + acc, -Embar[0]);
    EMb += Number.parseInt(Embar);  
    let total = ton.reduce(
      (acc, r) => Number.parseInt(r) + acc, -ton[0]);
      total += Number.parseInt(ton);
    let M3 = m3.reduce(
      (acc, r) => Number.parseInt(r) + acc, -m3[0]);
      M3 += Number.parseInt(m3);

 
  const [openEdit, setOpenEdit] = useState(false);

  useEffect( () => { 
    const getUsers = async () => {
      const {data} = await axios.get("http://localhost:3001/MostrarCliente")
      setUserList(data)
      const objList = {};
      data.forEach((Producto) => {
      if (!objList[Producto.Producto]) objList[Producto.Producto] = { 
        ... Producto,
        Embarque: 0,
        VolumenTon: 0,
        Masa: 0,
        cantidad: 0,
      };
      objList[Producto.Producto].cantidad += 0 ;
      objList[Producto.Producto].Embarque += Producto.Embarque;
      objList[Producto.Producto].VolumenTon += Producto.VolumenTon ;
      objList[Producto.Producto].Masa += Producto.Masa;
      });
      const result = Object.keys(objList).map((key) => objList[key]);
      setResult(result)
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
                <StyledTableCell aria-label="customized table">{user.Masa}</StyledTableCell>
                <StyledTableCell aria-label="customized table">{user.VolumenTon}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Table></Table>
        <Table aria-label="customized table">
        <TableHead>
        <TableRow>
        <StyledTableCell >TOTAL GENERAL</StyledTableCell>
        <StyledTableCell aria-label="customized table"> {EMb} </StyledTableCell>
        <StyledTableCell aria-label="customized table"> {M3} </StyledTableCell>
        <StyledTableCell aria-label="customized table"> {total} </StyledTableCell>
        </TableRow>
        </TableHead>
        </Table>
      </TableContainer>
  );
}


export default TablaClienprod;