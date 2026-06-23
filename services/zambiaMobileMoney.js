const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const zambiaMobileMoney = async (payload) => {
  try {
    const response = await flw.MobileMoney.zambia(payload);
    return response;
  } catch (error) {
    console.error('Zambia Mobile Money API error:', error);
    throw error;
  }
};

module.exports = zambiaMobileMoney;
