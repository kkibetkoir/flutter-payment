const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const fetchAllVirtualCards = async () => {
  try {
    const response = await flw.VirtualCard.fetch_all();
    return response;
  } catch (error) {
    console.error('Fetch All Virtual Cards API error:', error);
    throw error;
  }
};

module.exports = fetchAllVirtualCards;