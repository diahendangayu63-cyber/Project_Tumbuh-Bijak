import React, { useState } from 'react';
import {
  User,
  Bell,
  Home,
  BookOpen,
  HelpCircle,
  MessageSquareQuote,
  Sparkles,
  Smile,
  Zap,
  ChevronRight,
  X,
  Clock,
  BookMarked,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA BERITA / TIPS SINGKAT
────────────────────────────────────────────────────────────────────────────── */
const quickTips = [
  {
    id: 'tip-1',
    title: '✨ Kenapa tiba-tiba muncul jerawat?',
    preview: 'Lonjakan androgen wajar saat puber. Kenali cara merawatnya.',
    icon: Sparkles,
    iconBg: 'bg-amber-100 text-amber-600',
    tag: 'Kulit',
    readTime: '2 menit',
    articleTitle: 'Jerawat & Hormon: Kenali Sahabat Pubertasmu',
    articleBody: `Selama masa pubertas, tubuhmu mulai memproduksi hormon androgen dalam jumlah lebih besar. Hormon ini merangsang kelenjar sebasea (minyak) di kulit untuk bekerja lebih keras dari biasanya.

**Mengapa Jerawat Muncul?**
Kelenjar minyak yang over-aktif menghasilkan sebum berlebih. Sebum ini bercampur dengan sel kulit mati dan menyumbat pori-pori. Bakteri *Cutibacterium acnes* kemudian berkembang biak di dalam sumbatan tersebut, memicu peradangan — itulah yang kita sebut jerawat!

**Cara Merawatnya:**
• Cuci muka 2× sehari dengan sabun lembut (bukan sabun mandi biasa)
• Gunakan *double cleansing* jika memakai sunscreen atau makeup
• Jangan pencet jerawat! Ini bisa menyebabkan infeksi dan bekas luka permanen
• Gunakan obat totol berbahan benzoyl peroxide atau salicylic acid
• Minum air putih minimal 8 gelas sehari

**Kapan ke Dokter?**
Jika jerawat terasa nyeri, besar-besar, dan tidak membaik setelah 2 minggu perawatan mandiri, segera konsultasi ke dokter kulit (dermatologis).

Ingat: jerawat bukan tanda kamu kotor, ini adalah bagian normal dari tumbuh kembang. Kamu tidak sendirian! 💙`,
  },
  {
    id: 'tip-2',
    title: '🧘 Cara ampuh redakan mood swing hari ini',
    preview: 'Trik pernapasan 5 detik dan jurnal refleksi untuk rileks.',
    icon: Smile,
    iconBg: 'bg-rose-100 text-rose-600',
    tag: 'Emosi',
    readTime: '3 menit',
    articleTitle: 'Mood Swing: Normal atau Tanda Bahaya?',
    articleBody: `Pernah merasa senang banget di pagi hari, tapi tiba-tiba sedih tanpa alasan jelas di siang hari? Selamat datang di dunia *mood swing* masa remaja!

**Mengapa Ini Terjadi?**
Perubahan suasana hati yang drastis disebabkan oleh fluktuasi hormon — terutama estrogen, progesteron, dan testosteron — yang sedang "belajar" bekerja di tubuhmu. Ditambah lagi, bagian otak yang mengatur emosi (amigdala) berkembang lebih cepat daripada bagian yang mengontrol logika (prefrontal cortex).

**5 Trik Ampuh Redakan Mood Swing:**

1. **Teknik Pernapasan 5-5-5**: Tarik napas 5 detik, tahan 5 detik, hembuskan 5 detik. Ulangi 3 kali. Ini mengaktifkan sistem saraf parasimpatik yang menenangkan tubuh secara biologis.

2. **Jurnal Refleksi**: Tuliskan apa yang kamu rasakan tanpa filter. Ini membantu otak "memproses" emosi yang belum tercerna.

3. **Gerak Fisik Ringan**: Jalan santai 10 menit, lompat-lompat, atau joget di kamar. Endorfin yang dilepas otak saat bergerak adalah antidepresan alami terbaik.

4. **Dengarkan Musik**: Playlist lagu favorit terbukti menurunkan kadar kortisol (hormon stres) secara signifikan.

5. **Bicarakan ke Orang Tepercaya**: Jangan pendam sendiri. Ceritakan ke sahabat, orang tua, atau konselor yang kamu percaya.

**Kapan Ini Bukan "Normal"?**
Jika mood swing disertai pikiran menyakiti diri sendiri atau berlangsung lebih dari 2 minggu tanpa henti, segera cari bantuan profesional. Kamu berhak merasa baik-baik saja. ❤️`,
  },
  {
    id: 'tip-3',
    title: '🥗 Nutrisi pintar penyokong masa pertumbuhan',
    preview: 'Kalsium & istirahat 8 jam mendukung optimalnya tinggi badan.',
    icon: Zap,
    iconBg: 'bg-emerald-100 text-emerald-600',
    tag: 'Kesehatan',
    readTime: '3 menit',
    articleTitle: 'Nutrisi Remaja: Bahan Bakar Tumbuh Optimal',
    articleBody: `Masa remaja adalah *golden period* pertumbuhan tubuhmu. Apa yang kamu makan sekarang menentukan kondisi fisikmu di usia dewasa. Yuk, kenali nutrisi yang paling penting!

**Nutrisi Kritis untuk Remaja:**

🥛 **Kalsium (1.300 mg/hari)**
Kalsium adalah "bata" untuk tulang. Kepadatan tulang maksimum dicapai di usia 18–25 tahun. Setelahnya, tidak bisa ditambah lagi! Sumber: susu, yogurt, keju, tahu, tempe, brokoli, dan ikan teri.

🥩 **Zat Besi (Fe)**
Terutama penting untuk remaja perempuan yang mengalami menstruasi. Kekurangan zat besi menyebabkan anemia: lesu, susah fokus, pucat. Sumber: daging merah, hati ayam, bayam, dan kacang-kacangan.

🧠 **Omega-3**
Lemak baik yang membantu perkembangan otak dan memori. Sumber terbaik: ikan salmon, ikan tuna, kacang kenari, dan biji chia.

💊 **Vitamin D**
Membantu penyerapan kalsium. Sintetis terbaik: paparan sinar matahari pagi (07.00–09.00) selama 15 menit.

**Rahasia Tinggi Badan: Tidur 8 Jam!**
Hormon pertumbuhan (HGH) diproduksi 70–80% saat tidur nyenyak, terutama di fase tidur dalam (deep sleep) antara pukul 22.00–02.00. Begadang bukan hanya bikin ngantuk — ia secara harfiah "mencuri" potensi tinggi badanmu.

**Menu Ideal Remaja Aktif:**
- Sarapan: Oatmeal + susu + buah
- Siang: Nasi + protein (ayam/ikan/tempe) + sayuran hijau
- Snack: Yogurt atau buah segar
- Malam: Makan lebih ringan, hindari junk food setelah jam 8 malam

Tubuhmu adalah investasi jangka panjang. Rawat sekarang, nikmati hasilnya selamanya! 🌟`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN MODAL ARTIKEL PENUH
────────────────────────────────────────────────────────────────────────────── */
function ArticleModal({ tip, onClose }) {
  // Render teks artikel dengan format bold (**text**) sederhana
  const renderBody = (text) =>
    text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={`${line.trim() === '' ? 'mb-3' : 'mb-1.5'} text-sm sm:text-base text-gray-700 leading-relaxed`}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-bold text-gray-900">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });

  return (
    <motion.div
      key="article-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-white/30 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-gray-200/80 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tip.iconBg}`}>
                  {tip.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock size={11} />
                  {tip.readTime} baca
                </span>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 leading-snug">
                {tip.articleTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-gray-500 transition-colors cursor-pointer shrink-0 mt-0.5"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body Artikel – scrollable */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          <div className="prose-like">{renderBody(tip.articleBody)}</div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <BookMarked size={13} />
            <span>Tumbuh Bijak · Edukasi Remaja</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-maroon text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN HEADER UTAMA
────────────────────────────────────────────────────────────────────────────── */
export default function Header({ activeTab = 'beranda', onTabChange = () => {} }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [activeNews, setActiveNews] = useState(null); // tip object | null

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
    { id: 'kuis', label: 'Kuis', icon: HelpCircle },
    { id: 'cerita', label: 'Cerita', icon: MessageSquareQuote },
  ];

  const handleTipClick = (tip) => {
    setIsNotifOpen(false);
    setActiveNews(tip);
  };

  const handleExploreAll = () => {
    setIsNotifOpen(false);
    onTabChange('edukasi');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-gray-200/60 px-4 sm:px-6 md:px-8 py-3.5 md:py-4 transition-all">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            type="button"
            onClick={() => onTabChange('beranda')}
            className="flex items-center space-x-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-maroon flex items-center justify-center text-white shadow-sm font-bold text-lg md:text-xl group-hover:scale-105 transition-transform">
              🌱
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl md:text-2xl tracking-tight text-maroon leading-none">
                Tumbuh<span className="text-gray-700 font-semibold text-sm md:text-base ml-1">Bijak</span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-medium">Ruang Aman Remaja</span>
            </div>
          </button>

          {/* ── Desktop Top Navbar ── */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/80 border border-gray-200/80 rounded-2xl px-2 py-1.5 shadow-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  type="button"
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-maroon bg-maroon/10 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-maroon rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Profil & Notifikasi ── */}
          <div className="relative flex items-center space-x-2 md:space-x-3">

            {/* Tombol Lonceng */}
            <div className="relative">
              <button
                type="button"
                id="notif-bell-btn"
                onClick={() => setIsNotifOpen((v) => !v)}
                aria-label="Notifikasi Berita Remaja"
                className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                  isNotifOpen
                    ? 'bg-maroon text-white border-maroon'
                    : 'bg-white border-gray-200/80 text-gray-600 hover:text-maroon hover:border-maroon/30'
                }`}
              >
                <Bell size={18} />
                {/* Red dot badge */}
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              </button>

              {/* ── Dropdown Popover ── */}
              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    {/* Backdrop transparan */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotifOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute right-0 top-12 mt-1 w-72 sm:w-84 max-w-[calc(100vw-1.5rem)] bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/90 shadow-2xl z-50 overflow-hidden"
                    >
                      {/* Header Dropdown */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                            Sekilas Info Remaja
                          </h3>
                          <p className="text-[11px] text-gray-400">
                            Update edukasi &amp; tips sehat terkini
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsNotifOpen(false)}
                          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {/* Daftar Berita */}
                      <div className="space-y-1.5">
                        {quickTips.map((tip) => {
                          const TipIcon = tip.icon;
                          return (
                            <button
                              key={tip.id}
                              type="button"
                              onClick={() => handleTipClick(tip)}
                              className="w-full flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-gray-50 active:bg-gray-100/80 transition-colors cursor-pointer text-left group"
                            >
                              <div className={`w-8 h-8 rounded-xl ${tip.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                                <TipIcon size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-gray-800 leading-snug group-hover:text-maroon transition-colors line-clamp-2">
                                  {tip.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                                  {tip.preview}
                                </p>
                              </div>
                              <ChevronRight size={15} className="text-gray-300 group-hover:text-maroon shrink-0 mt-1 transition-colors" />
                            </button>
                          );
                        })}
                      </div>

                      {/* Footer – Link ke Edukasi */}
                      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                        <button
                          type="button"
                          onClick={handleExploreAll}
                          className="text-xs font-bold text-maroon hover:text-maroon/80 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Jelajahi Semua Edukasi</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Tombol Profil */}
            <button
              type="button"
              onClick={() => onTabChange('profil')}
              aria-label="Profil Saya"
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                activeTab === 'profil'
                  ? 'bg-maroon text-white border-maroon ring-2 ring-maroon/20'
                  : 'bg-maroon/10 border-maroon/20 text-maroon hover:bg-maroon hover:text-white'
              }`}
            >
              <User size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Modal Artikel Penuh (Rendered di luar Header supaya z-index bebas) ── */}
      <AnimatePresence>
        {activeNews && (
          <ArticleModal tip={activeNews} onClose={() => setActiveNews(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
