import React from 'react';

const TransactionsStatistics = ({ statistics }) => {
    return (
        <div>
            <h2>Statistics</h2>
            <p>Total Sales: {statistics.total_sales || 0}</p>
            <p>Total Sold: {statistics.total_sold || 0}</p>
            <p>Total Not Sold: {statistics.total_not_sold || 0}</p>
        </div>
    );
};

export default TransactionsStatistics;
