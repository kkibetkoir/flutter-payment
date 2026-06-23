const express = require('express');
const router = express.Router();
const francophoneMobileMoney = require('../services/francophoneMobileMoney');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, country, email, phone_number, fullname } =
      req.body;

    const payload = {
      tx_ref: `FR-${Date.now()}`,
      amount: amount || '10',
      currency: currency || 'XAF',
      country: country || 'CM',
      email: email || 'stefan.wexler@hotmail.eu',
      phone_number: phone_number || '23700000020',
      fullname: fullname || 'Yolande Aglaé Colbert',
    };

    const result = await francophoneMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Francophone Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
