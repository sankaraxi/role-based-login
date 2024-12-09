import React, { useState } from 'react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image_key, setImage_key] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();
  
    if (!title || !price || !image_key) {
      setMessage('All fields are required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image_key', image_key);
  
    try {
      const response = await fetch('http://localhost:3001/api/courses/upload', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      let data = null;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text(); // Get raw response if not JSON
        setMessage(text); // Set raw message if needed
        return;
      }
  
      if (response.ok) {
        setMessage(data.message);
        setTitle('');
        setPrice('');
        setImage_key(null);
      } else {
        setMessage(data.message || 'Failed to upload course.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Admin Panel</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleImageUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-gray-200 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-gray-200 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Course Image</label>
            <input
              type="file"
              onChange={(e) => setImage_key(e.target.files[0])}
              className="block w-full px-4 py-2 mt-2 bg-gray-200 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md">
            Upload Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
