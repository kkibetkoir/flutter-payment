const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const tanzaniaMobileMoney = async (payload) => {
  try {
    const response = await flw.MobileMoney.tanzania(payload);
    return response;
  } catch (error) {
    console.error('Tanzania Mobile Money API error:', error);
    throw error;
  }
};

module.exports = tanzaniaMobileMoney;
