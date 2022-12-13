import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import { Grid} from '@mui/material';
import { lime } from '@mui/material/colors';
import { BASE_URL } from "../misc/consts";

// ----------------------------------------------------------------------

QDeEmbarquesmes.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

function QDeEmbarquesmes({ title, subheader,Empresa,Embarque, ...other}) {

  const [setUserList] = useState([])

  useEffect( () => { 
    const getUsers = async () => {
      const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
      setUserList(data)
    }
    getUsers();
  }, []);

  const chartSeries = Embarque;

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
      categories: Empresa,
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
          </Grid>
          </Grid>
          </Grid>
          <p> </p>
          
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions}  height={400} />
      
      </Box>
    </Card>
  );
}

export default QDeEmbarquesmes;