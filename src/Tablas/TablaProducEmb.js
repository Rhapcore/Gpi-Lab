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

const TablaProducemb = () => {

  const [series,setSeries] = useState([{}]);
  const [result, setResult] = useState([])
  const [userList, setUserList] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect( () => { 
    const getUsers = async () => {
      const {data} = await axios.get("http://localhost:3001/MostrarCliente")
      setUserList(data)
      const objList = {};
      data.forEach((Empresa) => {
      if (!objList[Empresa.Empresa]) objList[Empresa.Empresa] = { 
        ... Empresa,
        VolumenTon: 0,
        Masa: 0,
        cantidad: 0,
      };
      objList[Empresa.Empresa].cantidad += 0 ;
      objList[Empresa.Empresa].VolumenTon += Empresa.VolumenTon ;
      objList[Empresa.Empresa].Masa += Empresa.Masa;
      });
      const result = Object.keys(objList).map((key) => objList[key]);
      setResult(result)
    }
    getUsers(result);
  }, []);

  useEffect( () => { 

    const m3 = result.map((i) => i.Masa);
    const rem3 = result.map((i) => i.Masa);
    const reton = result.map((i) => i.VolumenTon);

    let totalreton = reton.reduce(
        (acc, r) => Number.parseInt(r) + acc, -reton[0]);
        totalreton += Number.parseInt(reton);
    let M3 = m3.reduce(
        (acc, r) => Number.parseInt(r) + acc, -m3[0]);
        M3 += Number.parseInt(m3);

    setSeries([
            {
            name: 'Suma de TON ACUM',
            data: reton,
            },{
            name: 'Suma de VOLUM ACUM',
            data: rem3,
            }]) }, 
    [userList]);

  

    return(

    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell>Ton</StyledTableCell>
              <StyledTableCell>M3</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {result.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.Empresa}
                </StyledTableCell>
                <StyledTableCell>{user.Producto}</StyledTableCell>
                <StyledTableCell>{user.Masa}</StyledTableCell>
                <StyledTableCell>{user.VolumenTon}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
  );
}


export default TablaProducemb;