const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const fetchVirtualCard = async (payload) => {
  try {
    const response = await flw.VirtualCard.fetch(payload);
    return response;
  } catch (error) {
    console.error('Fetch Virtual Card API error:', error);
    throw error;
  }
};

module.exports = fetchVirtualCard;