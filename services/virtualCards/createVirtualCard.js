const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const createVirtualCard = async (payload) => {
  try {
    const response = await flw.VirtualCard.create(payload);
    return response;
  } catch (error) {
    console.error('Create Virtual Card API error:', error);
    throw error;
  }
};

module.exports = createVirtualCard;