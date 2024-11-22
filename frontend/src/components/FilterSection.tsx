// src/components/FilterSection.tsx

import { useState, useEffect } from 'react';

interface FilterProps {
  onFilterChange: (filters: { location?: string; teamSize?: string; rate?: string; category?: string }) => void;
  totalItems: number;
  filteredItemsCount: number;
}

export default function FilterSection({ onFilterChange, totalItems, filteredItemsCount }: FilterProps) {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [rate, setRate] = useState('Any Price'); // Set default to "Any Price" to show all data by default
  const [teamSize, setTeamSize] = useState('');

  // Trigger filter change when filters are updated
  useEffect(() => {
    onFilterChange({ location, teamSize, rate, category });
  }, [location, category, rate, teamSize]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Filters</h3>
        <button
          className="text-blue-500 text-sm"
          onClick={() => {
            setLocation('');
            setCategory('');
            setRate('Any Price'); // Reset rate to "Any Price"
            setTeamSize('');
            onFilterChange({ location: '', teamSize: '', rate: 'Any Price', category: '' });
          }}
        >
          Clear all
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">Showing {filteredItemsCount} of {totalItems}</p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          placeholder="Type location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter Two</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={category === ''}
              onChange={() => setCategory('')}
              className="mr-2"
            />
            All
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Development"
              checked={category === 'Development'}
              onChange={() => setCategory('Development')}
              className="mr-2"
            />
            Development
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="IT Services"
              checked={category === 'IT Services'}
              onChange={() => setCategory('IT Services')}
              className="mr-2"
            />
            IT Services
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Design"
              checked={category === 'Design'}
              onChange={() => setCategory('Design')}
              className="mr-2"
            />
            Design
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Marketing"
              checked={category === 'Marketing'}
              onChange={() => setCategory('Marketing')}
              className="mr-2"
            />
            Marketing
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Business Services"
              checked={category === 'Business Services'}
              onChange={() => setCategory('Business Services')}
              className="mr-2"
            />
            Business Services
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Budget</label>
        <div className="grid grid-cols-3 gap-2">
          {['Any Price', '< $5,000', '< $20,000', '< $50,000', '< $100,000', '> $100,000'].map((price, idx) => (
            <button
              key={idx}
              onClick={() => setRate(price)}
              className={`px-3 py-1 rounded ${rate === price ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Team Size</label>
        <select
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select</option>
          <option value="1-10">1-10</option>
          <option value="10-50">10-50</option>
          <option value="50-100">50-100</option>
          <option value="100+">100+</option>
        </select>
      </div>

      <button
        onClick={() => onFilterChange({ location, teamSize, rate, category })}
        className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
      >
        Apply Filters
      </button>
    </div>
  );
}
