import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ResultsTable({patents}) {
    console.log(patents[2]);

  //const rows = patents.map(patent => createData(patent.id, patent.description));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Patent Number</b> </TableCell>
            <TableCell align="left"><b>Description</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patents.map((row) => (
          <TableRow
              style={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: '50%'}}
              key={row.patentNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patentNo}
              </TableCell>
                  <TableCell align="left" >
                  { row.description }
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
