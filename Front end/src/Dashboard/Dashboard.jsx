import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import StatisticsCard from '../StatisticsCard/StatisticsCard';
import './Dashboard.css';

const Dashboard = () => {
    const transactionsMonths = [
        "Select  Month","January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('Search Month');
    const [totalSold, setTotalSold] = useState(0);
    const [totalUnsold, setTotalUnsold] = useState(0);
    const [totalSalesAmount, setTotalSalesAmount] = useState(0);
    const [priceRangeData, setPriceRangeData] = useState([]);

    // Fetch transactions on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/initialize');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    // Function to handle the selection of a month and filter transactions
    const handleMonthChange = (event) => {
        const selectedMonthIndex = transactionsMonths.indexOf(event.target.value);
        setSelectedMonth(event.target.value);

        const filtered = transactions.filter((transaction) => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth();
            return transactionMonth === selectedMonthIndex;
        });

        const soldItems = filtered.filter(transaction => transaction.sold);
        const unsoldItems = filtered.filter(transaction => !transaction.sold);
        const totalSales = soldItems.reduce((acc, item) => acc + item.price, 0);

        // Update state
        setFilteredTransactions(filtered);
        setTotalSold(soldItems.length);
        setTotalUnsold(unsoldItems.length);
        setTotalSalesAmount(totalSales);

        // Update price range data
        calculatePriceRangeData(filtered);
    };

    // Calculate the number of items in each price range
    const calculatePriceRangeData = (transactions) => {
        const priceRanges = [
            { range: '0-100', count: 0 },
            { range: '101-200', count: 0 },
            { range: '201-300', count: 0 },
            { range: '301-400', count: 0 },
            { range: '401-500', count: 0 },
            { range: '501-600', count: 0 },
            { range: '601-700', count: 0 },
            { range: '701-800', count: 0 },
            { range: '801-900', count: 0 },
            { range: '901-above', count: 0 }
        ];

        transactions.forEach((transaction) => {
            const price = transaction.price;
            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            else if (price <= 300) priceRanges[2].count++;
            else if (price <= 400) priceRanges[3].count++;
            else if (price <= 500) priceRanges[4].count++;
            else if (price <= 600) priceRanges[5].count++;
            else if (price <= 700) priceRanges[6].count++;
            else if (price <= 800) priceRanges[7].count++;
            else if (price <= 900) priceRanges[8].count++;
            else priceRanges[9].count++;
        });

        setPriceRangeData(priceRanges);
    };

    return (
        <div className="app">
            <div>
                <h1>Transaction Dashboard</h1>
                <select className= "button" onChange={handleMonthChange} value={selectedMonth}>
                    {transactionsMonths.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

           
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredTransactions.length > 0 ? filteredTransactions : transactions).map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.category}</td>
                            <td>{`${transaction.sold}`}</td>
                            <td><img src={transaction.image} alt="product" width="50" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <StatisticsCard totalSold={totalSold} totalUnsold={totalUnsold} totalSalesAmount={totalSalesAmount} />

            {/* Bar Chart for Price Range */}
            <div className="chat">
            <h1>Bar Chart stats</h1>
            <ResponsiveContainer  width="90%" height={400} >
                <BarChart data={priceRangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
};

export default Dashboard;
