const express = require('express');
const router = express.Router();
const enaira = require('../services/enaira');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, email, fullname, phone_number, redirect_url } =
      req.body;

    const payload = {
      tx_ref: `EN-${Date.now()}`,
      amount: amount || '100',
      currency: currency || 'NGN',
      email: email || 'user@example.com',
      fullname: fullname || 'Yemi Desola',
      phone_number: phone_number || '09000000000',
      redirect_url: redirect_url || 'https://flutterwave.ng',
    };

    const result = await enaira(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'eNaira payment initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
