const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

// API Routes
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use('/api/courses', courseRoutes);  

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
