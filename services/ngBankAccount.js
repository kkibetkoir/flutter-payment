const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const ngBankAccount = async (payload) => {
  try {
    const response = await flw.Charge.ng(payload);
    return response;
  } catch (error) {
    console.error('NG Bank Account API error:', error);
    throw error;
  }
};

module.exports = ngBankAccount;
