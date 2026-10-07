import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Heart, 
  ShieldCheck, 
  MessageSquareQuote, 
  Sparkles, 
  Clock, 
  Check, 
  UserCheck, 
  Lock 
} from 'lucide-react';

const initialStories = [
  {
    id: 'story-1',
    author: 'Anonim 🌱',
    isAnonymous: true,
    tag: 'Pengalaman Pertama',
    time: '2 jam yang lalu',
    content: 'Awalnya panik dan kaget banget waktu pertama kali menstruasi pas jam istirahat sekolah. Untung ada bu guru BK yang ramah banget ngasih pembalut dan jelasin kalau ini tanda tubuhku tumbuh sehat.',
    likes: 24,
    hasLiked: false,
  },
  {
    id: 'story-2',
    author: 'Rian, 14 th',
    isAnonymous: false,
    tag: 'Suara & Tubuh',
    time: '5 jam yang lalu',
    content: 'Dulu minder dan malu banget pas suaraku mulai pecah dan serak waktu maju presentasi di kelas. Tapi setelah baca artikel di Tumbuh Bijak, ternyata pita suara laki-laki memang membesar saat puber. Sekarang sudah lebih percaya diri!',
    likes: 19,
    hasLiked: false,
  },
  {
    id: 'story-3',
    author: 'Anonim 🌱',
    isAnonymous: true,
    tag: 'Kesehatan Emosi',
    time: '1 hari yang lalu',
    content: 'Sering banget mendadak ngerasa sedih atau gampang kesel tanpa alasan jelas. Baru sadar kalau itu mood swing hormon puber. Sekarang tiap mulai overthinking aku coba tarik napas dan cerita ke mama.',
    likes: 38,
    hasLiked: false,
  },
];

export default function Cerita() {
  const [stories, setStories] = useState(initialStories);
  const [storyText, setStoryText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [justPublishedId, setJustPublishedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storyText.trim() || isPublishing) return;

    setIsPublishing(true);

    const newId = `story-${Date.now()}`;
    const newStory = {
      id: newId,
      author: isAnonymous ? 'Anonim 🌱' : 'Sahabat Tumbuh',
      isAnonymous: isAnonymous,
      tag: 'Cerita Baru',
      time: 'Baru saja',
      content: storyText.trim(),
      likes: 1,
      hasLiked: true,
    };

    // Simulasi animasi form melayang & menyisip mulus ke feed teratas
    setTimeout(() => {
      setStories((prev) => [newStory, ...prev]);
      setStoryText('');
      setJustPublishedId(newId);
      setIsPublishing(false);

      setTimeout(() => {
        setJustPublishedId(null);
      }, 2000);
    }, 600);
  };

  const handleToggleLike = (storyId) => {
    setStories((prev) =>
      prev.map((item) => {
        if (item.id === storyId) {
          return {
            ...item,
            hasLiked: !item.hasLiked,
            likes: item.hasLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="py-4 md:py-8">
      {/* Header Halaman */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon/10 text-maroon text-xs sm:text-sm font-semibold mb-3">
          <MessageSquareQuote size={15} />
          <span>Ruang Cerita & Empati Remaja</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Bagikan Pengalaman, <span className="text-maroon">Saling Menguatkan</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Setiap proses pubertas itu unik. Ceritakan apa yang kamu rasakan tanpa takut dihakimi.
        </p>
      </div>

      {/* Grid Layout: Mobile (flex-col) vs Desktop (Form Sticky di Kolom Kiri, Feed di Kolom Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Kolom Kiri: Form Menulis Cerita (Sticky di Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div
            layout
            animate={
              isPublishing
                ? {
                    scale: [1, 0.96, 1],
                    y: [0, -6, 0],
                  }
                : {}
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-soft relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={18} className="text-maroon" />
                <span>Tulis Ceritamu</span>
              </h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <Lock size={11} />
                <span>100% Aman & Terjaga</span>
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Text Area */}
              <div className="relative mb-4">
                <textarea
                  rows={5}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Tulis apa yang kamu rasakan, pengalaman perubahan fisik, atau rasa cemasmu di sini... Kami mendengarkan tanpa menghakimi."
                  className="w-full p-4 rounded-2xl bg-cream border border-gray-200 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none text-sm text-gray-800 placeholder-gray-400 transition-all resize-none leading-relaxed"
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-[11px] text-gray-400 font-medium">
                  {storyText.length}/500
                </div>
              </div>

              {/* Toggle Switch Anonim */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isAnonymous ? 'bg-maroon/10 text-maroon' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isAnonymous ? <ShieldCheck size={18} /> : <UserCheck size={18} />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      Kirim sebagai Anonim
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {isAnonymous ? 'Nama aslimu disamarkan' : 'Nama profilmu akan terlihat'}
                    </div>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAnonymous ? 'bg-maroon' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      isAnonymous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Tombol Bagikan Cerita (Warna Maroon) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!storyText.trim() || isPublishing}
                className="w-full py-3.5 px-6 rounded-2xl bg-maroon hover:bg-maroon-800 active:bg-maroon-900 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block"
                    >
                      🌱
                    </motion.span>
                    <span>Menerbitkan Cerita...</span>
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Bagikan Cerita</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Kolom Kanan: Feed Cerita Teman-Teman */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>Cerita Teman-Teman</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 font-semibold">
                {stories.length}
              </span>
            </h2>
            <span className="text-xs text-gray-500">Terbaru & Hangat</span>
          </div>

          {/* Daftar Feed dengan layout Framer Motion untuk pergerakan dinamis */}
          <motion.div layout className="space-y-4">
            <AnimatePresence initial={false}>
              {stories.map((story) => {
                const isJustAdded = story.id === justPublishedId;

                return (
                  <motion.div
                    key={story.id}
                    layout
                    initial={{ opacity: 0, y: -24, scale: 0.94 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 280,
                        damping: 24,
                      }
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
                      isJustAdded
                        ? 'border-maroon/40 shadow-soft-hover ring-2 ring-maroon/10'
                        : 'border-gray-200/80 shadow-soft hover:shadow-soft-hover'
                    }`}
                  >
                    {/* Header Cerita */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs ${
                          story.isAnonymous 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-maroon/10 text-maroon border border-maroon/20'
                        }`}>
                          {story.isAnonymous ? '🌱' : story.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                            <span>{story.author}</span>
                            {isJustAdded && (
                              <span className="text-[10px] bg-maroon text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">
                                Baru Ditambahkan!
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-400 flex items-center gap-1">
                            <Clock size={11} />
                            <span>{story.time}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cream text-gray-600 border border-gray-200">
                        {story.tag}
                      </span>
                    </div>

                    {/* Isi Cerita */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      "{story.content}"
                    </p>

                    {/* Footer Cerita: Tombol Suka/Dukungan */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        Didukung oleh sesama sahabat
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleLike(story.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          story.hasLiked
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-gray-50 text-gray-500 hover:text-rose-500 hover:bg-rose-50/50'
                        }`}
                      >
                        <Heart
                          size={14}
                          className={story.hasLiked ? 'fill-rose-500 stroke-rose-500' : ''}
                        />
                        <span>{story.likes} Semangat</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
