const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const withdrawVirtualCard = async (payload) => {
  try {
    const response = await flw.VirtualCard.withdraw_funds(payload);
    return response;
  } catch (error) {
    console.error('Withdraw Virtual Card API error:', error);
    throw error;
  }
};

module.exports = withdrawVirtualCard;