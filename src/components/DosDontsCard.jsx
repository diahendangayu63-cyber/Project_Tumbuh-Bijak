import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Check, X } from 'lucide-react';

const dosList = [
  'Jaga kebersihan diri: mandi teratur, pakai pakaian bersih dan berbahan menyerap keringat.',
  'Terbuka bercerita ke orang tua, dokter, atau guru BK saat merasa bingung atau cemas.',
  'Pahami bahwa perubahan bentuk tubuh dan timbulnya jerawat adalah fase biologis yang wajar.',
  'Terapkan pola makan gizi seimbang, perbanyak minum air putih, dan tidur cukup 8 jam.',
];

const dontsList = [
  'Jangan memendam kecemasan atau ketakutan sendirian tanpa mencari sumber terpercaya.',
  'Jangan mudah percaya mitos atau kabar burung di media sosial tanpa konfirmasi medis.',
  'Jangan membandingkan perkembangan tubuhmu dengan teman sebaya atau figur daring.',
  'Jangan sembarangan mencoba obat/produk perawatan keras tanpa anjuran ahli atau petunjuk dokter.',
];

// Staggered variants for Framer Motion physics animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 28,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 14,
    }
  },
};

export default function DosDontsCard() {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-4 md:py-8 flex flex-col gap-6"
    >
      {/* Header section dengan judul & badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Panduan Do's & Don'ts Remaja
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Prinsip utama menjaga kesehatan fisik & mental selama masa pubertas
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs sm:text-sm font-semibold px-3 py-1.5 bg-maroon/10 text-maroon rounded-full">
          2 Panduan Utama
        </span>
      </div>

      {/* Konten Do's & Don'ts: Mobile flex-col (1 kolom), Desktop md:grid-cols-2 (2 kolom sejajar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        
        {/* Kartu 1: Hal yang Boleh Dilakukan (Do's) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-soft hover:shadow-soft-hover transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/70 rounded-bl-full -z-0 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Card Header with Icon */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
                <CheckCircle2 size={26} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Langkah Tepat (Do's)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Hal yang Dianjurkan & Boleh Dilakukan
                </h3>
              </div>
            </div>

            {/* List items */}
            <ul className="space-y-3.5">
              {dosList.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Check size={13} className="stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-50 flex items-center justify-between text-xs text-emerald-700 font-medium">
            <span>✓ Membantu adaptasi positif</span>
            <span>Rekomendasi Ahli</span>
          </div>
        </motion.div>

        {/* Kartu 2: Hal yang Jangan Dilakukan (Don'ts) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-rose-100 shadow-soft hover:shadow-soft-hover transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/70 rounded-bl-full -z-0 pointer-events-none" />

          <div className="relative z-10">
            {/* Card Header with Icon */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs shrink-0">
                <XCircle size={26} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-rose-600">
                  Peringatan Bijak (Don'ts)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Hal yang Sebaiknya Dihindari
                </h3>
              </div>
            </div>

            {/* List items */}
            <ul className="space-y-3.5">
              {dontsList.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <X size={13} className="stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-50 flex items-center justify-between text-xs text-rose-700 font-medium">
            <span>✕ Hindari misinformasi & stres</span>
            <span>Kesehatan Mental & Fisik</span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
