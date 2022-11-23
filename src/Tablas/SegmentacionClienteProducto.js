import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';
import { grey, lime, red } from '@mui/material/colors';


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
const columnChartOptions = {
    chart: {
        type: 'bar',
        height: 430,
        toolbar: {
            show: false
        }
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
    xaxis: {
        categories: ['Cliente 1', 'Cliente 2', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5']
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

// ==============================|| SALES COLUMN CHART ||============================== //

const SegmentacionClienteproducto = () => {
    const theme = useTheme();

    const [userList, setUserList] = useState([])

    const getUsers = async () => {
      const {data} = await axios.get("http://localhost:3001/MostrarCliente")
      setUserList(data)
    }


    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = lime[300];
    const primaryMain = grey[700];
    const successDark = red[1000];

    const [series,setSeries] = useState([{}]);

    useEffect( () => { getUsers() }, []);

    useEffect( () => { 
        const ton = userList.map((i) => i.VolumenTon);
        const masa = userList.map((i) => i.Masa);
        setSeries([{
                name: 'Suma de MASA (TON)',
                data: ton,
                },{
                name: 'Suma de VOLUM (M3)',
                data: masa,
                }]) }, 
        [userList,setSeries,]);

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
                }
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
    }, [primary, secondary, line, warning, primaryMain, successDark]);

    return (
        <div id="chart">
            
            <ReactApexChart options={options} series={series} type="bar" height={518} />
        
        </div>
    );
};

export default SegmentacionClienteproducto;
