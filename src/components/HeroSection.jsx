import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, BookCheck } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="relative pt-4 sm:pt-6 md:pt-8 pb-4 md:pb-8">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-10 w-64 h-64 md:w-96 md:h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-3xl md:rounded-4xl bg-linear-to-br from-white via-white to-maroon-50/70 p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100 shadow-soft overflow-hidden">
        {/* Layout Grid: 1 Kolom di Mobile, 2 Kolom di Desktop (lg:grid-cols-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Kolom Kiri: Teks & Aksi Utama */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Decorative corner tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon/10 text-maroon text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
              <Sparkles size={15} className="text-maroon animate-pulse" />
              <span>Panduan Terpercaya Pubertas Remaja</span>
            </div>

            {/* Judul Tebal: text-2xl di mobile, md:text-4xl, lg:text-5xl di desktop */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
              Masa Puber? <br />
              <span className="text-maroon">Tenang, Kamu Gak Sendiri!</span>
            </h1>

            {/* Deskripsi ringkas & ramah */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8 font-normal max-w-xl">
              Perubahan fisik, suasana hati, dan pikiran adalah fase biologis yang wajar dialami setiap remaja. Temukan jawaban terpercaya dan ruang aman untuk memahami diri tanpa rasa cemas ataupun malu.
            </p>

            {/* Tombol Mulai Eksplor */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExploreClick}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 md:py-4 bg-maroon hover:bg-maroon-800 active:bg-maroon-900 text-white font-bold text-sm md:text-base rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Compass size={20} />
                <span>Mulai Eksplor</span>
                <ArrowRight size={18} className="ml-0.5 opacity-80" />
              </motion.button>
            </div>
          </div>

          {/* Kolom Kanan: Card Showcase Khusus Desktop/Tablet (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/90 backdrop-blur-xs rounded-2xl md:rounded-3xl p-5 md:p-6 border border-maroon-100 shadow-sm flex flex-col gap-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon flex items-center gap-1.5">
                <ShieldCheck size={16} /> Keunggulan Ruang Aman
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-gray-900">100% Ruang Privasi</div>
                    <div className="text-[11px] text-gray-500">Tanpa penghakiman, aman bertanya</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <BookCheck size={18} />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-gray-900">Fakta Medis Terverifikasi</div>
                    <div className="text-[11px] text-gray-500">Bebas hoaks dan mitos keliru</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <HeartHandshake size={18} />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-gray-900">Bimbingan Suasana Hati</div>
                    <div className="text-[11px] text-gray-500">Kelola emosi masa transisi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
