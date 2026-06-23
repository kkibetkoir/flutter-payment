const express = require('express');
const { resolve } = require('path');
const Flutterwave = require('flutterwave-node-v3');
require('dotenv').config();

// 1. Import your M-Pesa router file
//const mpesaRouter = require('./routes/mpesaRouter');
const mpesaRouter = require('./routes/payment');

const app = express();
const port = 3010;

const flw = new Flutterwave(
  'FLWPUBK-40a5224fd98f788a9f1a79d4d03b80d2-X',
  'FLWSECK-faeb43596b55d5a74480d602324ca24f-19ef53d86a0vt-X'
);

app.use(express.static('static'));
app.use(express.json()); // Essential: Must be placed above the routes!

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// 2. Mount your router onto a URL path (e.g., /api/mpesa)
app.use('/api/mpesa', mpesaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
