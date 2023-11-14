import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TextField , InputAdornment  } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';



function createData(id,name,email,score) {
  return { id,name,email,score };
}

const initialRows = [
  createData('TAN123','Cupcake', 'abc@gmail.com', 94),
  createData('TAN123','Donut', 'abc@gmail.com', 87),
  createData('TAN124','Eclair', 'abc@gmail.com', 45),
  createData('TAN123','Frozen yoghurt', 'abc@gmail.com', 34),
  createData('TAN123','Gingerbread', 'abc@gmail.com',56),
  createData('TAN123','Honeycomb', 'abc@gmail.com', 32),
  createData('TAN123','Ice cream sandwich', 'abc@gmail.com', 90),
  createData('TAN126','Jelly Bean', 'abc@gmail.com', 0),
  createData('TAN123','KitKat', 'abc@gmail.com', 20),
  createData('TAN127','Lollipop', 'abc@gmail.com', 2),
  createData('TAN123','Marshmallow', 'abc@gmail.com', 0),
  createData('TAN128','Nougat', 'abc@gmail.com', 10),
  createData('TAN123','Oreo', 'abc@gmail.com', 10),
].sort((a, b) => (a.score < b.score ? 1 : -1));

export default function Detail() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchvalue, setsearchvalue] = React.useState('');

  
  const rows = searchvalue
    ? initialRows.filter((row) => row.id.toLowerCase().startsWith(searchvalue.toLowerCase()))
    : initialRows;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    (page-1) > 0 ? Math.max(0, (1 + page -1) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const searchHandler=(event)=>{
    setsearchvalue(event.target.value)
    
  }

  const clearSearch = (event)=>{
    setsearchvalue('')
  }

  return (
    <>
    <div>
      <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>
      <Box sx={{display:'flex' ,  justifyContent:'space-between' , alignItems:'center'}}>
          <p className='text-red-600 font-semibold '>CLUSTER PROGRAM MANAGER</p>
          <div className='w-max'>
              <button type='submit' className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Back
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
          </div>

      </Box>
    </div>
    <div className='mt-10'>
      <Box sx={{display:'flex' ,  justifyContent:'space-between' , alignItems:'center',marginBottom:'30px'}}>

          <Box sx={{ maxWidth: 130 , display:'flex' , justifyContent:'center' , alignItems:'center',gap:'15px'}}>
              <FormControl fullWidth size='small'>
                  <InputLabel id="show">Show</InputLabel>
                  <Select
                  labelId="show"
                  id="select"
                  value={rowsPerPage}
                  label="Show"
                  onChange={handleChangeRowsPerPage}
                  >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={rows.length}>ALL</MenuItem>
                  </Select>
              </FormControl>
              <p>Entities</p>
          </Box>

          <TextField
          label='search'
          value={searchvalue}
          size='small'
          InputProps={{           
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchvalue && (
                  <InputAdornment position="end">
                    <ClearIcon onClick={clearSearch} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
              )
            }}
            onChange={searchHandler}
          />
      </Box>

        <TableContainer className='border-2 border-gray-100 rounded-lg'>
            
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
                <TableRow className='bg-gray-200'>
                    <TableCell>Applicant id</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >email</TableCell>
                    <TableCell >Score</TableCell>
                    <TableCell >View</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                ? rows.slice((page-1) * rowsPerPage, (page-1)* rowsPerPage + rowsPerPage)
                : rows
                ).map((row) => (
                <TableRow hover key={row.name}>
                    <TableCell>
                    {row.id}
                    </TableCell>
                    <TableCell >
                    {row.name}
                    </TableCell>
                    <TableCell  >
                    {row.email}
                    </TableCell>
                    <TableCell  >
                    {row.score}
                    </TableCell>
                    <TableCell  >
                    view
                    </TableCell>
                </TableRow>
                ))}
                {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
                )}
            </TableBody>
            </Table>
            
        </TableContainer>
        <Stack spacing={2} direction='row' className='mt-5 justify-between items-center'>
            <div>
                <p>showing {((page-1)*rowsPerPage)+1} to {((page-1)*rowsPerPage)+rowsPerPage} of {rows.length} enties</p>
            </div>
            <Pagination count={Math.ceil(rows.length/rowsPerPage)} defaultPage={1} variant="outlined" shape="rounded" onChange={handleChangePage} />
        </Stack>
    </div>
    </>
   
  );
}