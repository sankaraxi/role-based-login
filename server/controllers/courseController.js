const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

  if (!title || !price || !image_key) {
    return res.status(400).send('All fields (title, price, image) are required');
  }

  const query = 'INSERT INTO courses (title, price, image_key) VALUES (?, ?, ?)';


  db.query(query, [title, price, image_key], (err, result) => {
    if (err) {
      console.error(err); 
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

const deleteCourse = (req, res) => {
  const { courseId } = req.params;

  // Query to get the image_key before deleting the course
  const getImageQuery = 'SELECT image_key FROM courses WHERE course_id = ?';

  db.query(getImageQuery, [courseId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error occurred' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const imageKey = results[0].image_key;
    const imagePath = path.join(__dirname, '..', 'uploads', imageKey);

    // Delete the course from the database
    const deleteQuery = 'DELETE FROM courses WHERE course_id = ?';

    db.query(deleteQuery, [courseId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete course' });
      }

      if (result.affectedRows > 0) {
        //To Remove the image file from the uploads folder
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Failed to delete the image:', err);
            return res.status(500).json({
              message: 'Course deleted, but failed to delete associated image',
            });
          }

          res.status(200).json({ message: 'Course and image deleted successfully' });
        });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    });
  });
};

const updateCourse = (req, res) => {
  const { courseId } = req.params;
  const { title, price } = req.body;
  const newImageKey = req.file ? req.file.filename : null;

  // Fetch existing image key to delete old image
  const getImageQuery = 'SELECT image_key FROM courses WHERE course_id = ?';
  db.query(getImageQuery, [courseId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error occurred' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const oldImageKey = results[0].image_key;

    // Update course in database
    const updateQuery =
      'UPDATE courses SET title = ?, price = ?, image_key = ? WHERE course_id = ?';
    db.query(
      updateQuery,
      [title, price, newImageKey || oldImageKey, courseId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to update course' });
        }

        if (newImageKey) {
          const oldImagePath = path.join(__dirname, '..', 'uploads', oldImageKey);
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error('Failed to delete old image:', err);
            }
          });
        }

        res.status(200).json({ course_id: courseId, title, price, image_key: newImageKey });
      }
    );
  });
};

module.exports = { upload, uploadCourse, getAllCourses, deleteCourse, updateCourse };
