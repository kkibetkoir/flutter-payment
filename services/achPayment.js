const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const achPayment = async (payload) => {
  try {
    const response = await flw.Charge.ach(payload);
    return response;
  } catch (error) {
    console.error('ACH Payment API error:', error);
    throw error;
  }
};

module.exports = achPayment;
