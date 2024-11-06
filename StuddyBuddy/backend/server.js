const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: ' http://localhost:3000', credentials: true }));
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Study Platform API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}/`);
});
