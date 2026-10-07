import React from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function MainLayout({ children, activeTab = 'beranda', onTabChange = () => {} }) {
  return (
    <div className="min-h-screen bg-cream text-gray-800 flex flex-col justify-between selection:bg-maroon selection:text-white">
      {/* Header dengan Logo, Profil, dan Desktop Top Navbar (>= 768px) */}
      <Header activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Konten Utama: max-w-screen-xl mx-auto, padding adaptif mobile-desktop */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto pb-24 md:pb-12 px-4 sm:px-6 md:px-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation (< 768px, tersembunyi di desktop md:hidden) */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
