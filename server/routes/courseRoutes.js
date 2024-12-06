const express = require('express');
const { upload, uploadCourse, getAllCourses}  = require('../controllers/courseController');

const router = express.Router();

// Route to upload course
router.post('/upload', upload.single('image_key'), uploadCourse);
router.get('/all', getAllCourses);

module.exports = router;
