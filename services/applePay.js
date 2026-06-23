const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const applePay = async (payload) => {
  try {
    const response = await flw.Charge.applepay(payload);
    return response;
  } catch (error) {
    console.error('Apple Pay API error:', error);
    throw error;
  }
};

module.exports = applePay;
