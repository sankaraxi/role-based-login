const express = require('express');
const { upload, uploadCourse, getAllCourses, deleteCourse}  = require('../controllers/courseController');

const router = express.Router();


router.post('/upload', upload.single('image_key'), uploadCourse);
router.get('/all', getAllCourses);

router.delete('/:courseId', deleteCourse);

module.exports = router;
