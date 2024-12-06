const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { verifyToken, isAdmin } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());  // Allow cross-origin requests

// API Routes
app.use('/api/auth', authRoutes);

// Example of a protected route accessible only by admin
app.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.send('Welcome, Admin!');
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
