const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000; // Port for your backend

// Enable CORS for your frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Route to fetch and serve the data from the third-party API
app.get('/api/initialize', async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        
        // Send the fetched data to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from third-party API:', error.message);
        res.status(500).send('Error fetching data');
    }
});

// Start the backend server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
