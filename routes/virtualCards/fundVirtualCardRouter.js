const express = require('express');
const router = express.Router();
const fundVirtualCard = require('../../services/virtualCards/fundVirtualCard');

router.post('/', async (req, res) => {
  try {
    const { id, amount, debit_currency } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required'
      });
    }

    const payload = {
      id: id,
      amount: amount,
      debit_currency: debit_currency || 'NGN'
    };

    const result = await fundVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fund virtual card',
      error: error.message,
    });
  }
});

module.exports = router;