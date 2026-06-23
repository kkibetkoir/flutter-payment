const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const ukBankAccount = async (payload) => {
  try {
    const response = await flw.Charge.uk(payload);
    return response;
  } catch (error) {
    console.error('UK Bank Account API error:', error);
    throw error;
  }
};

module.exports = ukBankAccount;
