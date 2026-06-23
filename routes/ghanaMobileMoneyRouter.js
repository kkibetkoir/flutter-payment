const express = require('express');
const router = express.Router();
const ghanaMobileMoney = require('../services/ghanaMobileMoney');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, network, email, phone_number, fullname } =
      req.body;

    const payload = {
      tx_ref: `GH-${Date.now()}`,
      amount: amount || '150',
      currency: currency || 'GHS',
      network: network || 'VODAFONE',
      email: email || 'stefan.wexler@hotmail.eu',
      phone_number: phone_number || '054709929220',
      fullname: fullname || 'Yolande Aglaé Colbert',
      device_fingerprint: '62wd23423rq324323qew1',
    };

    const result = await ghanaMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ghana Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
