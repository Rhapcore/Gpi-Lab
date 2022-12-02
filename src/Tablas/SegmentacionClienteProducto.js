import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';
import { grey, lime, red } from '@mui/material/colors';
import { BASE_URL } from '../misc/consts';


// CSV
/*
const csv = require("csv-parser")
const fs = require ("fs")
const results = [];

fs.createReadStream("db_transferviwe.csv")
 .pipe(csv({}))
 .on("data", (data) => results.pucsh(data))
 .on("end", () => {
    console.log(results)
 });
*/
// chart options


// ==============================|| SALES COLUMN CHART ||============================== //

const SegmentacionClienteproducto = () => {
    const theme = useTheme();

    const [userList, setUserList] = useState([])
    const [result, setResult] = useState([])
    const [series,setSeries] = useState([{}]);
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    const warning = lime[300];
    const primaryMain = grey[700];
    const successDark = red[1000];

    useEffect( () => { 
        const getUsers = async () => {
          const {data} = await axios.get(`${BASE_URL}/MostrarCliente`)
          setUserList(data)
          const objList = {};
          data.forEach((Empresa) => {
          if (!objList[Empresa.Empresa]) objList[Empresa.Empresa] = { 
            ... Empresa,
            VolumenTon: 0,
            Masa: 0,
            cantidad: 0,
          };
          objList[Empresa.Empresa].cantidad += 0 ;
          objList[Empresa.Empresa].VolumenTon += Empresa.VolumenTon ;
          objList[Empresa.Empresa].Masa += Empresa.Masa;
          });
          const result = Object.keys(objList).map((key) => objList[key]);
          setResult(result)
        }
        getUsers();
      }, []);



        useEffect( () => { 

            const m3 = result.map((i) => i.Masa);
            const rem3 = result.map((i) => i.Masa);
            const reton = result.map((i) => i.VolumenTon);
    
            let totalreton = reton.reduce(
                (acc, r) => Number.parseInt(r) + acc, -reton[0]);
                totalreton += Number.parseInt(reton);
            let M3 = m3.reduce(
                (acc, r) => Number.parseInt(r) + acc, -reton[0]);
                M3 += Number.parseInt(m3);
    
            setSeries([
                    {
                    name: 'Suma de TON ACUM',
                    data: reton,
                    },{
                    name: 'Suma de VOLUM ACUM',
                    data: rem3,
                    }]) }, 
            [userList]);
    

const columnChartOptions = {
    chart: {
        type: 'bar',
        height: 430,
        toolbar: {
            show: false
        },
        categories: [...result.map(i => i.Empresa)]
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 8,
        colors: ['transparent']
    },
    yaxis: {
        title: {
            text: 'Masa'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `${val} Masa`;
            }
        }
    },
    legend: {
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false
        },
        markers: {
            width: 16,
            height: 16,
            radius: '50%',
            offsexX: 2,
            offsexY: 2
        },
        itemMargin: {
            horizontal: 15,
            vertical: 50
        }
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false
                }
            }
        }
    ]
};


    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [warning, primaryMain],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                },
                categories: [...result.map(i => i.Empresa)],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark, result]);

    return (
        <div id="chart">
            
            <ReactApexChart options={options} series={series} type="bar" height={518} />
        
        </div>
    );
};

export default SegmentacionClienteproducto;
