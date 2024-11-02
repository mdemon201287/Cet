// src/app/development/[agency]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FilterSection from '../../../components/FilterSection';
import { Star } from 'lucide-react';

interface Agency {
  _id: string; // Add _id
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  description: string;
  image: string;
  rating: number;
}

const AgencyPage = () => {
  const { id } = useParams(); // Access the dynamic _id
  const [agencyData, setAgencyData] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencyData = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/agencies/${id}`); // Use id to fetch agency
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
    </div>
  );
};

export default AgencyPage;
