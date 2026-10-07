import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  HelpCircle,
  ListChecks,
  CheckCircle2,
  XCircle,
  Puzzle,
  MessageSquareQuote,
  Play,
  Sparkles,
  RotateCcw,
  Trophy,
  ArrowRight,
  Home,
  Clock,
  AlertTriangle,
  Zap,
  Send,
  Quote,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DATA 5 MODE KUIS EDUKATIF (LOBBY BENTO)
────────────────────────────────────────────────────────────────────────────── */
const QUIZ_MODES = [
  {
    id: 1,
    label: 'MODE 1',
    title: 'Mitos vs Fakta',
    desc: 'Uji wawasanmu! Apakah hal yang sering kamu dengar itu fakta medis atau sekadar mitos belaka?',
    icon: HelpCircle,
    color: {
      bg: 'bg-rose-50',
      iconText: 'text-maroon-600',
      badge: 'bg-rose-100/70 text-maroon-700',
    },
  },
  {
    id: 2,
    label: 'MODE 2',
    title: 'Pilihan Ganda',
    desc: 'Tes pengetahuan dasar kesehatan remajamu dengan kuis klasik 4 pilihan jawaban.',
    icon: ListChecks,
    color: {
      bg: 'bg-sky-50',
      iconText: 'text-sky-600',
      badge: 'bg-sky-100/70 text-sky-700',
    },
  },
  {
    id: 3,
    label: 'MODE 3',
    title: 'Benar atau Salah',
    desc: 'Uji refleks dan keakuratanmu dalam menilai sebuah pernyataan edukasi dalam 15 detik.',
    icon: CheckCircle2,
    color: {
      bg: 'bg-emerald-50',
      iconText: 'text-emerald-600',
      badge: 'bg-emerald-100/70 text-emerald-700',
    },
  },
  {
    id: 4,
    label: 'MODE 4',
    title: 'Tebak-Tebakan',
    desc: 'Pecahkan teka-teki seru seputar perubahan tubuh dan istilah biologi pubertas.',
    icon: Puzzle,
    color: {
      bg: 'bg-violet-50',
      iconText: 'text-violet-600',
      badge: 'bg-violet-100/70 text-violet-700',
    },
  },
  {
    id: 5,
    label: 'MODE 5',
    title: 'Skenario Kasus',
    desc: 'Hadapi situasi sehari-hari dan pilih tindakan yang paling tepat serta berempati.',
    icon: MessageSquareQuote,
    color: {
      bg: 'bg-amber-50',
      iconText: 'text-amber-600',
      badge: 'bg-amber-100/70 text-amber-700',
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA SOAL MODE 1: MITOS VS FAKTA (5 Soal)
────────────────────────────────────────────────────────────────────────────── */
const mitosFaktaData = [
  {
    id: 1,
    pertanyaan: 'Mencukur bulu akan membuatnya tumbuh lebih lebat dan tebal.',
    jawabanBenar: 'Mitos',
    penjelasan:
      'Ujung bulu yang dicukur terasa tumpul sehingga terkesan tebal, padahal tidak mengubah struktur akar rambut.',
  },
  {
    id: 2,
    pertanyaan: 'Mimpi basah pada remaja laki-laki adalah tanda penyakit reproduksi.',
    jawabanBenar: 'Mitos',
    penjelasan:
      'Ini adalah mekanisme alami tubuh mengeluarkan kelebihan sperma seiring matangnya organ reproduksi.',
  },
  {
    id: 3,
    pertanyaan: 'Jerawat saat pubertas hanya dipicu oleh makanan berlemak.',
    jawabanBenar: 'Mitos',
    penjelasan:
      'Jerawat pubertas utamanya dipicu oleh lonjakan hormon androgen yang meningkatkan produksi minyak di kulit.',
  },
  {
    id: 4,
    pertanyaan: 'Perubahan mood (mood swing) yang drastis wajar dialami saat masa pubertas.',
    jawabanBenar: 'Fakta',
    penjelasan:
      'Fluktuasi hormon memengaruhi senyawa kimia di otak yang mengatur suasana hati.',
  },
  {
    id: 5,
    pertanyaan: 'Memakai bra yang ketat bisa menghentikan pertumbuhan payudara.',
    jawabanBenar: 'Mitos',
    penjelasan:
      'Ukuran payudara ditentukan oleh genetik dan hormon, bukan oleh pakaian dalam.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA SOAL MODE 2: PILIHAN GANDA (5 Soal)
────────────────────────────────────────────────────────────────────────────── */
const pilihanGandaData = [
  {
    id: 1,
    pertanyaan: "Apa penyebab utama remaja sering mengalami 'mood swing' (perubahan suasana hati yang cepat)?",
    opsi: [
      'Banyak tugas sekolah',
      'Perubahan fluktuasi hormon di otak',
      'Kurang makan makanan manis',
      'Sering bermain gadget',
    ],
    jawabanBenar: 'Perubahan fluktuasi hormon di otak',
    penjelasan:
      'Fluktuasi hormon selama pubertas memengaruhi senyawa kimia di otak yang mengatur emosi, sehingga wajar jika suasana hati cepat berubah.',
  },
  {
    id: 2,
    pertanyaan: 'Berikut adalah cara merawat wajah berjerawat yang tepat, KECUALI...',
    opsi: [
      'Mencuci muka 2x sehari',
      'Pakai pelembap non-komedogenik',
      'Sering menyentuh wajah dengan tangan',
      'Memakai tabir surya/sunscreen',
    ],
    jawabanBenar: 'Sering menyentuh wajah dengan tangan',
    penjelasan:
      'Tangan kita penuh dengan bakteri. Menyentuh wajah akan mentransfer bakteri ke pori-pori dan memperparah jerawat.',
  },
  {
    id: 3,
    pertanyaan: 'Apa fungsi utama hormon testosteron yang meningkat pada remaja laki-laki?',
    opsi: [
      'Memperkecil ukuran tulang',
      'Memperbesar suara dan massa otot',
      'Menghentikan produksi keringat',
      'Membuat rambut cepat rontok',
    ],
    jawabanBenar: 'Memperbesar suara dan massa otot',
    penjelasan:
      'Hormon testosteron memicu perubahan fisik sekunder pada laki-laki seperti dada bidang, jakun membesar, dan suara mematangkan.',
  },
  {
    id: 4,
    pertanyaan: 'Jika pakaian dalam terasa sangat lembap akibat keringat setelah beraktivitas, langkah terbaik adalah...',
    opsi: [
      'Semprot parfum yang banyak',
      'Biarkan kering sendiri di badan',
      'Segera ganti dengan pakaian dalam bersih',
      'Taburkan bedak agar wangi',
    ],
    jawabanBenar: 'Segera ganti dengan pakaian dalam bersih',
    penjelasan:
      'Area privat yang lembap adalah tempat favorit jamur dan bakteri untuk berkembang biak, yang bisa memicu gatal dan infeksi.',
  },
  {
    id: 5,
    pertanyaan: 'Siklus menstruasi yang tidak teratur (kadang sebulan 2x, kadang absen) pada 1-2 tahun pertama pubertas adalah hal yang...',
    opsi: [
      'Wajar karena hormon belum stabil',
      'Sangat berbahaya',
      'Tanda butuh operasi',
      'Pasti gejala penyakit kronis',
    ],
    jawabanBenar: 'Wajar karena hormon belum stabil',
    penjelasan:
      'Di tahun-tahun awal pubertas, tubuh masih beradaptasi dengan produksi hormon reproduksi sehingga siklus haid butuh waktu untuk menjadi teratur.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA SOAL MODE 3: BENAR ATAU SALAH (5 Soal Mode Cepat)
────────────────────────────────────────────────────────────────────────────── */
const benarSalahData = [
  {
    id: 1,
    pertanyaan:
      'Suara anak laki-laki menjadi lebih berat (pecah) selama masa pubertas karena pita suara memanjang dan menebal.',
    jawabanBenar: true,
    penjelasan:
      'Pertumbuhan laring (jakun) dan pita suara yang menebal karena testosteron membuat nada suara laki-laki menjadi lebih rendah/berat.',
  },
  {
    id: 2,
    pertanyaan: 'Perempuan sama sekali tidak memproduksi hormon testosteron di dalam tubuhnya.',
    jawabanBenar: false,
    penjelasan:
      'Perempuan juga memproduksi testosteron dalam jumlah kecil di ovarium dan kelenjar adrenal yang berfungsi mengatur mood dan kepadatan tulang.',
  },
  {
    id: 3,
    pertanyaan:
      'Berkeringat lebih banyak dan mulai berbau saat pubertas disebabkan oleh kelenjar apokrin yang baru mulai aktif.',
    jawabanBenar: true,
    penjelasan:
      'Kelenjar apokrin di area ketiak dan pangkal paha mulai aktif saat pubertas, menghasilkan keringat yang memicu bakteri penyebab bau badan.',
  },
  {
    id: 4,
    pertanyaan:
      'Mendapatkan menstruasi pertama (menarche) menandakan tinggi badan seorang perempuan sudah tidak bisa bertambah lagi.',
    jawabanBenar: false,
    penjelasan:
      'Perempuan masih bisa bertambah tinggi sekitar 1-2 tahun setelah menstruasi pertamanya, meskipun laju pertumbuhannya melambat.',
  },
  {
    id: 5,
    pertanyaan:
      'Tidur larut malam secara rutin tidak berpengaruh pada produksi hormon pertumbuhan remaja.',
    jawabanBenar: false,
    penjelasan:
      'Hormon Pertumbuhan Manusia (HGH) dilepaskan paling optimal saat kita berada dalam fase tidur nyenyak di malam hari.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA SOAL MODE 4: TEBAK-TEBAKAN (5 Teka-Teki)
────────────────────────────────────────────────────────────────────────────── */
const tebakTebakanData = [
  {
    id: 1,
    petunjuk:
      'Aku adalah zat berminyak yang dihasilkan kelenjar kulit. Saat puber, aku diproduksi berlebih dan bisa menyumbat pori memicu jerawat. Siapakah aku?',
    jawaban: 'SEBUM',
    penjelasan:
      'Sebum adalah minyak alami kulit. Produksi sebum meningkat pesat saat pubertas akibat lonjakan hormon.',
  },
  {
    id: 2,
    petunjuk:
      'Aku adalah hormon utama pada perempuan yang berperan besar dalam perubahan fisik seperti membesarnya payudara dan mengatur siklus haid. Siapakah aku?',
    jawaban: 'ESTROGEN',
    penjelasan:
      'Estrogen adalah hormon reproduksi utama wanita yang memandu seluruh proses pubertas dan pematangan organ reproduksi perempuan.',
  },
  {
    id: 3,
    petunjuk:
      'Aku adalah tonjolan tulang rawan di bagian depan leher laki-laki yang membesar saat pubertas dan membuat suara menjadi berat. Siapakah aku?',
    jawaban: 'JAKUN',
    penjelasan:
      'Membesarnya jakun adalah tanda sekunder pubertas pada laki-laki yang disebabkan oleh aktivitas hormon testosteron pada laring (kotak suara).',
  },
  {
    id: 4,
    petunjuk:
      'Aku adalah kelenjar keringat yang baru aktif saat masa pubertas, terutama terletak di area ketiak dan pangkal paha, yang memicu bau badan. Siapakah aku?',
    jawaban: 'APOKRIN',
    penjelasan:
      'Kelenjar apokrin menghasilkan keringat yang lebih kental. Jika bercampur dengan bakteri di kulit, keringat inilah yang memunculkan bau badan.',
  },
  {
    id: 5,
    petunjuk:
      'Aku adalah siklus alami bulanan pada perempuan di mana lapisan dinding rahim luruh menjadi darah. Siapakah aku?',
    jawaban: 'MENSTRUASI',
    penjelasan:
      'Menstruasi adalah tanda biologis bahwa tubuh perempuan sudah mulai memproduksi sel telur dan organ reproduksinya telah matang.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA SOAL MODE 5: SKENARIO KASUS (5 Kasus Nyata)
────────────────────────────────────────────────────────────────────────────── */
const skenarioData = [
  {
    id: 1,
    skenario:
      'Teman sebangkumu sering menutupi wajahnya dengan masker karena malu sedang berjerawat parah, dan beberapa teman lain malah meledeknya.',
    opsi: [
      'Ikut meledek agar bisa berbaur dengan teman lain',
      'Memberitahunya untuk memencet jerawatnya agar cepat hilang',
      'Menghiburnya dan bilang bahwa jerawat adalah hal wajar saat pubertas',
      'Menjauhinya karena takut ketularan jerawat',
    ],
    jawabanBenar:
      'Menghiburnya dan bilang bahwa jerawat adalah hal wajar saat pubertas',
    penjelasan:
      'Dukungan emosional sangat penting di masa pubertas. Jerawat sama sekali tidak menular dan merupakan proses biologis yang normal.',
  },
  {
    id: 2,
    skenario:
      'Kamu baru saja bangun tidur dan menyadari celanamu basah (mimpi basah). Kamu merasa bingung dan sedikit bersalah.',
    opsi: [
      'Menyembunyikan celana itu selamanya karena malu',
      'Segera mandi wajib/membersihkan diri dan sadar itu tanda pubertas normal',
      'Panik dan mengira kamu terkena penyakit serius',
      'Marah pada diri sendiri',
    ],
    jawabanBenar:
      'Segera mandi wajib/membersihkan diri dan sadar itu tanda pubertas normal',
    penjelasan:
      'Mimpi basah adalah cara alami tubuh remaja laki-laki mengeluarkan sperma yang mulai diproduksi, bukan sebuah kesalahan atau penyakit.',
  },
  {
    id: 3,
    skenario:
      'Seharian ini kamu merasa sangat mudah marah (sensitif), padahal tidak ada masalah besar yang terjadi.',
    opsi: [
      'Mencari masalah dengan orang tua atau teman',
      'Menulis status marah-marah di semua media sosial',
      'Menarik diri sejenak, mendengarkan lagu, atau melakukan hobi untuk tenang',
      'Memaksa diri untuk terus tersenyum palsu',
    ],
    jawabanBenar:
      'Menarik diri sejenak, mendengarkan lagu, atau melakukan hobi untuk tenang',
    penjelasan:
      'Mood swing disebabkan oleh fluktuasi hormon. Mengambil waktu untuk diri sendiri (me-time) adalah cara paling sehat untuk mengelola emosi tersebut.',
  },
  {
    id: 4,
    skenario:
      'Setelah pelajaran Olahraga, kamu menyadari badanmu mengeluarkan bau keringat yang cukup menyengat.',
    opsi: [
      'Langsung menyemprotkan parfum sebotol ke baju olahraga',
      'Menghindari teman-teman sampai jam pulang sekolah',
      'Mengganti baju dengan seragam bersih dan menggunakan antiperspiran/deodoran',
      'Berpura-pura tidak tahu dan tetap memeluk teman',
    ],
    jawabanBenar:
      'Mengganti baju dengan seragam bersih dan menggunakan antiperspiran/deodoran',
    penjelasan:
      'Mandi atau mengganti pakaian bersih serta menggunakan deodoran adalah kunci menjaga kebersihan area kelenjar apokrin yang aktif.',
  },
  {
    id: 5,
    skenario:
      'Kamu melihat selebgram seusiamu di Instagram yang memiliki bentuk tubuh sangat ideal, membuatmu merasa sangat insecure.',
    opsi: [
      'Langsung melakukan diet ekstrem dengan tidak makan nasi',
      'Membatasi waktu di media sosial dan fokus berolahraga untuk kesehatan sendiri',
      'Menulis komentar negatif di postingan selebgram tersebut',
      'Mengurung diri di kamar sambil menangis',
    ],
    jawabanBenar:
      'Membatasi waktu di media sosial dan fokus berolahraga untuk kesehatan sendiri',
    penjelasan:
      'Setiap tubuh memiliki waktu dan proses pertumbuhannya masing-masing. Berfokuslah pada kesehatan tubuhmu sendiri, bukan membandingkannya dengan standar semu di internet.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   VARIANTS ANIMASI LOBBY
────────────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 1: LOBI MODE KUIS (BENTO STYLE CLEAN & MODERN)
────────────────────────────────────────────────────────────────────────────── */
function QuizLobby({ onStartQuiz }) {
  return (
    <motion.div
      key="quiz-lobby"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      {/* ── Header Lobi (Soft-Minimalism Banner) ── */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-tr from-rose-50 via-white to-orange-50 p-8 sm:p-10 mb-8 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-center md:text-left">
        {/* Dekorasi Glow Lembut */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -mb-24" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-100 text-maroon-700 text-xs font-semibold mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-sm">
            <Sparkles size={13} className="text-maroon-600" />
            <span>Pusat Kuis Edukatif</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-800 mb-2">
            Pusat Kuis <span className="text-maroon-700">Tumbuh Bijak</span>
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
            Pilih mode kuis favoritmu dan uji pemahamanmu seputar pubertas dengan cara yang seru!
          </p>
        </div>
      </div>

      {/* ── Grid 5 Mode Kuis (Soft Bento Style) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {QUIZ_MODES.map((mode, index) => {
          const Icon = mode.icon;
          const isFifthCard = index === 4;

          return (
            <motion.div
              key={mode.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className={`bg-white rounded-[24px] border border-slate-100/70 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group p-6 sm:p-7 ${
                isFifthCard ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Header Kartu: Ikon & Badge Status Minimalis */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${mode.color.bg} flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}
                >
                  <Icon size={24} className={mode.color.iconText} />
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-slate-100 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Aktif
                </span>
              </div>

              {/* Konten Teks Bersih */}
              <div className="flex-1 mb-5">
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-lg inline-block mb-2 ${mode.color.badge}`}
                >
                  {mode.label}
                </span>
                <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-maroon-700 transition-colors mb-2">
                  {mode.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {mode.desc}
                </p>
              </div>

              {/* Tombol Soft Button Mulai Kuis */}
              <button
                type="button"
                onClick={() => onStartQuiz(mode)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-50 hover:bg-maroon-700 text-maroon-700 hover:text-white text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer mt-auto"
              >
                <Play size={14} fill="currentColor" />
                <span>Mulai Kuis</span>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 2: MODE 1 – MITOS VS FAKTA (CLEAN CONTAINER)
────────────────────────────────────────────────────────────────────────────── */
function Mode1MitosFakta({ onBackToLobby }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = mitosFaktaData[currentQuestionIndex];
  const totalQuestions = mitosFaktaData.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#800000', '#10B981', '#F59E0B', '#3B82F6', '#EC4899'],
      disableForReducedMotion: true,
    });
  };

  const handleSelectAnswer = (choice) => {
    if (isAnswered) return;

    setUserAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQ.jawabanBenar;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setUserAnswer(null);
    setIsFinished(false);
  };

  const isCurrentCorrect = isAnswered && userAnswer === currentQ.jawabanBenar;

  return (
    <motion.div
      key="mode-1-quiz"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-2"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToLobby}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-xl bg-maroon/10 text-maroon font-extrabold text-xs sm:text-sm">
            Skor: {score}
          </div>
          {!isFinished && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 font-bold text-xs sm:text-sm shadow-sm">
              Soal {currentQuestionIndex + 1} dari {totalQuestions}
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Progress Bar Halus */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-maroon rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-maroon bg-maroon/10 px-2.5 py-1 rounded-lg">
              Mode 1: Mitos vs Fakta
            </span>
            <span className="text-xs font-semibold text-slate-400">
              #{currentQuestionIndex + 1}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug mb-8">
            &ldquo;{currentQ.pertanyaan}&rdquo;
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelectAnswer('Fakta')}
              disabled={isAnswered}
              className={`py-4 sm:py-5 px-4 rounded-2xl font-bold text-base border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:cursor-not-allowed ${
                userAnswer === 'Fakta'
                  ? isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : isAnswered && currentQ.jawabanBenar === 'Fakta'
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900'
                  : 'bg-emerald-50/40 hover:bg-emerald-50/80 border-emerald-200/60 text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isAnswered && currentQ.jawabanBenar === 'Fakta' && (
                  <CheckCircle2 size={18} className="text-emerald-700" />
                )}
                {isAnswered && userAnswer === 'Fakta' && !isCurrentCorrect && (
                  <XCircle size={18} className="text-rose-600" />
                )}
                <span>Fakta</span>
              </div>
              <span className="text-[11px] font-medium opacity-70">
                Kebenaran Medis
              </span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelectAnswer('Mitos')}
              disabled={isAnswered}
              className={`py-4 sm:py-5 px-4 rounded-2xl font-bold text-base border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:cursor-not-allowed ${
                userAnswer === 'Mitos'
                  ? isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : isAnswered && currentQ.jawabanBenar === 'Mitos'
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50/40 hover:bg-rose-50/80 border-rose-200/60 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isAnswered && currentQ.jawabanBenar === 'Mitos' && (
                  <CheckCircle2 size={18} className="text-emerald-700" />
                )}
                {isAnswered && userAnswer === 'Mitos' && !isCurrentCorrect && (
                  <XCircle size={18} className="text-rose-600" />
                )}
                <span>Mitos</span>
              </div>
              <span className="text-[11px] font-medium opacity-70">
                Bukan Fakta Ilmiah
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-5 rounded-2xl border ${
                  isCurrentCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-900">
                        Hebat! Jawabanmu Benar (+100 Poin) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={19} className="text-rose-600 shrink-0" />
                      <span className="text-rose-900">
                        Kurang Tepat! Jawaban yang benar adalah: {currentQ.jawabanBenar}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Penjelasan Medis:</strong> {currentQ.penjelasan}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions
                        ? 'Soal Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Hasil Akhir */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto p-8 sm:p-10 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="w-18 h-18 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={38} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Kuis Selesai!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Kamu telah menyelesaikan semua pertanyaan di Mode 1: Mitos vs Fakta.
          </p>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-7 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Skor Total Kamu
            </p>
            <p className="text-4xl font-extrabold text-maroon my-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ 500 Poin</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {score === 500
                ? '🌟 Luar biasa sempurna! Pemahaman pubertasmu sangat tajam dan matang!'
                : score >= 300
                ? '👍 Hebat sekali! Wawasan kesehatanmu sudah sangat baik.'
                : '🌱 Tetap semangat belajar! Mengenali tubuh adalah proses bertahap.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Mainkan Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home size={15} />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 3: MODE 2 – PILIHAN GANDA (CLEAN CONTAINER)
────────────────────────────────────────────────────────────────────────────── */
function Mode2PilihanGanda({ onBackToLobby }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = pilihanGandaData[currentQuestionIndex];
  const totalQuestions = pilihanGandaData.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#800000', '#0284C7', '#10B981', '#F59E0B', '#8B5CF6'],
      disableForReducedMotion: true,
    });
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;

    setUserAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.jawabanBenar;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setUserAnswer(null);
    setIsFinished(false);
  };

  const isCurrentCorrect = isAnswered && userAnswer === currentQ.jawabanBenar;
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <motion.div
      key="mode-2-quiz"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-2"
    >
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToLobby}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-xl bg-sky-50 text-sky-800 font-extrabold text-xs sm:text-sm">
            Skor: {score}
          </div>
          {!isFinished && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 font-bold text-xs sm:text-sm shadow-sm">
              Soal {currentQuestionIndex + 1} dari {totalQuestions}
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-sky-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg">
              Mode 2: Pilihan Ganda
            </span>
            <span className="text-xs font-semibold text-slate-400">
              #{currentQuestionIndex + 1}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug mb-8">
            {currentQ.pertanyaan}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentQ.opsi.map((option, idx) => {
              const label = optionLabels[idx] || `${idx + 1}`;
              const isSelected = userAnswer === option;
              const isThisTheCorrectAnswer = option === currentQ.jawabanBenar;

              let btnStyle =
                'bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800';

              if (isAnswered) {
                if (isSelected && isThisTheCorrectAnswer) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm';
                } else if (isSelected && !isThisTheCorrectAnswer) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm';
                } else if (!isSelected && isThisTheCorrectAnswer) {
                  btnStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-900';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={!isAnswered ? { scale: 1.015 } : {}}
                  whileTap={!isAnswered ? { scale: 0.985 } : {}}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl font-semibold text-left transition-all cursor-pointer flex items-center gap-3 disabled:cursor-not-allowed ${btnStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected && isThisTheCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isSelected && !isThisTheCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : isAnswered && isThisTheCorrectAnswer
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {label}
                  </div>

                  <span className="text-xs sm:text-sm font-medium flex-1 leading-snug">
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-5 rounded-2xl border ${
                  isCurrentCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-900">
                        Tepat Sekali! Jawabanmu Benar (+100 Poin) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={19} className="text-rose-600 shrink-0" />
                      <span className="text-rose-900">
                        Kurang Tepat! Jawaban yang benar adalah: {currentQ.jawabanBenar}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Penjelasan Medis:</strong> {currentQ.penjelasan}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions
                        ? 'Soal Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto p-8 sm:p-10 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="w-18 h-18 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={38} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Kuis Selesai!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Kamu telah menyelesaikan semua pertanyaan di Mode 2: Pilihan Ganda.
          </p>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-7 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Skor Total Kamu
            </p>
            <p className="text-4xl font-extrabold text-maroon my-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ 500 Poin</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {score === 500
                ? '🌟 Luar biasa sempurna! Wawasan kesehatan pubertasmu sangat baik!'
                : score >= 300
                ? '👍 Hebat sekali! Pemahaman teoritis dan praktismu sangat mantap.'
                : '🌱 Tetap semangat belajar! Setiap informasi baru membantumu tumbuh lebih bijak.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Mainkan Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home size={15} />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 4: MODE 3 – BENAR ATAU SALAH (CLEAN CONTAINER)
────────────────────────────────────────────────────────────────────────────── */
function Mode3BenarSalah({ onBackToLobby }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeout, setIsTimeout] = useState(false);

  const currentQ = benarSalahData[currentQuestionIndex];
  const totalQuestions = benarSalahData.length;

  useEffect(() => {
    if (isAnswered || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAnswered(true);
          setIsTimeout(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswered, isFinished]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#800000', '#10B981', '#06B6D4', '#F59E0B', '#6366F1'],
      disableForReducedMotion: true,
    });
  };

  const handleAnswer = (choice) => {
    if (isAnswered) return;

    setUserAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQ.jawabanBenar;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
      setTimeLeft(15);
      setIsTimeout(false);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setUserAnswer(null);
    setIsFinished(false);
    setTimeLeft(15);
    setIsTimeout(false);
  };

  const isCurrentCorrect = isAnswered && !isTimeout && userAnswer === currentQ.jawabanBenar;
  const timePercent = (timeLeft / 15) * 100;
  const isTimeCritical = timeLeft < 5;

  return (
    <motion.div
      key="mode-3-quiz"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-2"
    >
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToLobby}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          {!isFinished && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                isTimeCritical
                  ? 'bg-rose-50 text-rose-700 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              <Clock size={15} className={isTimeCritical ? 'text-rose-600' : 'text-emerald-600'} />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-xs sm:text-sm">
            Skor: {score}
          </div>

          {!isFinished && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 font-bold text-xs sm:text-sm shadow-sm hidden sm:block">
              Soal {currentQuestionIndex + 1}/{totalQuestions}
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className={`h-full rounded-full transition-colors duration-300 ${
                isTimeCritical ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
              }`}
              style={{ width: `${timePercent}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Zap size={13} className="text-emerald-600" />
              Mode 3: Benar atau Salah
            </span>
            <span className="text-xs font-semibold text-slate-400">
              #{currentQuestionIndex + 1}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug mb-8">
            &ldquo;{currentQ.pertanyaan}&rdquo;
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(true)}
              disabled={isAnswered}
              className={`py-4 sm:py-5 px-4 rounded-2xl font-bold text-base border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:cursor-not-allowed ${
                userAnswer === true
                  ? isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : isAnswered && currentQ.jawabanBenar === true
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900'
                  : 'bg-teal-50/40 hover:bg-teal-50/80 border-teal-200/60 text-teal-900'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl">✅</span>
                <span>Benar</span>
              </div>
              <span className="text-[11px] font-medium opacity-70">
                Pernyataan Tepat
              </span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(false)}
              disabled={isAnswered}
              className={`py-4 sm:py-5 px-4 rounded-2xl font-bold text-base border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:cursor-not-allowed ${
                userAnswer === false
                  ? isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : isAnswered && currentQ.jawabanBenar === false
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50/40 hover:bg-rose-50/80 border-rose-200/60 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl">❌</span>
                <span>Salah</span>
              </div>
              <span className="text-[11px] font-medium opacity-70">
                Pernyataan Keliru
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-5 rounded-2xl border ${
                  isTimeout
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : isCurrentCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                  {isTimeout ? (
                    <>
                      <AlertTriangle size={19} className="text-amber-600 shrink-0" />
                      <span className="text-amber-900">
                        Waktu Habis! Jawaban yang benar: {currentQ.jawabanBenar ? 'Benar ✅' : 'Salah ❌'}
                      </span>
                    </>
                  ) : isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-900">
                        Respon Cepat & Tepat! (+100 Poin) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={19} className="text-rose-600 shrink-0" />
                      <span className="text-rose-900">
                        Kurang Tepat! Jawaban yang benar: {currentQ.jawabanBenar ? 'Benar ✅' : 'Salah ❌'}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Penjelasan Medis:</strong> {currentQ.penjelasan}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions
                        ? 'Soal Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto p-8 sm:p-10 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="w-18 h-18 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={38} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Mode Cepat Selesai!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Refleks dan pemahamanmu di Mode 3: Benar atau Salah sangat luar biasa.
          </p>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-7 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Skor Total Kamu
            </p>
            <p className="text-4xl font-extrabold text-maroon my-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ 500 Poin</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {score === 500
                ? '⚡ Kecepatan & akurasi sempurna! Kamu menguasai biologi pubertas dengan sangat matang!'
                : score >= 300
                ? '👍 Kerja bagus! Refleks dan analisismu di bawah tekanan waktu sudah terasah.'
                : '🌱 Latihan membuat sempurna! Coba lagi untuk mempertajam refleks pemahamanmu.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Mainkan Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home size={15} />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 5: MODE 4 – TEBAK-TEBAKAN (CLEAN CONTAINER)
────────────────────────────────────────────────────────────────────────────── */
function Mode4TebakTebakan({ onBackToLobby }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shake, setShake] = useState(false);

  const currentQ = tebakTebakanData[currentQuestionIndex];
  const totalQuestions = tebakTebakanData.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#800000', '#7C3AED', '#10B981', '#F59E0B', '#EC4899'],
      disableForReducedMotion: true,
    });
  };

  const handleGuess = (e) => {
    if (e) e.preventDefault();
    if (isAnswered) return;

    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    setIsAnswered(true);

    const isAnswerMatched =
      trimmedInput.toLowerCase() === currentQ.jawaban.toLowerCase();

    if (isAnswerMatched) {
      setIsCorrect(true);
      setScore((prev) => prev + 100);
      triggerConfetti();
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 550);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setIsCorrect(null);
      setShake(false);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput('');
    setIsAnswered(false);
    setIsCorrect(null);
    setIsFinished(false);
    setShake(false);
  };

  return (
    <motion.div
      key="mode-4-quiz"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-2"
    >
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToLobby}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-xl bg-violet-50 text-violet-800 font-extrabold text-xs sm:text-sm">
            Skor: {score}
          </div>
          {!isFinished && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 font-bold text-xs sm:text-sm shadow-sm">
              Soal {currentQuestionIndex + 1} dari {totalQuestions}
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-violet-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-violet-800 bg-violet-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Puzzle size={13} className="text-violet-600" />
              Mode 4: Tebak-Tebakan
            </span>
            <span className="text-xs font-semibold text-slate-400">
              #{currentQuestionIndex + 1}
            </span>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-5 mb-7">
            <span className="text-[11px] font-bold uppercase tracking-wider text-maroon block mb-1">
              🔍 Petunjuk Misteri:
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed italic">
              &ldquo;{currentQ.petunjuk}&rdquo;
            </h2>
          </div>

          <form onSubmit={handleGuess}>
            <motion.div
              animate={shake ? { x: [-12, 12, -10, 10, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-4"
            >
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-center">
                Jawaban Kamu (Satu Kata):
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                disabled={isAnswered}
                placeholder="KETIK JAWABANMU DI SINI..."
                className={`w-full text-center uppercase tracking-wider font-extrabold text-lg sm:text-xl py-3.5 px-4 rounded-2xl border-2 transition-all outline-none ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'border-maroon/70 bg-white text-slate-900 focus:border-maroon focus:ring-4 focus:ring-maroon/10'
                }`}
                autoFocus
              />
            </motion.div>

            {!isAnswered && (
              <motion.button
                type="submit"
                whileHover={userInput.trim() ? { scale: 1.015 } : {}}
                whileTap={userInput.trim() ? { scale: 0.985 } : {}}
                disabled={!userInput.trim() || isAnswered}
                className="w-full py-3.5 px-6 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-sm sm:text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Tebak Jawaban</span>
              </motion.button>
            )}
          </form>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-5 rounded-2xl border ${
                  isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-900">
                        Tepat Sekali! Jawabannya adalah {currentQ.jawaban} (+100 Poin) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={19} className="text-rose-600 shrink-0" />
                      <span className="text-rose-900">
                        Tebakanmu Kurang Tepat! Jawaban yang benar adalah: {currentQ.jawaban}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Penjelasan Medis:</strong> {currentQ.penjelasan}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions
                        ? 'Soal Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto p-8 sm:p-10 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="w-18 h-18 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={38} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Teka-Teki Selesai!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Kamu berhasil memecahkan semua teka-teki istilah pubertas di Mode 4.
          </p>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-7 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Skor Total Kamu
            </p>
            <p className="text-4xl font-extrabold text-maroon my-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ 500 Poin</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {score === 500
                ? '🧩 Detektif biologi sejati! Kosakata dan konsep pubertasmu sangat kaya!'
                : score >= 300
                ? '👍 Kerja hebat! Kamu mengenali istilah-istilah biologi penting dengan sangat baik.'
                : '🌱 Keren sudah berusaha! Menghafal istilah baru memang butuh waktu dan latihan.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Mainkan Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home size={15} />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN 6: MODE 5 – SKENARIO KASUS (EMPATI & PENGAMBILAN KEPUTUSAN)
────────────────────────────────────────────────────────────────────────────── */
function Mode5SkenarioKasus({ onBackToLobby }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = skenarioData[currentQuestionIndex];
  const totalQuestions = skenarioData.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#800000', '#D97706', '#10B981', '#6366F1', '#EC4899'],
      disableForReducedMotion: true,
    });
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;

    setUserAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.jawabanBenar;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setUserAnswer(null);
    setIsFinished(false);
  };

  const isCurrentCorrect = isAnswered && userAnswer === currentQ.jawabanBenar;
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <motion.div
      key="mode-5-quiz"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-2"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToLobby}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-extrabold text-xs sm:text-sm">
            Skor: {score}
          </div>
          {!isFinished && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 font-bold text-xs sm:text-sm shadow-sm">
              Kasus {currentQuestionIndex + 1} dari {totalQuestions}
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-amber-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <MessageSquareQuote size={13} className="text-amber-600" />
              Mode 5: Skenario Kasus
            </span>
            <span className="text-xs font-semibold text-slate-400">
              #{currentQuestionIndex + 1}
            </span>
          </div>

          {/* Kotak Teks Skenario (Story Quote) */}
          <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-5 sm:p-6 mb-7 relative">
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <Quote size={16} className="rotate-180" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Situasi Nyata Remaja
              </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              &ldquo;{currentQ.skenario}&rdquo;
            </p>
          </div>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Apa tindakan paling bijak & berempati yang kamu ambil?
          </p>

          {/* 4 Opsi Jawaban Vertikal (1 Kolom) */}
          <div className="space-y-3">
            {currentQ.opsi.map((option, idx) => {
              const label = optionLabels[idx] || `${idx + 1}`;
              const isSelected = userAnswer === option;
              const isThisTheCorrectAnswer = option === currentQ.jawabanBenar;

              let btnStyle =
                'bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800';

              if (isAnswered) {
                if (isSelected && isThisTheCorrectAnswer) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm';
                } else if (isSelected && !isThisTheCorrectAnswer) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm';
                } else if (!isSelected && isThisTheCorrectAnswer) {
                  btnStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-900';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl font-medium text-left transition-all cursor-pointer flex items-center gap-3.5 disabled:cursor-not-allowed ${btnStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected && isThisTheCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isSelected && !isThisTheCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : isAnswered && isThisTheCorrectAnswer
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {label}
                  </div>

                  <span className="text-xs sm:text-sm font-medium flex-1 leading-snug">
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Kotak Penjelasan Medis */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-5 rounded-2xl border ${
                  isCurrentCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-900">
                        Pilihan Sangat Bijak! (+100 Poin) 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={19} className="text-rose-600 shrink-0" />
                      <span className="text-rose-900">
                        Kurang Tepat! Pilihan yang paling berempati adalah: {currentQ.jawabanBenar}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Refleksi & Penjelasan:</strong> {currentQ.penjelasan}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 < totalQuestions
                        ? 'Kasus Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto p-8 sm:p-10 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center"
        >
          <div className="w-18 h-18 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={38} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Kasus Selesai Ditangani!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Empati dan kemampuan pengambilan keputusanmu dalam situasi nyata pubertas sangat membanggakan.
          </p>

          <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-7 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Skor Total Kamu
            </p>
            <p className="text-4xl font-extrabold text-maroon my-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ 500 Poin</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {score === 500
                ? '🤝 Sahabat teladan! Empatimu terhadap teman dan diri sendiri sangat luar biasa!'
                : score >= 300
                ? '👍 Hebat sekali! Kamu tahu cara bersikap ramah, tenang, dan solutif.'
                : '🌱 Bagus sudah mencoba! Empati tumbuh bersamaan dengan pengalaman dan pemahaman.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Mainkan Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home size={15} />
              <span>Kembali ke Menu</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   KOMPONEN UTAMA KUIS.JSX (ROUTING 5 MODE KUIS PENUH)
────────────────────────────────────────────────────────────────────────────── */
export default function Kuis() {
  const [activeScreen, setActiveScreen] = useState('lobby'); // 'lobby' | 'mode1' | 'mode2' | 'mode3' | 'mode4' | 'mode5'
  const [selectedMode, setSelectedMode] = useState(null);

  const handleStartQuiz = (mode) => {
    setSelectedMode(mode);
    if (mode.id === 1) setActiveScreen('mode1');
    else if (mode.id === 2) setActiveScreen('mode2');
    else if (mode.id === 3) setActiveScreen('mode3');
    else if (mode.id === 4) setActiveScreen('mode4');
    else if (mode.id === 5) setActiveScreen('mode5');
  };

  const handleBackToLobby = () => {
    setActiveScreen('lobby');
    setSelectedMode(null);
  };

  return (
    <div className="py-4 md:py-8 px-2 sm:px-0">
      <AnimatePresence mode="wait">
        {activeScreen === 'lobby' && (
          <QuizLobby key="lobby" onStartQuiz={handleStartQuiz} />
        )}
        {activeScreen === 'mode1' && (
          <Mode1MitosFakta key="mode1" onBackToLobby={handleBackToLobby} />
        )}
        {activeScreen === 'mode2' && (
          <Mode2PilihanGanda key="mode2" onBackToLobby={handleBackToLobby} />
        )}
        {activeScreen === 'mode3' && (
          <Mode3BenarSalah key="mode3" onBackToLobby={handleBackToLobby} />
        )}
        {activeScreen === 'mode4' && (
          <Mode4TebakTebakan key="mode4" onBackToLobby={handleBackToLobby} />
        )}
        {activeScreen === 'mode5' && (
          <Mode5SkenarioKasus key="mode5" onBackToLobby={handleBackToLobby} />
        )}
      </AnimatePresence>
    </div>
  );
}
