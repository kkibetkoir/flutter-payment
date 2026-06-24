const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const blockVirtualCard = async (payload) => {
  try {
    const response = await flw.VirtualCard.block(payload);
    return response;
  } catch (error) {
    console.error('Block Virtual Card API error:', error);
    throw error;
  }
};

module.exports = blockVirtualCard;