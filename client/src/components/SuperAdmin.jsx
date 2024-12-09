import React from 'react';
import Admin from './Admin'; // Assuming Admin is in the same directory
import Courses from './Courses'; // Assuming Courses is in the same directory

const SuperAdmin = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">SuperAdmin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Course Form */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Upload Course</h2>
          <Admin />
        </div>

        {/* Available Courses Dashboard */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
          <Courses />
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
