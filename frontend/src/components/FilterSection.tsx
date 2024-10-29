// frontend/src/components/FilterSection.tsx

'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export default function FilterSection() {
  const [filterTwo, setFilterTwo] = useState('All');
  const [budget, setBudget] = useState('Any Price');
  const [filterFour, setFilterFour] = useState('Option one');
  const [teamSize, setTeamSize] = useState('');
  const [filterSeven, setFilterSeven] = useState(0);
  const [filterEight, setFilterEight] = useState(0);
  const [filterNine, setFilterNine] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    filterTwo: true,
    budget: true,
    filterFour: true,
    teamSize: true,
    filterSeven: true,
    filterEight: true,
    filterNine: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button className="text-gray-900 text-sm">Clear all</button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Showing 12 of 100</p>

      <div className="space-y-4">
        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('location')}
          >
            Location
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.location ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.location && (
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Type location"
                className="w-full pl-8 pr-2 py-2 border rounded-md"
              />
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('filterTwo')}
          >
            Filter Two
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.filterTwo ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.filterTwo && (
            <div className="mt-2 space-y-2">
              {['All', 'Development', 'IT Services', 'Design', 'Marketing', 'Business Services'].map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="filterTwo"
                    value={option}
                    checked={filterTwo === option}
                    onChange={e => setFilterTwo(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('budget')}
          >
            Budget
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.budget ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.budget && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Any Price', '< $5,000', '< $20,000', '< $50,000', '< $100,000', '> $100,000'].map(price => (
                <button
                  key={price}
                  className={`px-2 py-1 text-sm border rounded-md ${
                    budget === price ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                  onClick={() => setBudget(price)}
                >
                  {price}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('filterFour')}
          >
            Filter Four
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.filterFour ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.filterFour && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Option one', 'Option Two', 'Option Three', 'Option Four', 'Option Five'].map(option => (
                <button
                  key={option}
                  className={`px-2 py-1 text-sm border rounded-md ${
                    filterFour === option ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                  onClick={() => setFilterFour(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('teamSize')}
          >
            Team Size
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.teamSize ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.teamSize && (
            <div className="mt-2">
              <select
                value={teamSize}
                onChange={e => setTeamSize(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('filterSeven')}
          >
            Filter Seven
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.filterSeven ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.filterSeven && (
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filterSeven}
                onChange={e => setFilterSeven(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>{filterSeven}</span>
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => toggleSection('filterEight')}
          >
            Filter Eight
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.filterEight ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.filterEight && (
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filterEight}
                onChange={e => setFilterEight(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        <div>
  <button
    className="flex justify-between items-center w-full text-left font-medium"
    onClick={() => toggleSection('filterNine')}
  >
    Filter Nine
    <ChevronDown
      className={`w-5 h-5 transition-transform ${expandedSections.filterNine ? 'rotate-180' : ''}`}
    />
  </button>
  {expandedSections.filterNine && (
    <div className="mt-2 flex items-center">
      <span className="text-sm mr-2">{filterNine ? 'On' : 'Off'}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={filterNine}
          onChange={e => setFilterNine(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition duration-300"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
      </label>
    </div>
  )}
</div>

      </div>
    </div>
  );
}