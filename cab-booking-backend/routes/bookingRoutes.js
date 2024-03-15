const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');


router.post('/', async (req, res) => {
  const { email, source, destination, startTime } = req.body;

  try {
    
    if (source === destination) {
      return res.status(400).json({ message: 'Source and destination must be different.' });
    }

    const existingBooking = await Booking.findOne({
      $or: [
        { source, destination, $or: [{ startTime: { $lt: startTime }, endTime: { $gt: startTime } }, { startTime: { $lt: endTime }, endTime: { $gt: endTime } }] },
        { source: destination, destination: source, $or: [{ startTime: { $lt: startTime }, endTime: { $gt: startTime } }, { startTime: { $lt: endTime }, endTime: { $gt: endTime } }] }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Cab already booked for the provided time slot.' });
    }

  
    const endTime = calculateEndTime(startTime, source, destination); 

    const booking = new Booking({
      email,
      source,
      destination,
      startTime,
      endTime
    });

    await booking.save();
    res.status(201).json({ booking, message: 'Booking successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const calculateEndTime = (startTime, source, destination) => {
  return new Date(new Date(startTime).getTime() + 15 * 60000).toISOString();
};

module.exports = router;
