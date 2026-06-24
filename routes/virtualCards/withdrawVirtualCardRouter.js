const express = require('express');
const router = express.Router();
const withdrawVirtualCard = require('../../services/virtualCards/withdrawVirtualCard');

router.post('/', async (req, res) => {
  try {
    const { id, amount } = req.body;

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
      amount: amount
    };

    const result = await withdrawVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to withdraw from virtual card',
      error: error.message,
    });
  }
});

module.exports = router;