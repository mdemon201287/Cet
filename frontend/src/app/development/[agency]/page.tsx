// src/app/development/[agency]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FilterSection from '../../../components/FilterSection';
import { Star } from 'lucide-react';

interface Agency {
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description: string;
  image: string;
  rating: number;
}

const AgencyPage = () => {
  const { agency } = useParams(); // useParams instead of useRouter
  const [agencyData, setAgencyData] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencyData = async () => {
      if (!agency) return;

      try {
        const response = await fetch(`http://localhost:5000/api/agencies/${agency}`);
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

    fetchAgencyData();
  }, [agency]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!agencyData) {
    return <p>Agency not found.</p>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <FilterSection />
        </div>
        <div className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold">{agencyData.name}</h1>
          <div className="p-4 mt-5 rounded-lg shadow-2xl">
            <img
              src={`http://localhost:5000/${agencyData.image.replace(/\\/g, '/')}`}
              alt={`${agencyData.name} logo`}
              className="mb-4 w-auto h-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = '/images/default-image.png';
              }}
            />
            <p>{agencyData.description}</p>
            <div className="flex items-center mb-2">
              {[...Array(agencyData.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <p className="mt-4">
              <strong>Location:</strong> {agencyData.location}
            </p>
            <p>
              <strong>Hourly Rate:</strong> {agencyData.rate}
            </p>
            <p>
              <strong>Team Size:</strong> {agencyData.teamSize}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;
