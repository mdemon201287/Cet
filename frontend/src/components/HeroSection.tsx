// frontend/src/components/HeroSection.tsx

import { useState } from 'react';

interface HeroSectionProps {
  handleSearch: (searchQuery: string, locationQuery: string) => void;
}

export default function HeroSection({ handleSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery, locationQuery); // Call the search function with the inputs
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
          {/* Text and Input Fields */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 z-20 relative">
            <h1 className="text-4xl pb-4 lg:pb-6 font-bold text-gray-900 sm:text-5xl">
              Where you find the right company
            </h1>
            <p className="mt-3 text-xl lg:text-lg text-gray-700">
              Rely on our database of 60,000+ verified client reviews and real user insights to choose the right company
              for your business.
            </p>
            <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col sm:flex-row">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="px-4 py-3 border border-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-2 flex-grow shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="px-4 py-3 border border-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-2 flex-grow shadow-lg"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md flex items-center justify-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_23_392)">
                    <path d="M10.3333 9.33333H9.80667L9.62 9.15333C10.2733 8.39333 10.6667 7.40667 10.6667 6.33333C10.6667 3.94 8.72667 2 6.33333 2C3.94 2 2 3.94 2 6.33333C2 8.72667 3.94 10.6667 6.33333 10.6667C7.40667 10.6667 8.39333 10.2733 9.15333 9.62L9.33333 9.80667V10.3333L12.6667 13.66L13.66 12.6667L10.3333 9.33333ZM6.33333 9.33333C4.67333 9.33333 3.33333 7.99333 3.33333 6.33333C3.33333 4.67333 4.67333 3.33333 6.33333 3.33333C7.99333 3.33333 9.33333 4.67333 9.33333 6.33333C9.33333 7.99333 7.99333 9.33333 6.33333 9.33333Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_23_392">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Find
              </button>
            </form>
          </div>

          {/* Image Container */}
          <div className="w-full lg:w-1/2 relative">
            <img src="/images/Vector.png" alt="Business person working" className="rounded-lg w-full relative z-10" />
            {/* Gray Arrow Overlay */}
            <div className="absolute -top-10 -left-52 z-20">
              <img src="/images/gray-arrow.png" alt="Gray Arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
