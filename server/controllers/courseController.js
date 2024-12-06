const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

// Set storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store the uploaded file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique file name
  },
});

const upload = multer({ storage });

// Upload Course
const uploadCourse = (req, res) => {
  const { title, price } = req.body;
  const image_key = req.file ? req.file.filename : null;

  // Check if required fields are present
  if (!title || !price || !image_key) {
    return res.status(400).send('All fields (title, price, image) are required');
  }

  const query = 'INSERT INTO courses (title, price, image_key) VALUES (?, ?, ?)';

  // Use db.query to insert data into the database
  db.query(query, [title, price, image_key], (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).send('Database error occurred');
    }

    // Send success response
    res.status(201).send('Course uploaded successfully');
  });
};

// Get all courses
const getAllCourses = (req, res) => {
  const query = 'SELECT * FROM courses'; // Query to get all courses

  db.query(query, (err, results) => {
    if (err) {
      console.error(err); 
      return res.status(500).send('Database error occurred');
    }

    // Send success response with courses data
    res.status(200).json(results); 
  });
};

module.exports = { upload, uploadCourse, getAllCourses };
