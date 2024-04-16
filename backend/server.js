const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Vipps payment initiation endpoint
app.post('/initiate-payment', async (req, res) => {
  const token = await getVippsToken(); // Function to authenticate with Vipps
  const response = await fetch('https://api.vipps.no/ecomm/v2/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerInfo: {
        mobileNumber: '47xxxxxxxx', // Customer's phone number
      },
      transaction: {
        amount: req.body.amount, // Amount to be charged
        transactionText: 'Purchase of Sweetcoins'
      }
    })
  });

  const data = await response.json();
  res.send(data);
});

async function getVippsToken() {
  // Fetch token logic here using your Vipps credentials
  return 'your_access_token'; // This should be fetched dynamically
}

app.listen(3000, () => console.log('Server running on port 3000'));
