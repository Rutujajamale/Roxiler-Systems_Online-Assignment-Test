import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TransactionsTable from './TransactionsTable';
import TransactionsStatistics from './TransactionsStatistics';
import TransactionsBarChart from './TransactionsBarChart';
import TransactionsPieChart from './TransactionsPieChart';

function App() {
    const [month, setMonth] = useState('3'); // March selected by default
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    const fetchStatistics = useCallback(async () => {
        const response = await axios.get(`/api/transactions/statistics?month=${month}`);
        setStatistics(response.data);
    }, [month]);

    const fetchBarChartData = useCallback(async () => {
        const response = await axios.get(`/api/transactions/bar_chart?month=${month}`);
        setBarChartData(response.data);
    }, [month]);

    const fetchPieChartData = useCallback(async () => {
        const response = await axios.get(`/api/transactions/pie_chart?month=${month}`);
        setPieChartData(response.data);
    }, [month]);

    useEffect(() => {
        fetchStatistics();
        fetchBarChartData();
        fetchPieChartData();
    }, [fetchStatistics, fetchBarChartData, fetchPieChartData]);

    return (
        <div>
            <h1>Transaction Management</h1>
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <TransactionsStatistics statistics={statistics} />
            <TransactionsTable month={month} />
            <TransactionsBarChart data={barChartData} />
            <TransactionsPieChart data={pieChartData} />
        </div>
    );
}

export default App;
