import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Award, 
  MessageSquareQuote, 
  Shield, 
  ShieldCheck, 
  HeartHandshake, 
  BookMarked, 
  ChevronRight, 
  LogOut, 
  Sparkles, 
  LogIn, 
  UserPlus,
  CheckCircle2
} from 'lucide-react';

export default function Profil() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);

  // Form input states
  const [email, setEmail] = useState('aruna@tumbuhbijak.id');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Aruna');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="py-4 md:py-8 max-w-2xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* =========================================================================
             TAMPILAN LOGIN / DAFTAR (Kondisi isLoggedIn === false)
             ========================================================================= */
          <motion.div
            key="login-view"
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotateX: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-soft"
          >
            {/* Header Form */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-3xl bg-maroon/10 text-maroon flex items-center justify-center mx-auto mb-3 shadow-xs">
                {isRegisterMode ? <UserPlus size={30} /> : <LogIn size={30} />}
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {isRegisterMode ? 'Buat Akun Sahabat' : 'Selamat Datang Kembali'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {isRegisterMode
                  ? 'Bergabunglah dengan ruang aman edukasi pubertas'
                  : 'Masuk untuk mengakses jurnal dan progres belajarmu'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100/80 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  !isRegisterMode
                    ? 'bg-white text-maroon shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  isRegisterMode
                    ? 'bg-white text-maroon shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Daftar
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Nama Panggilan
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama panggilanmu (misal: Aruna)"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl bg-maroon hover:bg-maroon-800 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isRegisterMode ? 'Daftar Sekarang' : 'Masuk ke Ruang Aman'}</span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* =========================================================================
             TAMPILAN PROFIL AKTIF (Kondisi isLoggedIn === true)
             ========================================================================= */
          <motion.div
            key="profile-view"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Kartu Profil Utama: Avatar, Nama, Status */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-maroon/5 rounded-bl-full pointer-events-none" />

              {/* Avatar User di Tengah */}
              <div className="relative inline-block mb-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-amber-100 via-rose-100 to-amber-200 border-4 border-white shadow-md flex items-center justify-center text-4xl sm:text-5xl select-none mx-auto">
                  🌸
                </div>
                <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs shadow-xs" title="Online Aktif">
                  <CheckCircle2 size={15} />
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {name || 'Aruna'}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mt-1.5 border border-emerald-200/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sahabat Tumbuh Aktif</span>
              </div>
            </div>

            {/* Dua Kartu Statistik Bersisihan */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Kartu 1: Skor Kuis */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-soft flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Skor Kuis
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Award size={18} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-1">
                  88%
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span>✓ Level Mahir Mitos & Fakta</span>
                </div>
              </div>

              {/* Kartu 2: Cerita Dibagikan */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-soft flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Cerita Dibagikan
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center">
                    <MessageSquareQuote size={18} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-maroon my-1">
                  12
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  Menginspirasi teman sebaya
                </div>
              </div>
            </div>

            {/* Daftar Menu Baris */}
            <div className="bg-white rounded-3xl p-3 border border-gray-200/80 shadow-soft divide-y divide-gray-100">
              
              {/* Menu 1: Lencana Prestasi */}
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50/80 rounded-2xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900">Lencana Prestasi</div>
                    <div className="text-xs text-gray-500">5 lencana wawasan telah terbuka</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Menu 2: Mode Samaran (Dengan Toggle Interaktif) */}
              <div className="w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    incognitoMode ? 'bg-maroon/10 text-maroon' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Shield size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900">Mode Samaran</div>
                    <div className="text-xs text-gray-500">Sembunyikan nama profil di ruang publik</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncognitoMode(!incognitoMode)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    incognitoMode ? 'bg-maroon' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      incognitoMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Menu 3: Bantuan Konseling */}
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50/80 rounded-2xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <HeartHandshake size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900">Bantuan Konseling</div>
                    <div className="text-xs text-gray-500">Konseling ramah bersama Guru BK & Sahabat Sebaya</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Menu 4: Jurnal Refleksi Diri */}
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50/80 rounded-2xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <BookMarked size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900">Jurnal Refleksi</div>
                    <div className="text-xs text-gray-500">Catatan pribadi pertumbuhanmu</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Kotak Asuransi Privasi Berwarna Hijau Sage Lembut */}
            <div className="rounded-3xl p-5 sm:p-6 bg-[#EBF5EE] text-[#1E4D2B] border border-[#C5E1CE] flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <div className="text-xs sm:text-sm leading-relaxed">
                <div className="font-extrabold text-[#14361E] mb-1">
                  Jaminan Privasi & Kerahasiaan 100%
                </div>
                Seluruh data akun, tulisan cerita, dan progres kuis kamu dienkripsi secara aman. Tumbuh Bijak tidak akan pernah membagikan identitas aslimu ke pihak mana pun.
              </div>
            </div>

            {/* Tombol Keluar dari Akun (Maroon Outline) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              type="button"
              className="w-full py-3.5 px-6 rounded-2xl border-2 border-maroon text-maroon hover:bg-maroon hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <LogOut size={16} />
              <span>Keluar dari Akun</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
