import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { 
  ChevronsRight, 
  Sparkles, 
  KeyRound, 
  Unlock, 
  Lock, 
  Check,
  ShieldCheck,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

export default function Splash({ onEnter }) {
  // Alur Masuk: 'door' -> 'auth' -> 'welcome'
  const [stage, setStage] = useState('door');
  const [isOpening, setIsOpening] = useState(false);
  
  // Slider track ref & constraint
  const trackRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(210);

  // Pemisahan State Form: isLoginMode (true = Login, false = Register)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form input states
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [email, setEmail] = useState('sahabat@tumbuhbijak.id');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Welcome Progress Percent State (0% -> 100%)
  const [progressPercent, setProgressPercent] = useState(0);

  // Framer motion value for thumb drag position
  const x = useMotionValue(0);

  // Dynamic opacity for track hint text as user drags
  const textOpacity = useTransform(x, [0, 80], [1, 0.15]);
  const progressWidth = useTransform(x, (val) => `${Math.max(val + 52, 52)}px`);

  // Compute maximum drag constraint based on track width
  useEffect(() => {
    const calculateDrag = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.offsetWidth;
        const computed = trackWidth - 52 - 12;
        setMaxDrag(computed > 100 ? computed : 180);
      }
    };

    calculateDrag();
    window.addEventListener('resize', calculateDrag);
    return () => window.removeEventListener('resize', calculateDrag);
  }, []);

  // 1. Trigger saat pintu digeser terbuka: Splash (Drag) -> Pintu Membuka -> Form Autentikasi
  const triggerOpenDoor = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Animasi thumb meluncur mulus ke ujung kanan track
    animate(x, maxDrag, { type: 'spring', stiffness: 350, damping: 28 });

    // Pintu 3D membuka (rotateY), lalu beralih ke form Login/Register
    setTimeout(() => {
      setStage('auth');
    }, 700);
  };

  const handleDragEnd = (event, info) => {
    if (isOpening) return;

    if (info.offset.x >= maxDrag * 0.6 || info.velocity.x > 350) {
      triggerOpenDoor();
    }
  };

  // 2. Submit Form (Masuk atau Daftar) -> Welcome Loading Modal
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setStage('welcome');
  };

  // 3. Welcome Loading Modal: Progress Counter (0% -> 100%) & Auto-Redirect ke Home (~3.4 detik)
  useEffect(() => {
    if (stage === 'welcome') {
      const startTime = Date.now();
      const duration = 3400; // 3.4 detik

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgressPercent(currentProgress);

        if (elapsed >= duration) {
          clearInterval(interval);
          // Jeda halus setelah mencapai 100% lalu render Home
          setTimeout(() => {
            onEnter();
          }, 350);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [stage, onEnter]);

  // Varian transisi antara form Login dan Register (fade dan slide ringan)
  const authFormVariants = {
    initial: (isLogin) => ({
      opacity: 0,
      x: isLogin ? -20 : 20,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (isLogin) => ({
      opacity: 0,
      x: isLogin ? 20 : -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen min-h-[100dvh] w-full bg-[#F8F9FA] flex flex-col justify-between items-center px-4 sm:px-6 py-6 sm:py-10 select-none overflow-hidden font-poppins relative"
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          BAGIAN ATAS: HEADER & BRANDING
          ========================================================================= */}
      <motion.div 
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center relative z-10 max-w-lg mx-auto flex flex-col items-center mt-1 sm:mt-2"
      >
        {/* Badge Atas */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50/80 border border-rose-200/50 text-maroon text-xs sm:text-sm font-semibold shadow-2xs mb-4 sm:mb-5 transition-all">
          <span>🛡️</span>
          <span>Ruang Aman & Bebas Penghakiman</span>
        </div>

        {/* Judul Besar Responsif */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-2">
          Tumbuh <span className="text-maroon">Bijak</span>
        </h1>

        {/* Sub-judul */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-md mx-auto text-center mt-1 sm:mt-2 leading-relaxed font-normal px-2">
          Teman terpercaya menyambut perubahan masa pubertas dengan bijaksana.
        </p>
      </motion.div>

      {/* =========================================================================
          BAGIAN TENGAH: ANIMASI PINTU 3D
          ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center my-4 sm:my-auto">
        <div 
          className="relative w-44 h-60 sm:w-52 sm:h-72 perspective-1000 cursor-pointer group"
          onClick={triggerOpenDoor}
          title="Geser slider di bawah atau ketuk untuk membuka pintu"
        >
          {/* Kusen Pintu Luar */}
          <div className="absolute inset-0 rounded-t-3xl border-2 sm:border-[3px] border-maroon/30 bg-amber-50/40 shadow-xl p-1.5 flex flex-col justify-end">
            
            {/* Ruang Cahaya Hangat di Balik Pintu */}
            <div className="absolute inset-2 rounded-t-2xl bg-linear-to-b from-amber-100 via-rose-50 to-amber-50 flex flex-col items-center justify-center overflow-hidden border border-amber-200/40">
              <motion.div
                animate={{
                  opacity: isOpening ? 1 : 0.3,
                  scale: isOpening ? [0.85, 1.2] : 1,
                }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center p-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-2xl mb-1.5">
                  🌱
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-maroon uppercase tracking-wider">
                  Selamat Datang
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">
                  Kamu Aman Di Sini
                </span>
              </motion.div>

              {/* Glowing Warm Rays */}
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.85, 1], scale: [0.5, 2, 3.5] }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="absolute inset-0 bg-radial from-amber-300/50 via-maroon-100/30 to-transparent blur-xl pointer-events-none"
                />
              )}
            </div>

            {/* Daun Pintu 3D (rotateY saat ditarik) */}
            <motion.div
              animate={{
                rotateY: isOpening ? -105 : 0,
              }}
              transition={{
                duration: 0.95,
                ease: [0.34, 1.3, 0.64, 1],
              }}
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-full rounded-t-2xl bg-linear-to-b from-[#8B1E1E] to-[#600000] border border-maroon-700 shadow-lg flex flex-col justify-between p-3 select-none"
            >
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="h-12 rounded-lg bg-maroon-900/60 border border-maroon-400/30 shadow-inner flex items-center justify-center">
                  <Sparkles size={11} className="text-amber-200/80" />
                </div>
                <div className="h-12 rounded-lg bg-maroon-900/60 border border-maroon-400/30 shadow-inner flex items-center justify-center">
                  <KeyRound size={11} className="text-amber-200/80" />
                </div>
              </div>

              <div className="my-auto py-1 text-center">
                <div className="py-1 px-2 rounded-lg bg-maroon-900/40 border border-maroon-400/20 shadow-inner">
                  <span className="text-[9px] text-amber-100/80 font-semibold tracking-widest uppercase">
                    Ruang Aman
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end pr-2 pb-6">
                <div className="relative flex items-center">
                  <div className="w-3 h-8 rounded-sm bg-linear-to-b from-amber-200 via-amber-400 to-amber-600 shadow-md border border-amber-300 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-amber-800" />
                  </div>
                  <div className="absolute right-1.5 w-4 h-1.5 rounded-r-full bg-linear-to-r from-amber-400 to-amber-200 shadow-xs" />
                </div>
              </div>

              <div className="h-9 rounded-lg bg-maroon-900/50 border border-maroon-400/20 shadow-inner" />
            </motion.div>
          </div>

          <div className="absolute -bottom-3 left-3 right-3 h-3 bg-black/10 rounded-full blur-md" />
        </div>
      </div>

      {/* =========================================================================
          BAGIAN BAWAH: SLIDER (DRAG-TO-OPEN)
          ========================================================================= */}
      <div className="w-full max-w-xs sm:max-w-sm relative z-10 flex flex-col items-center mt-2 mb-2">
        <div 
          ref={trackRef}
          className="relative w-full h-14 sm:h-16 rounded-full bg-white/95 border border-maroon/20 p-1.5 shadow-soft flex items-center overflow-hidden"
        >
          <motion.div 
            style={{ width: progressWidth }}
            className="absolute left-0 top-0 bottom-0 bg-maroon/10 rounded-full pointer-events-none"
          />

          <motion.div 
            style={{ opacity: textOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none pl-8 pr-4"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide flex items-center gap-1.5">
              <span>Geser untuk masuk</span>
              <ChevronsRight size={16} className="text-maroon animate-pulse" />
            </span>
          </motion.div>

          <motion.div
            style={{ x }}
            drag={isOpening ? false : "x"}
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.08}
            dragSnapToOrigin={!isOpening}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold shadow-md cursor-grab active:cursor-grabbing z-20 transition-colors ${
              isOpening
                ? 'bg-emerald-600 text-white'
                : 'bg-maroon hover:bg-maroon-800 text-white'
            }`}
          >
            {isOpening ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <Check size={20} className="stroke-[3]" />
              </motion.div>
            ) : (
              <ChevronsRight size={22} className="stroke-[2.5]" />
            )}
          </motion.div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
            {isOpening ? (
              <Unlock size={18} className="text-emerald-500" />
            ) : (
              <Lock size={18} className="text-gray-300" />
            )}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-2 font-medium">
          {isOpening ? 'Pintu terbuka, memuat akses masuk...' : 'Tarik tuas ke kanan untuk membuka pintu'}
        </p>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center mt-auto mb-2 sm:mb-3 pt-3">
        <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed font-normal">
          Privasimu terjaga 100%. Mulai perjalanan dengan tenang.
        </p>
      </div>

      {/* =========================================================================
          MODAL 1: PEMISAHAN FORM LOGIN & REGISTER (TERPISAH DENGAN ANIMATEPRESENCE)
          ========================================================================= */}
      <AnimatePresence>
        {stage === 'auth' && (
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/35 backdrop-blur-md"
          >
            <motion.div
              key="auth-card"
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: -12 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 26,
              }}
              className="w-[90%] max-w-sm md:max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-2xl relative overflow-hidden"
            >
              {/* Header Icon */}
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-maroon/10 text-maroon flex items-center justify-center mx-auto mb-2.5 shadow-2xs font-bold text-xl">
                  🌱
                </div>
              </div>

              {/* Transisi Halus Pemisahan Form Login vs Register via AnimatePresence */}
              <AnimatePresence mode="wait" custom={isLoginMode}>
                {isLoginMode ? (
                  /* ---------------------------------------------------------------
                     FORM LOGIN
                     Input Email, Password, Tombol "Masuk", Teks "Belum punya akun? Daftar di sini"
                     --------------------------------------------------------------- */
                  <motion.div
                    key="form-login"
                    custom={isLoginMode}
                    variants={authFormVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Masuk ke Ruang Aman
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Akses kembali panduan dan jurnal pribadimu
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {/* Input Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Mail size={17} />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all font-normal"
                          />
                        </div>
                      </div>

                      {/* Input Password */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Kata Sandi
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Lock size={17} />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="w-full pl-10 pr-11 py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all font-normal"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                      </div>

                      {/* Tombol "Masuk" (Maroon) */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 sm:py-4 mt-2 rounded-2xl bg-maroon hover:bg-maroon-800 active:bg-maroon-900 text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Masuk</span>
                        <ArrowRight size={17} className="stroke-[2.5]" />
                      </motion.button>
                    </form>

                    {/* Teks Link Pindah ke Register */}
                    <div className="mt-5 text-center text-xs sm:text-sm text-gray-500">
                      <span>Belum punya akun? </span>
                      <button
                        type="button"
                        onClick={() => setIsLoginMode(false)}
                        className="text-maroon font-bold hover:underline cursor-pointer"
                      >
                        Daftar di sini
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ---------------------------------------------------------------
                     FORM REGISTER
                     Input Nama Panggilan, Email, Password, Tombol "Daftar", Teks "Sudah punya akun? Masuk di sini"
                     --------------------------------------------------------------- */
                  <motion.div
                    key="form-register"
                    custom={isLoginMode}
                    variants={authFormVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Daftar Akun Baru
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Bergabung bersama sahabat ramah Tumbuh Bijak
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                      {/* Input Nama Panggilan */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Nama Panggilan
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <User size={17} />
                          </div>
                          <input
                            type="text"
                            required
                            value={namaPanggilan}
                            onChange={(e) => setNamaPanggilan(e.target.value)}
                            placeholder="Nama panggilanmu (misal: Rian/Aruna)"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all font-normal"
                          />
                        </div>
                      </div>

                      {/* Input Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Mail size={17} />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all font-normal"
                          />
                        </div>
                      </div>

                      {/* Input Password */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Kata Sandi
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Lock size={17} />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 6 karakter"
                            className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-900 transition-all font-normal"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                      </div>

                      {/* Tombol "Daftar" (Maroon) */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 sm:py-4 mt-2 rounded-2xl bg-maroon hover:bg-maroon-800 active:bg-maroon-900 text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Daftar</span>
                        <ArrowRight size={17} className="stroke-[2.5]" />
                      </motion.button>
                    </form>

                    {/* Teks Link Pindah ke Login */}
                    <div className="mt-5 text-center text-xs sm:text-sm text-gray-500">
                      <span>Sudah punya akun? </span>
                      <button
                        type="button"
                        onClick={() => setIsLoginMode(true)}
                        className="text-maroon font-bold hover:underline cursor-pointer"
                      >
                        Masuk di sini
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 pt-3 border-t border-gray-100 text-center">
                <span className="text-[11px] text-gray-400 font-medium">
                  🔒 Data dan privasimu dienkripsi 100% aman
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: WELCOME LOADING MODAL
          Muncul setelah Login/Register Berhasil, dengan Progress Bar Dinamis & Auto-Redirect
          ========================================================================= */}
      <AnimatePresence>
        {stage === 'welcome' && (
          <motion.div
            key="welcome-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-lg"
          >
            <motion.div
              key="welcome-card"
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 24,
              }}
              className="w-[90%] md:max-w-md lg:max-w-lg p-6 md:p-10 rounded-3xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl relative overflow-hidden flex flex-col items-center text-center z-10"
            >
              {/* Ornamen Ambient di Pojok */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/40 rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-maroon/5 rounded-tr-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Badge Hijau Pastel: "🛡️ Ruang Aman Terverifikasi" */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs sm:text-sm font-bold mb-4 shadow-2xs">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Ruang Aman Terverifikasi</span>
                </div>

                {/* Judul Utama: "Selamat Datang! ✨" */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                  Selamat Datang! ✨
                </h2>

                {/* Subteks */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md mb-8 font-normal">
                  Ruang amanmu sudah terbuka. Mari belajar, mengenali tubuh, dan bertumbuh dengan tenang tanpa rasa canggung.
                </p>

                {/* Loading Bar Interaktif (Tanpa Tombol Manual) */}
                <div className="w-full">
                  {/* Teks Progres Kecil: "Menyiapkan Ruang Aman..." di kiri, Persentase di kanan */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 font-semibold mb-2.5">
                    <span className="flex items-center gap-1.5 text-maroon font-bold">
                      <Sparkles size={14} className="animate-spin text-maroon" style={{ animationDuration: '3s' }} />
                      <span>Menyiapkan Ruang Aman...</span>
                    </span>
                    <span className="font-extrabold text-gray-700">
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Track Progress Bar (Abu-abu Sangat Muda) */}
                  <div className="w-full relative h-4 md:h-5 rounded-full bg-gray-100 border border-gray-200/60 p-0.5 overflow-hidden flex items-center">
                    {/* Fill Line Gradien Maroon yang terisi */}
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3.4, ease: 'easeInOut' }}
                      className="absolute left-0 top-0 bottom-0 bg-linear-to-r from-maroon/20 via-maroon to-maroon-800 rounded-full"
                    />

                    {/* Elemen Thumb Tunas Tanaman di dalam Lingkaran Putih Meluncur dari Kiri (0%) ke Kanan (100%) */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: 'calc(100% - 24px)' }}
                      transition={{ duration: 3.4, ease: 'easeInOut' }}
                      className="absolute top-1/2 -translate-y-1/2 z-10 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white text-maroon flex items-center justify-center shadow-[0_0_12px_rgba(128,0,0,0.45)] border border-maroon/30 pointer-events-none"
                    >
                      <span className="text-xs md:text-sm select-none">🌱</span>
                    </motion.div>
                  </div>
                </div>

                {/* Status Redirect Otomatis */}
                <p className="text-[11px] sm:text-xs text-gray-400 mt-5 font-medium animate-pulse">
                  Memuat beranda dalam sekejap...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
