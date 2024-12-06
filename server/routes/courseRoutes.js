const express = require('express');
const { upload, uploadCourse, getAllCourses}  = require('../controllers/courseController');

const router = express.Router();


router.post('/upload', upload.single('image_key'), uploadCourse);
router.get('/all', getAllCourses);

module.exports = router;
