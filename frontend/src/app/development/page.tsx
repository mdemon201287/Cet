// src/app/development/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import FilterSection from '../../components/FilterSection';
import StarRating from '../../components/StarRating';

interface Agency {
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description: string;
  image: string;
  rating: number;
}

export default function DevelopmentPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agencies');
        const data = await response.json();
        console.log('Fetched agencies:', data); // Log the data to verify rating values
        setAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAgencies();
  }, []);
  

  if (loading) {
    return <p>Loading agencies...</p>;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <FilterSection />
          </div>
          <div className="w-full lg:w-3/4">
            <h2 className="text-3xl font-bold mb-8">Development Agencies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {agencies.map((agency) => (
                <Link key={agency.name} href={`/development/${agency.name.toLowerCase().replace(/\s+/g, '-')}`}>
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
                    <button className="mt-4 mr-4 bg-black text-white px-4 py-2 rounded">Visit Website</button>
                    <button className="mt-4 bg-gray-300 text-black px-4 py-2 rounded">View Portfolio</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
