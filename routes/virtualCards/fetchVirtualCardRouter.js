const express = require('express');
const router = express.Router();
const fetchVirtualCard = require('../../services/virtualCards/fetchVirtualCard');

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
    const result = await fetchVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch virtual card',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required'
      });
    }

    const payload = { id };
    const result = await fetchVirtualCard(payload);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch virtual card',
      error: error.message,
    });
  }
});

module.exports = router;