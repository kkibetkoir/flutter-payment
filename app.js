const express = require('express');
const http = require('http');
const { resolve } = require('path');
const cors = require('cors');
require('dotenv').config();

// Import all routers
const mpesaRouter = require('./routes/mpesaRouter');
const cardRouter = require('./routes/cardRouter');
const bankTransferRouter = require('./routes/bankTransferRouter');
const ngBankAccountRouter = require('./routes/ngBankAccountRouter');
const ukBankAccountRouter = require('./routes/ukBankAccountRouter');
const achPaymentRouter = require('./routes/achPaymentRouter');
const ussdRouter = require('./routes/ussdRouter');
const ghanaMobileMoneyRouter = require('./routes/ghanaMobileMoneyRouter');
const rwandaMobileMoneyRouter = require('./routes/rwandaMobileMoneyRouter');
const ugandaMobileMoneyRouter = require('./routes/ugandaMobileMoneyRouter');
const francophoneMobileMoneyRouter = require('./routes/francophoneMobileMoneyRouter');
const zambiaMobileMoneyRouter = require('./routes/zambiaMobileMoneyRouter');
const tanzaniaMobileMoneyRouter = require('./routes/tanzaniaMobileMoneyRouter');
const enairaRouter = require('./routes/enairaRouter');
const applePayRouter = require('./routes/applePayRouter');
const googlePayRouter = require('./routes/googlePayRouter');

// ============== NEW: Import transaction routers ==============
const fetchTransactionsRouter = require('./routes/transactions/fetchTransactionsRouter');
const getTransactionFeeRouter = require('./routes/transactions/getTransactionFeeRouter');
const resendWebhookRouter = require('./routes/transactions/resendWebhookRouter');
const verifyTransactionRouter = require('./routes/transactions/verifyTransactionRouter');
const verifyTransactionByRefRouter = require('./routes/transactions/verifyTransactionByRefRouter');
const createRefundRouter = require('./routes/transactions/createRefundRouter');
const viewTimelineRouter = require('./routes/transactions/viewTimelineRouter');

const app = express();
const PORT = process.env.PORT || 3010;
const server = http.createServer(app);

// Middleware
// ===== CORS CONFIGURATION =====
// Option 1: Allow all origins (for development)
app.use(cors());

// Option 2: Allow specific origins (for production)
/*const allowedOrigins = [
    'https://rise.app',
    'https://www.rise.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5500',
    'https://your-frontend-domain.com'
];*/

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
  })
);

//using middleware
//const corsMiddleware = require('./middleware/cors');
//app.use(corsMiddleware);

app.use(express.static('static'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Routes
app.use('/api/mpesa', mpesaRouter);
app.use('/api/card', cardRouter);
app.use('/api/bank-transfer', bankTransferRouter);
app.use('/api/ng-bank-account', ngBankAccountRouter);
app.use('/api/uk-bank-account', ukBankAccountRouter);
app.use('/api/ach-payment', achPaymentRouter);
app.use('/api/ussd', ussdRouter);
app.use('/api/ghana-mobile-money', ghanaMobileMoneyRouter);
app.use('/api/rwanda-mobile-money', rwandaMobileMoneyRouter);
app.use('/api/uganda-mobile-money', ugandaMobileMoneyRouter);
app.use('/api/francophone-mobile-money', francophoneMobileMoneyRouter);
app.use('/api/zambia-mobile-money', zambiaMobileMoneyRouter);
app.use('/api/tanzania-mobile-money', tanzaniaMobileMoneyRouter);
app.use('/api/enaira', enairaRouter);
app.use('/api/apple-pay', applePayRouter);
app.use('/api/google-pay', googlePayRouter);

// ============== NEW: Transaction API Routes ==============
app.use('/api/transactions/fetch', fetchTransactionsRouter);
app.use('/api/transactions/fee', getTransactionFeeRouter);
app.use('/api/transactions/resend-webhook', resendWebhookRouter);
app.use('/api/transactions/verify', verifyTransactionRouter);
app.use('/api/transactions/verify-by-ref', verifyTransactionByRefRouter);
app.use('/api/transactions/refund', createRefundRouter);
app.use('/api/transactions/timeline', viewTimelineRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    services: [
      '/api/mpesa',
      '/api/card',
      '/api/bank-transfer',
      '/api/ng-bank-account',
      '/api/uk-bank-account',
      '/api/ach-payment',
      '/api/ussd',
      '/api/ghana-mobile-money',
      '/api/rwanda-mobile-money',
      '/api/uganda-mobile-money',
      '/api/francophone-mobile-money',
      '/api/zambia-mobile-money',
      '/api/tanzania-mobile-money',
      '/api/enaira',
      '/api/apple-pay',
      '/api/google-pay',
    ],

    transactions: [
      '/api/transactions/fetch',
      '/api/transactions/fee',
      '/api/transactions/resend-webhook',
      '/api/transactions/verify',
      '/api/transactions/verify-by-ref',
      '/api/transactions/refund',
      '/api/transactions/timeline',
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Payment endpoints available at /api/*`);
  console.log(`📊 Transaction endpoints available at /api/transactions/*`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
