// src/app/development/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FilterSection from '../../components/FilterSection';
import StarRating from '../../components/StarRating';

interface Agency {
  _id: string;
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description: string;
  image: string;
  rating: number;
  category: string;
}

export default function AgencyPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(''); // Title state for the page

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agencies');
        if (!response.ok) {
          throw new Error('Failed to fetch agencies');
        }
        const data = await response.json();
        setAgencies(data);
        setFilteredAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
        setError('Could not load agencies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  const applyFilters = (filters: { location?: string; teamSize?: string; rate?: string; category?: string }) => {
    console.log("Filters applied:", filters); // Debug: Log the selected filters

    // Determine the title based on the category filter
    if (filters.category === 'Development') {
      setTitle('Development Agencies'); // Show title when "Development" is selected
    } else {
      setTitle(''); // Blank title when "All" or other categories are selected
    }

    // Apply the filters to get the matching agencies
    const filtered = agencies.filter((agency) => {
      const matchesLocation = filters.location ? agency.location.toLowerCase().startsWith(filters.location.toLowerCase()) : true;

      // Only include "Development" agencies if "All" or "Development" is selected
      const matchesCategory = (filters.category === 'All' || filters.category === 'Development')
        ? agency.category === 'Development'
        : filters.category
        ? agency.category === filters.category
        : true;

      const matchesRate = filters.rate === 'Any Price' || !filters.rate
        ? true
        : parseInt(agency.rate) <= parseInt(filters.rate.replace(/\D/g, '') || "0");

      // Handle Team Size range filtering
      const agencyTeamSize = parseInt(agency.teamSize, 10);
      const [minSize, maxSize] = filters.teamSize?.split('-').map(Number) || [];
      const matchesTeamSize = filters.teamSize
        ? agencyTeamSize >= (minSize || 0) && agencyTeamSize <= (maxSize || Infinity)
        : true;

      // Debug: Log the matching result for each agency
      console.log(`Agency: ${agency.name}, Matches Category: ${matchesCategory}, Matches All: ${matchesLocation && matchesCategory && matchesRate && matchesTeamSize}`);

      return matchesLocation && matchesCategory && matchesRate && matchesTeamSize;
    });

    setFilteredAgencies(filtered);
    console.log("Filtered Agencies:", filtered); // Debug: Log the filtered agencies
  };

  if (loading) {
    return <p className="text-center">Loading agencies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <FilterSection
              onFilterChange={applyFilters}
              totalItems={agencies.length}
              filteredItemsCount={filteredAgencies.length}
            />
          </div>
          <div className="w-full lg:w-3/4">
            {/* Conditionally render the title based on the selected filter */}
            {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <Link key={agency._id} href={`/agencies/${agency._id}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer">
                      <Image
                        src={`http://localhost:5000/${agency.image}`}
                        alt={`${agency.name} logo`}
                        width={300}
                        height={150}
                        className="mb-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/default-image.png';
                        }}
                        layout="responsive"
                      />
                      <h3 className="text-xl font-semibold mb-2">{agency.name}</h3>
                      <div className="flex items-center mb-2">
                        <StarRating rating={agency.rating} />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{agency.description || "Growing Brands Online"}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{agency.location}</span>
                        <span>{agency.rate}</span>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button className="bg-black text-white px-4 py-2 rounded">Visit Website</button>
                        <button className="bg-gray-300 text-black px-4 py-2 rounded">View Portfolio</button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">No agencies found for the selected filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
