import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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

const TablaTransum = ({M3M3,totaltotal}) => {

    return(
    <TableContainer component={Paper} elevation={2}>
        <Table aria-label="customized table">
          <TableBody>
              <StyledTableRow>
              <StyledTableCell>Transporte PROM TON</StyledTableCell>
              <StyledTableCell>{M3M3}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell>Transporte PROM M3</StyledTableCell>
                <StyledTableCell>{totaltotal}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default TablaTransum;