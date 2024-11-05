// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FindandContact from '@/components/FindandContact';
import IdealProjectPartner from '@/components/IdealProjectPartner';
import FeaturedAgenciesSection from '@/components/FeaturedAgenciesSection';
import SlidingLogos from '@/components/SlidingLogos';
import ClientTestimonials from '@/components/ClientTestimonials';
import { Agency } from '../../../backend/src/types/Agency';

const Home = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agencies');
        const data = await response.json();
        setAgencies(data);
        setFilteredAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const handleSearch = (searchQuery: string, locationQuery: string) => {
    const formattedSearchQuery = searchQuery.toLowerCase();
    const formattedLocationQuery = locationQuery.toLowerCase();

    const matchingAgencies = agencies.filter(
      (agency) =>
        agency.name.toLowerCase().startsWith(formattedSearchQuery) && // Match product name by first character
        agency.location.toLowerCase().startsWith(formattedLocationQuery) // Match location by first character
    );

    setFilteredAgencies(matchingAgencies);
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection handleSearch={handleSearch} />
        <FindandContact />
        <IdealProjectPartner />
        <FeaturedAgenciesSection agencies={filteredAgencies} />
        <SlidingLogos />
        <ClientTestimonials />
      </main>
    </div>
  );
};

export default Home;
