'use client';

import { useState } from 'react';

const AddCompanyModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
    teamSize: '',
    hourlyRate: '',
    rating: '',
    tagline: '',
    website: '',
    portfolio: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Submitting', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Company</h2>
          <button onClick={onClose} className="text-red-500">X</button>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Agency Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={handleInputChange}
          />
          <select
            name="category"
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
          </select>
          <input
            type="text"
            name="teamSize"
            placeholder="Team Size"
            className="w-full p-2 border rounded"
            value={formData.teamSize}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="hourlyRate"
            placeholder="Hourly Rate"
            className="w-full p-2 border rounded"
            value={formData.hourlyRate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            className="w-full p-2 border rounded"
            value={formData.rating}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
