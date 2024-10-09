import React from 'react';
import { Pie } from 'react-chartjs-2';

const TransactionsPieChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Categories',
                data: Object.values(data),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div>
            <h2>Pie Chart of Categories</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default TransactionsPieChart;
