// services/mpesa.js
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(
  'FLWPUBK-40a5224fd98f788a9f1a79d4d03b80d2-X',
  'FLWSECK-faeb43596b55d5a74480d602324ca24f-19ef53d86a0vt-X'
);

// Accept payload as a parameter so it isn't hardcoded
const mpesa = async (payload) => {
  try {
    const response = await flw.MobileMoney.mpesa(payload);
    return response; // Return response to the router
  } catch (error) {
    console.error('Flutterwave API error:', error);
    throw error; // Throw error to be caught by the router
  }
};

module.exports = mpesa;
