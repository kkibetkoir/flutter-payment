const express = require('express');
const router = express.Router();
const unblockVirtualCard = require('../../services/virtualCards/unblockVirtualCard');

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = {
      id: id,
      status_action: 'unblock'
    };

    const result = await unblockVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to unblock virtual card',
      error: error.message,
    });
  }
});

router.put('/:id/unblock', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = {
      id: id,
      status_action: 'unblock'
    };

    const result = await unblockVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to unblock virtual card',
      error: error.message,
    });
  }
});

module.exports = router;