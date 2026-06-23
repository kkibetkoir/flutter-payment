const express = require('express');
const router = express.Router();
const ukBankAccount = require('../services/ukBankAccount');

router.post('/', async (req, res) => {
  try {
    const {
      amount,
      currency,
      email,
      phone_number,
      fullname,
      redirect_url,
      is_token_io,
    } = req.body;

    const payload = {
      tx_ref: `UK-${Date.now()}`,
      amount: amount || '10',
      currency: currency || 'GBP',
      email: email || 'olufemi@flw.com',
      phone_number: phone_number || '0902620185',
      fullname: fullname || 'Olufemi Obafunmiso',
      redirect_url: redirect_url || 'https://flutterwave.ng',
      is_token_io: is_token_io || 1,
    };

    const result = await ukBankAccount(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'UK bank account charge failed',
      error: error.message,
    });
  }
});

module.exports = router;
