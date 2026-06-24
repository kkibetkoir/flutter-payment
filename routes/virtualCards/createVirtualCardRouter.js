const express = require('express');
const router = express.Router();
const createVirtualCard = require('../../services/virtualCards/createVirtualCard');

router.post('/', async (req, res) => {
  try {
    const {
      currency,
      amount,
      debit_currency,
      billing_name,
      billing_address,
      billing_city,
      billing_state,
      billing_postal_code,
      billing_country,
      first_name,
      last_name,
      date_of_birth,
      email,
      phone,
      title,
      gender,
      callback_url
    } = req.body;

    // Validate required fields
    if (!currency || !amount || !billing_name || !billing_address || !billing_city || 
        !billing_state || !billing_postal_code || !billing_country || !first_name || 
        !last_name || !date_of_birth || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please provide all billing and personal information.'
      });
    }

    const payload = {
      currency: currency || 'USD',
      amount: amount || 5,
      debit_currency: debit_currency || 'NGN',
      billing_name: billing_name,
      billing_address: billing_address,
      billing_city: billing_city,
      billing_state: billing_state,
      billing_postal_code: billing_postal_code,
      billing_country: billing_country,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth,
      email: email,
      phone: phone,
      title: title || 'MR',
      gender: gender || 'M',
      callback_url: callback_url || 'https://webhook.site/b67965fa-e57c-4dda-84ce-0f8d6739b8a5'
    };

    const result = await createVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create virtual card',
      error: error.message,
    });
  }
});

module.exports = router;