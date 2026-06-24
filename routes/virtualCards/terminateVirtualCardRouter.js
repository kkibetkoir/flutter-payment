const express = require('express');
const router = express.Router();
const terminateVirtualCard = require('../../services/virtualCards/terminateVirtualCard');

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = { id };
    const result = await terminateVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to terminate virtual card',
      error: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = { id };
    const result = await terminateVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to terminate virtual card',
      error: error.message,
    });
  }
});

module.exports = router;