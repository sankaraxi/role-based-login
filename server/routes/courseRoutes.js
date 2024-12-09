const express = require('express');
const { upload, uploadCourse, getAllCourses, deleteCourse, updateCourse}  = require('../controllers/courseController');

const router = express.Router();


router.post('/upload', upload.single('image_key'), uploadCourse);
router.get('/all', getAllCourses);

router.delete('/:courseId', deleteCourse);
router.put('/:courseId', upload.single('image_key'), updateCourse);

module.exports = router;
