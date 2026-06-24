const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const getVirtualCardTransactions = async (payload) => {
  try {
    const response = await flw.VirtualCard.transactions(payload);
    return response;
  } catch (error) {
    console.error('Get Virtual Card Transactions API error:', error);
    throw error;
  }
};

module.exports = getVirtualCardTransactions;