import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { lime } from '@mui/material/colors';
// utils
// import { fNumber } from '../../../utils/formatNumber';
// components
// import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

QDeEmbarquesmes.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

const status = [
  {
      value: 'Dia',
      label: 'Dia'
  },
  {
      value: 'Semana',
      label: 'Semana'
  },
  {
      value: 'Mes',
      label: 'Mes'
  }
];

export default function QDeEmbarquesmes({ title, subheader, ...other }) {

  const [value, setValue] = useState('Dia');
  const [userList, setUserList] = useState([])

  const getUsers = async () => {
    const {data} = await axios.get("http://localhost:3001/MostrarCliente")
    setUserList(data)
  }


  const chartLabels = userList.map((i) => i.Empresa);
  const chartSeries = userList.map((i) => i.Embarque);


  useEffect( () => { getUsers() }, [getUsers]);
  const chartOptions = ({
    tooltip: {
      colors: lime[500],
      marker: { show: false },
      y: {
        formatter: (seriesName) => (seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '40%', borderRadius: 5 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other} >
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 2 }} dir="ltr">
      <Grid container >
      <Grid item xs={12}>
      <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
      </Grid>
      <Grid item>
      <TextField
        id="standard-select-currency"
        select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        >
      {status.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
          </MenuItem>
          ))}
          </TextField>
          </Grid>
          </Grid>
          </Grid>
          </Grid>
          <p> </p>
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions}  height={400} />
      
      </Box>
    </Card>
  );
}
