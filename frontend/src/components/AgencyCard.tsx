// src/components/AgencyCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';

interface Agency {
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  image?: string;
  rating: number;
}

interface AgencyCardProps {
  agency: Agency;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AgencyCard({ agency, onEdit, onDelete }: AgencyCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {agency.image && (
        <Image
          src={`http://localhost:5000/${agency.image}`}
          alt={`${agency.name} logo`}
          width={300}
          height={150}
          className="mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-image.png'; // Path to your default image
          }}
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{agency.name}</h3>
      <StarRating rating={agency.rating} />
      <p className="text-sm text-gray-600 mb-4">Growing Brands Online</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{agency.location}</span>
        <span>{agency.rate}</span>
      </div>
      <button onClick={onEdit} className="mt-2 bg-yellow-600 text-white px-2 py-1 rounded">
        Edit
      </button>
      <button onClick={onDelete} className="mt-2 bg-red-600 text-white px-2 py-1 rounded">
        Delete
      </button>
    </div>
  );
}
