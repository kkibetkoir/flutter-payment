const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const googlePay = async (payload) => {
  try {
    const response = await flw.Charge.googlepay(payload);
    return response;
  } catch (error) {
    console.error('Google Pay API error:', error);
    throw error;
  }
};

module.exports = googlePay;
