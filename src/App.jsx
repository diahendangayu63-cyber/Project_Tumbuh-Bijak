import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Edukasi from './pages/Edukasi';
import Kuis from './pages/Kuis';
import Cerita from './pages/Cerita';
import Profil from './pages/Profil';
import MainLayout from './layouts/MainLayout';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [activeTab, setActiveTab] = useState('beranda');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 'splash' ? (
          <Splash key="splash-screen" onEnter={() => setCurrentPage('main')} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
              <AnimatePresence mode="wait">
                {activeTab === 'beranda' && (
                  <motion.div
                    key="tab-beranda"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Home onNavigateTab={setActiveTab} />
                  </motion.div>
                )}

                {activeTab === 'edukasi' && (
                  <motion.div
                    key="tab-edukasi"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Edukasi />
                  </motion.div>
                )}

                {activeTab === 'kuis' && (
                  <motion.div
                    key="tab-kuis"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Kuis />
                  </motion.div>
                )}

                {activeTab === 'cerita' && (
                  <motion.div
                    key="tab-cerita"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Cerita />
                  </motion.div>
                )}

                {activeTab === 'profil' && (
                  <motion.div
                    key="tab-profil"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Profil />
                  </motion.div>
                )}
              </AnimatePresence>
            </MainLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
