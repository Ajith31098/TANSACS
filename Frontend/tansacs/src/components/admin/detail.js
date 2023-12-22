import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TextField, InputAdornment } from '@mui/material';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { LIST_APPLICANT } from '../endpoints/admin/AdminEndPoints';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingComponent from '../basecomponents/loading';
import { connect } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';





function Detail(props) {

  const { isLoading, data, isError, error } = useQuery("applicants_by_position", () => {
    return axios.get(LIST_APPLICANT(props.data_position), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${props.token}`
      }
    })
  })

  const [initialRows, setInitialRows] = React.useState([]);

  const navigate = useNavigate()
  React.useEffect(() => {
    if (!isLoading && data) {
      setInitialRows(data.data); // Update initialRows with fetched data
    }
  }, [isLoading, data]);





  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchvalue, setsearchvalue] = React.useState('');


  const rows = searchvalue
    ? initialRows.filter((row) =>
      row.application_id.toLowerCase().startsWith(searchvalue.toLowerCase()) ||
      row.user_full_name.toLowerCase().startsWith(searchvalue.toLowerCase())
    )
    : initialRows;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    (page - 1) > 0 ? Math.max(0, (1 + page - 1) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const searchHandler = (event) => {
    setsearchvalue(event.target.value)

  }

  const clearSearch = (event) => {
    setsearchvalue('')
  }

  React.useEffect(() => {



    if (props.isLogin && !props.isSuperuser) {
      navigate('tansacs/jobs')
    }

    if (!props.isLogin) {
      navigate('/')
    }

  }, [props.isLogin]);


  if (isLoading) {
    return <LoadingComponent />
  }


  if (isError) {
    navigate("/server_error_500")
  }

  if (data) {

    return (
      <>
        {/* {console.log(data.data)} */}
        <div>
          <h4 className='text-4xl text-custom-red font-bold mt-10 mb-14'>Tamil Nadu State AIDS Control Society</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className='text-custom-red font-semibold '>{props.position}</p>
            <div className='w-max'>
              <Link to={"/admin/home"} className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                Back
                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

              </Link>

            </div>

          </Box>
        </div>
        <div className='mt-10'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>

            <Box sx={{ maxWidth: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
              <FormControl fullWidth size='small'>
                <InputLabel id="show">Show</InputLabel>
                <Select
                  labelId="show"
                  id="select"
                  value={rowsPerPage}
                  label="Show"
                  onChange={handleChangeRowsPerPage}
                  name="row_per_page"
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
                  <TableCell className='uppercase'>Applicant id</TableCell>
                  <TableCell className='uppercase'>Name</TableCell>
                  <TableCell className='uppercase'>Email</TableCell>
                  <TableCell className='uppercase'>Phone Number</TableCell>
                  <TableCell className='uppercase'>overall Score</TableCell>
                  <TableCell className='uppercase'>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow hover key={row.application_id}>
                    <TableCell>
                      {row.application_id}
                    </TableCell>
                    <TableCell className='uppercase'>
                      {row.user_full_name}
                    </TableCell>
                    <TableCell  >
                      {row.username}
                    </TableCell>
                    <TableCell  >
                      {row.phone_number}
                    </TableCell>
                    <TableCell  >
                      {row.score}
                    </TableCell>
                    <TableCell  >
                      <Link to={`/admin/applicant/${row.job_id}`} className="link-style">
                        < GridViewIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {data.data.length <= 0 && (
                  <TableRow style={{ height: 53 * emptyRows }} >
                    <TableCell colSpan={6}><p className='p-10 text-custom-red'>NO APPLICANT TILL NOW</p></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </TableContainer>
          <Stack spacing={2} direction='row' className='mt-5 justify-between items-center'>
            <div>
              <p>showing {((page - 1) * rowsPerPage) + 1} to {((page - 1) * rowsPerPage) + rowsPerPage} of {rows.length} enties</p>
            </div>
            <Pagination count={Math.ceil(rows.length / rowsPerPage)} defaultPage={1} variant="outlined" shape="rounded" onChange={handleChangePage} />
          </Stack>
        </div>
      </>

    );
  }
}

const mapStateToProps = state => {


  return {

    isLogin: state.login.isLogin,
    isSuperuser: state.login.is_superuser,
    token: state.login.token
  }
}


export default connect(mapStateToProps)(Detail);
