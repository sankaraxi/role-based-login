import React, { useState, useEffect } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all courses from the backend
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

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4">Available Courses</h2>
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
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
