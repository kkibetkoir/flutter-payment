const express = require('express');
const router = express.Router();
const achPayment = require('../services/achPayment');

router.post('/', async (req, res) => {
  try {
    const {
      amount,
      type,
      currency,
      country,
      email,
      phone_number,
      fullname,
      client_ip,
      redirect_url,
      device_fingerprint,
      meta,
    } = req.body;

    const payload = {
      tx_ref: `ACH-${Date.now()}`,
      amount: amount || '100',
      type: type || 'ach_payment',
      currency: currency || 'ZAR',
      country: country || 'SA',
      email: email || 'olufemi@flw.com',
      phone_number: phone_number || '0902620185',
      fullname: fullname || 'Olufemi Obafunmiso',
      client_ip: client_ip || '154.123.220.1',
      redirect_url:
        redirect_url || 'http://olufemiobafunmiso.com/u/payment-completed',
      device_fingerprint: device_fingerprint || '62wd23423rq324323qew1',
      meta: meta || { flightID: '123949494DC' },
    };

    const result = await achPayment(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'ACH payment initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
