const express = require('express');
const router = express.Router();
const ugandaMobileMoney = require('../services/ugandaMobileMoney');

router.post('/', async (req, res) => {
  try {
    const {
      amount,
      email,
      phone_number,
      currency,
      fullname,
      redirect_url,
      voucher,
      network,
    } = req.body;

    const payload = {
      tx_ref: `UG-${Date.now()}`,
      amount: amount || '1500',
      email: email || 'olufemi@flw.com',
      phone_number: phone_number || '054709929220',
      currency: currency || 'UGX',
      fullname: fullname || 'Olufemi Obafunmiso',
      redirect_url:
        redirect_url || 'https://rave-webhook.herokuapp.com/receivepayment',
      voucher: voucher || '128373',
      network: network || 'MTN',
    };

    const result = await ugandaMobileMoney(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Uganda Mobile Money initiation failed',
      error: error.message,
    });
  }
});

module.exports = router;
