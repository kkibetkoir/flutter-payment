const express = require('express');
const router = express.Router();
const ngBankAccount = require('../services/ngBankAccount');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, email, phone_number, fullname } = req.body;

    const payload = {
      tx_ref: `NG-${Date.now()}`,
      amount: amount || '300',
      currency: currency || 'NGN',
      email: email || 'johndoe@gmail.com',
      phone_number: phone_number || '08074568890',
      fullname: fullname || 'john doe',
    };

    const result = await ngBankAccount(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'NG bank account charge failed',
      error: error.message,
    });
  }
});

module.exports = router;
