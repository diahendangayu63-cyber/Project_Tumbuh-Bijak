import React from 'react';
import HeroSection from '../components/HeroSection';
import DosDontsCard from '../components/DosDontsCard';

export default function Home({ onNavigateTab }) {
  const handleExploreToEdukasi = () => {
    if (onNavigateTab) {
      onNavigateTab('edukasi');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section: Tombol Mulai Eksplor langsung navigasi ke Ruang Edukasi */}
      <HeroSection onExploreClick={handleExploreToEdukasi} />

      {/* Konten Do's & Don'ts */}
      <div>
        <DosDontsCard />
      </div>
    </div>
  );
}
