const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const ghanaMobileMoney = async (payload) => {
  try {
    const response = await flw.MobileMoney.ghana(payload);
    return response;
  } catch (error) {
    console.error('Ghana Mobile Money API error:', error);
    throw error;
  }
};

module.exports = ghanaMobileMoney;
