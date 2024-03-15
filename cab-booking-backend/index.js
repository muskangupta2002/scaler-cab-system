const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cabRoutes = require('./routes/cabRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', cabRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/cab-booking', {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log('Connected to MongoDB');
})
.catch((error) => {
console.error('MongoDB connection error:', error);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(Server running on port ${PORT});
});