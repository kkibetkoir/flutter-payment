const express = require('express');
const router = express.Router();
const getVirtualCardTransactions = require('../../services/virtualCards/getVirtualCardTransactions');

router.post('/', async (req, res) => {
  try {
    const { id, from, to, index, size } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = {
      id: id,
      from: from || '2019-01-01',
      to: to || new Date().toISOString().split('T')[0], // Today's date
      index: index || '0',
      size: size || '10'
    };

    const result = await getVirtualCardTransactions(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get virtual card transactions',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to, index, size } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = {
      id: id,
      from: from || '2019-01-01',
      to: to || new Date().toISOString().split('T')[0],
      index: index || '0',
      size: size || '10'
    };

    const result = await getVirtualCardTransactions(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get virtual card transactions',
      error: error.message,
    });
  }
});

module.exports = router;