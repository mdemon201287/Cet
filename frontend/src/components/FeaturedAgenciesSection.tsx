// src/components/FeaturedAgenciesSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating'; // Import StarRating component
import { Agency } from '../../../backend/src/types/Agency'; // Adjust the import path as necessary

interface FeaturedAgenciesSectionProps {
  agencies: Agency[];
}

export default function FeaturedAgenciesSection({ agencies }: FeaturedAgenciesSectionProps) {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Agencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((agency) => (
            <Link key={agency._id} href={`/development/${agency._id}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer">
                {agency.image && (
                  <Image
                    src={`http://localhost:5000/${agency.image}`}
                    alt={`${agency.name} logo`}
                    width={300}
                    height={150}
                    className="mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{agency.name}</h3>
                <StarRating rating={agency.rating} />
                <p className="text-sm text-gray-600 mb-4">Growing Brands Online</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{agency.location}</span>
                  <span>{agency.rate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
