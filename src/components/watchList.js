import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

const rows = [
  {
    name:'Sales'
  },
  {
    name:'Advertising'
  },
  {
    name:'Inventory'
  },
  {
    name:'Entertainment'
  },
  {
    name:'Product'
  }
]

export default function WatchList(props) {
  const data = []
  for(let i=0;i<rows.length;i++){
    data.push({name:rows[i].name,month:(props.data[i].value*8.36).toFixed(2),ytd:(props.data[i].value*52.56).toFixed(2)})
  }
  console.log(data)
  return (
    <React.Fragment>
      <Title>Account WatchList</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">This Month</TableCell>
            <TableCell align="right">YTD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{row.ytd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}