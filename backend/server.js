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

const fetch = require('node-fetch');

async function getVippsToken() {
  const response = await fetch('https://api.vipps.no/access-token-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.VIPPS_CLIENT_ID,
      client_secret: process.env.VIPPS_CLIENT_SECRET
    })
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Failed to fetch access token');
  }
  return data.access_token;
}

app.listen(3000, () => console.log('Server running on port 3000'));
