import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import { Grid, MenuItem, TextField } from '@mui/material';
import { lime } from '@mui/material/colors';
// utils
// import { fNumber } from '../../../utils/formatNumber';
// components
// import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

QDeEmbarquesmes.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
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

function QDeEmbarquesmes({ title, subheader, ...other }) {

  const [value, setValue] = useState('Dia');
  const [series,setSeries] = useState([]);

  const [userList, setUserList] = useState([])
  const [result, setResult] = useState([])
  const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
  const [selectedUser, setSelectedUser] = useState([]);

  const Embar = userList.map((i) => i.Embarque);
  const ton = userList.map((i) => i.VolumenTon);
  const m3 = userList.map((i) => i.Masa); 

    let EMb = Embar.reduce(
    (acc, r) => Number.parseInt(r) + acc, -Embar[0]);
    EMb += Number.parseInt(Embar);  
    let total = ton.reduce(
      (acc, r) => Number.parseInt(r) + acc, -ton[0]);
      total += Number.parseInt(ton);
    let M3 = m3.reduce(
      (acc, r) => Number.parseInt(r) + acc, -m3[0]);
      M3 += Number.parseInt(m3);

 
  const [openEdit, setOpenEdit] = useState(false);

  useEffect( () => { 
    const getUsers = async () => {
      const {data} = await axios.get("http://localhost:3001/MostrarCliente")
      setUserList(data)
      const objList = {};
      data.forEach((Empresa) => {
      if (!objList[Empresa.Empresa]) objList[Empresa.Empresa] = { 
        ... Empresa,
        Embarque: 0,
        cantidad: 0,
      };
      objList[Empresa.Empresa].cantidad += 0 ;
      objList[Empresa.Empresa].Embarque += Empresa.Embarque;
      });
      const result = Object.keys(objList).map((key) => objList[key]);
      setResult(result)
    }
    getUsers();
  }, []);

  const chartSeries = result.map((i) => i.Embarque);


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
      categories: [...result.map(i => i.Empresa)],
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

export default QDeEmbarquesmes;