const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');

// Geting all cabs
router.get('/cabs', async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.json(cabs);
  } catch (error) {
    console.error('Error fetching cabs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
