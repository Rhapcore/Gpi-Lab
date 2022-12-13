import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditarAcuerdoComercial from '../Editar/EditarAcuerdoComercial';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
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

const AcuerdoComercial = ({userList}) => {

  const [mensaje ] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

const TMP = userList.map((i) => i.TMProgramaPorAcuerdos);
const TMR = userList.map((i) => i.TMRecepcionada);

let totaltotal = TMP.reduce(
  (acc, r) => Number.parseInt(r) + acc, -TMP[0]);
  totaltotal = Number(TMR / TMP).toFixed(2);

    return(
    <TableContainer component={Paper} elevation={2}>
        <Alertas message={mensaje} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre Empresa</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell>Mes/Año</StyledTableCell>
              <StyledTableCell>TM Programa por Acuerdos</StyledTableCell>
              <StyledTableCell>TM Recepcionada</StyledTableCell>
              <StyledTableCell>TM Diferencia</StyledTableCell>
              <StyledTableCell>% Recepcianado</StyledTableCell>
              <StyledTableCell>% Tolerancia</StyledTableCell>
              <StyledTableCell>Minimo Tolerancia</StyledTableCell>
              <StyledTableCell>Saldo</StyledTableCell>
              <StyledTableCell>Maxima Tolerancia</StyledTableCell>
              <StyledTableCell>Saldo</StyledTableCell>
              <StyledTableCell>Accion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {userList.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{user.NombreEmpresa}</StyledTableCell>
                <StyledTableCell>{user.Producto}</StyledTableCell>
                <StyledTableCell>{user.MesAño}</StyledTableCell>
                <StyledTableCell>{user.TMProgramaPorAcuerdos}</StyledTableCell>
                <StyledTableCell>{user.TMRecepcionada}</StyledTableCell>
                <StyledTableCell>{TMP - TMR}</StyledTableCell>
                <StyledTableCell>{totaltotal}%</StyledTableCell>
                <StyledTableCell>{user.Tolerancia}</StyledTableCell>
                <StyledTableCell>{user.MinimoTolerancia}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>{user.MaximaTolerancia}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                    <Fab
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
      <EditarAcuerdoComercial 
                  className="bi bi-pencil-fill"
                  open={openEdit}
                  setOpen={setOpenEdit}
                  user={selectedUser}
                  />
      </TableContainer>
  );
}


export default AcuerdoComercial;

/*
// Eliminar
<i>ㅤ</i>
<Fab color="error"  onClick={() => onDelete(user.Id)}
aria-label="delete" size="small">
<DeleteIcon/>
</Fab>
*/