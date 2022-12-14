import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import { grey, lime, red } from '@mui/material/colors';

// ==============================|| SALES COLUMN CHART ||============================== //

const Tomm3 = ({cateTon, TonAcum, VolumenAcum, result}) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const [series,setSeries] = useState([{}]);
    const line = theme.palette.divider;
    const warning = lime[300];
    const primaryMain = grey[700];
    const successDark = red[1000];

    useEffect( () => { 
        setSeries([
                {
                name: 'Suma de TON ACUM',
                data: TonAcum,
                },{
                name: 'Suma de VOLUM ACUM',
                data: VolumenAcum,
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
            yaxis: {
                title: {
                    text: 'MasaTon'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter(val) {
                        return `${val} MasaTon`;
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
                categories: cateTon,
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

export default Tomm3;
