import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CoursesAdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  const { username } = location.state || {};

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/courses/all');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (error) {
        setError('An error occurred while fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      console.log(response);

      if (response.ok) {
        setCourses(courses.filter((course) => course.course_id !== courseId));
        setMessage('Course deleted successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed to delete course.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setMessage('An error occurred while deleting the course.');
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Available Courses for <span className="text-black">{username}</span>
      </h2>
      {message && <p className="text-center text-green-500">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.course_id} className="bg-white p-4 shadow-md rounded-md">
              <img
                src={`http://localhost:3001/uploads/${course.image_key}`}
                alt={course.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600 mt-2">₹{course.price}</p>
              <button
                onClick={() => handleDeleteCourse(course.course_id)}
                className="mt-4 w-full px-4 py-2 text-white bg-red-500 rounded-md"
              >
                Delete Course
              </button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesAdminPanel;
