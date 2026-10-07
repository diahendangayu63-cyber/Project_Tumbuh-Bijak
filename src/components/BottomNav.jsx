import React from 'react';
import { Home, BookOpen, HelpCircle, MessageSquareQuote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav({ activeTab = 'beranda', onTabChange = () => {} }) {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
    { id: 'kuis', label: 'Kuis', icon: HelpCircle },
    { id: 'cerita', label: 'Cerita', icon: MessageSquareQuote },
  ];

  return (
    // Sembunyikan Bottom Navigation Bar pada Desktop/Tablet (>= 768px, md:hidden)
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/70 shadow-nav">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive ? 'text-maroon font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5] scale-110' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-maroon"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[11px] mt-1 transition-all ${isActive ? 'text-maroon' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveBottomBar"
                  className="w-5 h-1 bg-maroon rounded-full mt-0.5"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
