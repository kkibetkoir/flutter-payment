const express = require('express');
const router = express.Router();
const fetchAllVirtualCards = require('../../services/virtualCards/fetchAllVirtualCards');

router.get('/', async (req, res) => {
  try {
    const result = await fetchAllVirtualCards();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all virtual cards',
      error: error.message,
    });
  }
});

module.exports = router;