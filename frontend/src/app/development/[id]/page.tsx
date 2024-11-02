// src/app/development/[agency]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FilterSection from '../../../components/FilterSection';
import { Star } from 'lucide-react';

interface Agency {
  _id: string;
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description: string;
  image: string;
  rating: number;
}

const AgencyPage = () => {
  const { id } = useParams();
  const [agencyData, setAgencyData] = useState<Agency | null>(null);
  const [featuredAgencies, setFeaturedAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    const fetchAgencyData = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/agencies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAgencyData(data);
        } else {
          console.error('Agency not found');
        }
      } catch (error) {
        console.error('Error fetching agency data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedAgencies = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/agencies/featured`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedAgencies(data);
        } else {
          console.error('Error fetching featured agencies');
        }
      } catch (error) {
        console.error('Error fetching featured agencies:', error);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchAgencyData();
    fetchFeaturedAgencies();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading agency details...</p>;
  }

  if (!agencyData) {
    return <p className="text-center">Agency not found.</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4">{agencyData.name}</h1>
      <img
        src={`http://localhost:5000/${agencyData.image}`}
        alt={agencyData.name}
        className="mb-4"
      />
      <p className="text-gray-600 mb-4">{agencyData.description}</p>
      <div className="flex items-center mb-4">
        <Star className="text-yellow-500" />
        <span className="ml-2">{agencyData.rating}</span>
      </div>
      <p>Location: {agencyData.location}</p>
      <p>Team Size: {agencyData.teamSize}</p>
      <p>Rate: {agencyData.rate}</p>

      {/* Featured Agencies Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Agencies</h2>
      {featuredLoading ? (
        <p className="text-center">Loading featured agencies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredAgencies.map((agency) => (
            <div key={agency._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={`http://localhost:5000/${agency.image}`}
                alt={agency.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <h3 className="font-bold text-lg mt-2">{agency.name}</h3>
              <p className="text-gray-600">{agency.location}</p>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-500" />
                <span className="ml-1">{agency.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgencyPage;
