const express = require('express');
const router = express.Router();
const zambiaMobileMoney = require('../services/zambiaMobileMoney');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, email, phone_number, fullname, order_id } =
      req.body;

    const payload = {
      tx_ref: `ZM-${Date.now()}`,
      amount: amount || '1500',
      currency: currency || 'ZMW',
      email: email || 'olufemi@flw.com',
      phone_number: phone_number || '054709929220',
      fullname: fullname || 'Olufemi Obafunmiso',
      order_id: order_id || `URF_MMGH_${Date.now()}_5981535`,
    };

    const result = await zambiaMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Zambia Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
