const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const enaira = async (payload) => {
  try {
    const response = await flw.Charge.enaira(payload);
    return response;
  } catch (error) {
    console.error('eNaira API error:', error);
    throw error;
  }
};

module.exports = enaira;
