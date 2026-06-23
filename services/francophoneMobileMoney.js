const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const francophoneMobileMoney = async (payload) => {
  try {
    const response = await flw.MobileMoney.franco_phone(payload);
    return response;
  } catch (error) {
    console.error('Francophone Mobile Money API error:', error);
    throw error;
  }
};

module.exports = francophoneMobileMoney;
