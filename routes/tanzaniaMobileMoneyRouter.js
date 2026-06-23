const express = require('express');
const router = express.Router();
const tanzaniaMobileMoney = require('../services/tanzaniaMobileMoney');

router.post('/', async (req, res) => {
  try {
    const {
      amount,
      currency,
      network,
      email,
      phone_number,
      fullname,
      client_ip,
      device_fingerprint,
      meta,
    } = req.body;

    const payload = {
      tx_ref: `TZ-${Date.now()}`,
      amount: amount || '150',
      currency: currency || 'TZS',
      network: network || 'Halopesa',
      email: email || 'user@example.com',
      phone_number: phone_number || '0782835136',
      fullname: fullname || 'Yolande Aglaé Colbert',
      client_ip: client_ip || '154.123.220.1',
      device_fingerprint: device_fingerprint || '62wd23423rq324323qew1',
      meta: meta || { flightID: '213213AS' },
    };

    const result = await tanzaniaMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Tanzania Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
