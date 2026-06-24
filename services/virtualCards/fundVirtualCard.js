const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const fundVirtualCard = async (payload) => {
  try {
    const response = await flw.VirtualCard.fund(payload);
    return response;
  } catch (error) {
    console.error('Fund Virtual Card API error:', error);
    throw error;
  }
};

module.exports = fundVirtualCard;