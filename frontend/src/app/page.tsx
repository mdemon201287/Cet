// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import IdealProjectPartner from '@/components/IdealProjectPartner';
import SlidingLogos from '@/components/SlidingLogos';
import ClientTestimonials from '@/components/ClientTestimonials';
import FeaturedAgenciesSection from '@/components/FeaturedAgenciesSection';
import FindandContact from '@/components/FindandContact';

interface Agency {
  name: string;
  location: string;
  teamSize: string;
  rate: string;
  image?: string; // optional image field
}

const Home = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    // Fetch agencies from your API
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
        agency.name.toLowerCase().includes(formattedSearchQuery) &&
        agency.location.toLowerCase().includes(formattedLocationQuery)
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
