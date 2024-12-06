const express = require('express');
const { upload, uploadCourse } = require('../controllers/courseController');

const router = express.Router();

// Route to upload course
router.post('/upload', upload.single('image_key'), uploadCourse);

module.exports = router;
