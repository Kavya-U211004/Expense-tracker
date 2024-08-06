import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const lineChartData = {
        labels: incomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: 'red',
                tension: 0.2,
            },
        ],
    };

    const pieChartData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [incomes.reduce((acc, curr) => acc + curr.amount, 0), expenses.reduce((acc, curr) => acc + curr.amount, 0)],
                backgroundColor: ['green', 'red'],
                weight: 1,
            },
        ],
    };

    const barChartData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [incomes.reduce((acc, curr) => acc + curr.amount, 0), expenses.reduce((acc, curr) => acc + curr.amount, 0)],
                barThickness: 100,
                backgroundColor: ['green', 'red'],
            },
        ],
    };

    const pieChartOptions = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    generateLabels: function(chart) {
                        return chart.data.labels.map(function(label, index) {
                            return {
                                text: label ,
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                strokeStyle: chart.data.datasets[0].backgroundColor[index],
                                lineWidth: 1,
                                index: index,
                            };
                        });
                    }
                }
            }
        },
    };
    
    
    const barChartOptions = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    generateLabels: function(chart) {
                        return chart.data.labels.map(function(label, index) {
                            return {
                                text: label ,
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                strokeStyle: chart.data.datasets[0].backgroundColor[index],
                                lineWidth: 1,
                                index: index,
                            };
                        });
                    }
                }
            }
        }
    };

    return (
        <ChartContainer>
            <ChartStyled>
            <Line data={lineChartData} />
            </ChartStyled>
            <ChartStyled>
            <Bar data={barChartData} options={barChartOptions} />
            </ChartStyled>
            <ChartStyled>
                <Doughnut data={pieChartData} options={pieChartOptions} style={{ width: '300px' }}/>
            </ChartStyled>
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const ChartStyled = styled.div`
    background: transparent;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    margin: 2rem;
    width:100%;
    display:flex;
    justify-content: center;
`;

export default Chart;
