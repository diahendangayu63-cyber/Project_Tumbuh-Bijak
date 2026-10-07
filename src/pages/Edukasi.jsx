import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Droplets,
  Zap,
  Sun,
  Smile,
  ShieldCheck,
  Compass,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Heart,
  Users,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA MODUL EDUKASI (Bite-sized Information)
────────────────────────────────────────────────────────────────────────────── */
const MODULES_DATA = {
  fisik: [
    {
      id: 'f1',
      title: 'Jerawat Pubertas',
      category: 'Perawatan Kulit',
      icon: Sparkles,
      intro: 'Produksi sebum alami meningkat saat puber, terkadang menyumbat pori dan memicu peradangan jerawat.',
      doText: 'Cuci muka teratur 2x sehari dengan sabun lembut ber-pH netral dan gunakan pelembap ringan.',
      dontText: 'Memencet jerawat paksa dengan kuku karena memicu infeksi bakteri dalam dan bopeng permanen.',
      tip: 'Tip: Jerawat dipicu oleh hormon androgen yang aktif merangsang kelenjar sebasea selama masa pubertas.',
    },
    {
      id: 'f2',
      title: 'Keringat & Bau Badan',
      category: 'Kebersihan Diri',
      icon: Droplets,
      intro: 'Kelenjar keringat apokrin mulai aktif berproduksi di area lipatan tubuh seiring matangnya hormon.',
      doText: 'Mandi rutin 2x sehari, keringkan tubuh sempurna, ganti baju bersih, dan gunakan deodoran/antiperspiran.',
      dontText: 'Menyemprotkan parfum berlebih langsung ke badan yang basah berkeringat tanpa mengeringkannya terlebih dahulu.',
      tip: 'Tip: Keringat murni sebenarnya tidak berbau; bakteri kulit yang memecahnya menjadi beraroma menyengat.',
    },
    {
      id: 'f3',
      title: 'Tinggi Badan & Postur',
      category: 'Tumbuh Kembang',
      icon: Zap,
      intro: 'Masa growth spurt membuat tulang dan ototmu bertambah panjang dan padat dalam rentang waktu singkat.',
      doText: 'Tidur cukup 8–9 jam setiap malam dan konsumsi asupan kaya kalsium, vitamin D, serta protein bergizi.',
      dontText: 'Sering begadang scrolling layar ponsel hingga larut malam dan gemar konsumsi junk food tanpa nutrisi.',
      tip: 'Tip: Hormon pertumbuhan (HGH) diproduksi secara puncak hingga 80% saat tubuh memasuki fase tidur nyenyak.',
    },
    {
      id: 'f4',
      title: 'Proteksi Kulit & Sinar UV',
      category: 'Kesehatan Kulit',
      icon: Sun,
      intro: 'Paparan sinar matahari langsung dapat memperparah bekas jerawat dan merusak lapisan skin barrier remajamu.',
      doText: 'Rutin mengoleskan tabir surya (sunscreen) minimal SPF 30 setiap pagi 15 menit sebelum beraktivitas keluar.',
      dontText: 'Mengabaikan pemakaian sunscreen saat cuaca mendung atau beranggapan kulit berminyak tidak butuh proteksi.',
      tip: 'Tip: Hingga 80% radiasi sinar UVA tetap mampu menembus lapisan awan mendung dan kaca jendela ruangan.',
    },
  ],
  emosi: [
    {
      id: 'e1',
      title: 'Badai Mood Swing',
      category: 'Regulasi Emosi',
      icon: Smile,
      intro: 'Perasaan yang berubah-ubah secara mendadak dari gembira ke kesal dalam hitungan menit adalah hal lumrah.',
      doText: 'Ambil jeda sejenak, latih teknik napas dalam 4-7-8, dan cari aktivitas hobi positif yang menenangkan.',
      dontText: 'Melampiaskan amarah secara impulsif di media sosial atau membentak teman dan keluarga terdekat.',
      tip: 'Tip: Lonjakan hormon estrogen dan testosteron berinteraksi langsung dengan amigdala (pusat emosi di otak).',
    },
    {
      id: 'e2',
      title: 'Menghadapi Rasa Insecure',
      category: 'Kesehatan Mental',
      icon: ShieldCheck,
      intro: 'Melihat perubahan fisik teman sebaya yang berbeda sering kali memicu rasa minder dan cemas berlebih.',
      doText: 'Fokus kenali kelebihan dan bakat unikmu, serta apresiasi setiap proses bertumbuh yang sedang dialami tubuh.',
      dontText: 'Terus-menerus membandingkan penampilan fisikmu dengan standar tubuh hasil filter di media sosial.',
      tip: 'Tip: Setiap remaja memiliki timeline biologis unik; kecepatan dan bentuk pertumbuhan tubuh tidak pernah sama.',
    },
    {
      id: 'e3',
      title: 'Tekanan Teman Sebaya',
      category: 'Batasan Sosial',
      icon: Compass,
      intro: 'Keinginan kuat untuk diterima di dalam circle pertemanan terkadang membuat kita ragu bersikap jujur.',
      doText: 'Berani tegas berkata "tidak" pada ajakan yang melanggar nilai pribadimu atau berpotensi bahaya.',
      dontText: 'Memaksakan diri ikut-ikutan tren berbahaya atau mengubah kepribadian asli hanya agar dianggap keren.',
      tip: 'Tip: Teman yang suportif akan selalu menghormati batasan dirimu dan tidak menuntut hal berisiko buruk.',
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   VARIANTS FRAMER MOTION
────────────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN UTAMA EDUKASI
────────────────────────────────────────────────────────────────────────────── */
export default function Edukasi() {
  const [activeTab, setActiveTab] = useState('fisik'); // 'fisik' | 'emosi'

  const currentModules = MODULES_DATA[activeTab] || [];

  return (
    <div className="py-4 md:py-8 max-w-5xl mx-auto">
      {/* ── 1. Header Halaman ── */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon/10 text-maroon text-xs sm:text-sm font-bold mb-3 border border-maroon/20">
          <BookOpen size={15} />
          <span>Ruang Bacaan & Edukasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Pahami Perubahan, <span className="text-maroon">Tumbuh Percaya Diri</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          Temukan panduan praktis dan ringkas seputar tubuh serta emosimu di masa pubertas tanpa rasa cemas dan penghakiman.
        </p>

        {/* ── Navigasi Kategori (Tabs Sliding Pill dengan layoutId) ── */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1.5 bg-gray-200/70 rounded-full border border-gray-300/60 shadow-xs relative">
            {/* Tab: Perubahan Fisik */}
            <button
              type="button"
              onClick={() => setActiveTab('fisik')}
              className={`relative px-5 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors duration-200 cursor-pointer z-10 ${
                activeTab === 'fisik' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeTab === 'fisik' && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-maroon rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={15} />
                <span>Perubahan Fisik</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeTab === 'fisik' ? 'bg-white/20 text-white' : 'bg-gray-300/80 text-gray-700'
                  }`}
                >
                  {MODULES_DATA.fisik.length}
                </span>
              </span>
            </button>

            {/* Tab: Perubahan Emosi */}
            <button
              type="button"
              onClick={() => setActiveTab('emosi')}
              className={`relative px-5 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors duration-200 cursor-pointer z-10 ${
                activeTab === 'emosi' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeTab === 'emosi' && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-maroon rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Smile size={15} />
                <span>Perubahan Emosi</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeTab === 'emosi' ? 'bg-white/20 text-white' : 'bg-gray-300/80 text-gray-700'
                  }`}
                >
                  {MODULES_DATA.emosi.length}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Grid Kartu Modul Estetik ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {currentModules.map((module) => {
            const IconComponent = module.icon;

            return (
              <motion.div
                key={module.id}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header Kartu: Ikon Maroon & Judul */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0 border border-maroon/15 shadow-xs">
                        <IconComponent size={22} />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-maroon bg-maroon/5 px-2 py-0.5 rounded border border-maroon/10">
                          {module.category}
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-gray-900 leading-snug mt-0.5">
                          {module.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi Pengantar (Maksimal 2 baris) */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
                    {module.intro}
                  </p>

                  {/* Kotak Do's & Don'ts (Bite-sized callout boxes) */}
                  <div className="space-y-3 mb-5">
                    {/* Kotak Boleh (Do) */}
                    <div className="bg-green-50 rounded-xl p-3.5 sm:p-4 border border-green-200/70 text-green-950 flex items-start gap-2.5 shadow-xs">
                      <div className="text-green-700 shrink-0 mt-0.5">
                        <CheckCircle2 size={18} className="text-green-600" />
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <span className="font-extrabold text-green-800 mr-1.5 block sm:inline">
                          Boleh (Do):
                        </span>
                        <span>{module.doText}</span>
                      </div>
                    </div>

                    {/* Kotak Jangan (Don't) */}
                    <div className="bg-red-50 rounded-xl p-3.5 sm:p-4 border border-red-200/70 text-red-950 flex items-start gap-2.5 shadow-xs">
                      <div className="text-maroon shrink-0 mt-0.5">
                        <XCircle size={18} className="text-maroon" />
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <span className="font-extrabold text-maroon mr-1.5 block sm:inline">
                          Jangan (Don't):
                        </span>
                        <span>{module.dontText}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Kartu (Tip Medis) */}
                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-gray-500">
                  <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] sm:text-xs italic leading-relaxed text-gray-500">
                    {module.tip}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
