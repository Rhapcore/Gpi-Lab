import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { grey, lime, red } from '@mui/material/colors';

// ==============================|| SALES COLUMN CHART ||============================== //

const TipoDeproductos = ({result,retonTipoPro,rem3TipoPro}) => {

    const theme = useTheme();
    const [series,setSeries] = useState([]);
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.black;
    const warning = lime[300];
    const primaryMain = grey[700];
    const successDark = red[1000];

    useEffect( () => { 
        setSeries([
                {
                name: 'Suma de TON ACUM',
                data: retonTipoPro,
                },{
                name: 'Suma de VOLUM ACUM',
                data: rem3TipoPro,
                }]) }, 
        [result]);

        
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
    },
    yaxis: {
        title: {
            text: 'Total'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `$ ${val} Acumulado`;
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
                categories: [...result.map(i => i.Producto)],
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
            <ReactApexChart options={options} series={series} type="bar" height={535} />
        </div>
    );
};

export default TipoDeproductos;
