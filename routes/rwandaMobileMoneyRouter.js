const express = require('express');
const router = express.Router();
const rwandaMobileMoney = require('../services/rwandaMobileMoney');

router.post('/', async (req, res) => {
  try {
    const { order_id, amount, currency, email, phone_number, fullname } =
      req.body;

    const payload = {
      tx_ref: `RW-${Date.now()}`,
      order_id: order_id || `USS_URG_${Date.now()}`,
      amount: amount || '1500',
      currency: currency || 'RWF',
      email: email || 'olufemi@flw.com',
      phone_number: phone_number || '054709929220',
      fullname: fullname || 'John Madakin',
    };

    const result = await rwandaMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Rwanda Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
