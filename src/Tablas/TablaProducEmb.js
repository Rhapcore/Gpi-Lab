import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const TablaProducemb = ({result}) => {
    return(
    <TableContainer component={Paper} elevation={2}>
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