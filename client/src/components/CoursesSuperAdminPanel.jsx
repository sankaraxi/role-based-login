import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CoursesAdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editCourse, setEditCourse] = useState(null); // To store the course being edited
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

  const handleEditCourse = async (e) => {
    e.preventDefault();
    const courseId = editCourse.course_id;
    console.log(courseId);
    const formData = new FormData(e.target);
    try {
      const response = await fetch(
        `http://localhost:3001/api/courses/${courseId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        const updatedCourse = await response.json();
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.course_id === updatedCourse.course_id ? updatedCourse : course
          )
        );
        setMessage('Course updated successfully.');
        setEditCourse(null);
      } else {
        setMessage('Failed to update course.');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setMessage('An error occurred while updating the course.');
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
                  onClick={() => setEditCourse(course)}
                  className="mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  Edit Course
              </button>
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

      {/* Edit Course Modal */}
      {editCourse && (
        <div className="modal">
          <form onSubmit={handleEditCourse} className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
            <input
              name="title"
              defaultValue={editCourse.title}
              placeholder="Title"
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input
              name="price"
              type="number"
              defaultValue={editCourse.price}
              placeholder="Price"
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input name="image_key" type="file" className="w-full mb-4 p-2 border rounded-md" />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditCourse(null)}
              className="px-4 py-2 text-white bg-red-500 rounded-md ml-4"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CoursesAdminPanel;
