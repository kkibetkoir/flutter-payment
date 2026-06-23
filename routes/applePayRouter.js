const express = require('express');
const router = express.Router();
const applePay = require('../services/applePay');

router.post('/', async (req, res) => {
  try {
    const {
      amount,
      currency,
      email,
      fullname,
      redirect_url,
      client_ip,
      device_fingerprint,
      billing_zip,
      billing_city,
      billing_address,
      billing_state,
      billing_country,
      phone_number,
      meta,
    } = req.body;

    const payload = {
      tx_ref: `AP-${Date.now()}`,
      amount: amount || '10',
      currency: currency || 'USD',
      email: email || 'user@example.com',
      fullname: fullname || 'Yolande Aglaé Colbert',
      redirect_url: redirect_url || 'https://flutterwave.ng',
      client_ip: client_ip || '192.168.0.1',
      device_fingerprint: device_fingerprint || 'gdgdhdh738bhshsjs',
      billing_zip: billing_zip || '15101',
      billing_city: billing_city || 'allison park',
      billing_address: billing_address || '3563 Huntertown Rd',
      billing_state: billing_state || 'Pennsylvania',
      billing_country: billing_country || 'US',
      phone_number: phone_number || '09012345678',
      meta: meta || { metaname: 'testmeta', metavalue: 'testvalue' },
    };

    const result = await applePay(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Apple Pay initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
