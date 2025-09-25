import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useScroll } from '../../hooks/useScroll';

export const AboutSection: React.FC = () => {
  const { scrollToSection } = useScroll();

  const stats = [
    { number: '10+', label: 'Proyek Terselesaikan' },
    { number: '1+', label: 'Tahun Pengalaman' },
    { number: '5+', label: 'Tanggapan Klien' },
    { number: '90%', label: 'Kepuasan Klien' },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-green-50/20 to-teal-50/30 dark:from-secondary-900 dark:via-emerald-900/5 dark:to-teal-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
      {/* Enhanced Background Effects - Green Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-teal-50/30 dark:from-emerald-900/15 dark:via-transparent dark:to-teal-900/10"></div>
      <div className="absolute top-16 left-16 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-20 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-2/3 right-1/3 w-56 h-56 bg-emerald-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Ketahui lebih banyak tentang perjalanan, keterampilan, dan apa yang mendorong saya untuk menciptakan pengalaman digital yang menakjubkan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              Tertarik dengan Teknologi <br/>
              & Membangun hal-hal Penting
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
              Saya telah menempuh pendidikan di Universitas Muhammadiyah Semarang sejak tahun 2023. Selama masa studi, saya mendapatkan dasar-dasar pemrograman Java dan telah mengerjakan berbagai program menggunakan Java dan Python. Di luar perkuliahan, saya juga memperdalam keterampilan saya sebagai pengembang full-stack menggunakan Node.js, termasuk menyelesaikan dua proyek berbasis web selama magang. Pengalaman gabungan ini telah memberi saya dasar dalam membangun aplikasi dari backend hingga frontend, sekaligus mengembangkan pemahaman yang lebih luas tentang konsep pemrograman. Selain akademis dan teknologi, saya juga aktif sebagai influencer di TikTok dan YouTube, yang semakin mengasah keterampilan komunikasi, kreativitas konten, dan interaksi saya dengan audiens digital.
            </p>
            <Button
              onClick={() => scrollToSection('projects')}
              variant="green"
              icon="arrow"
            >
              Learn more about my work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg shadow-sm hover:shadow-xl transition-all duration-0 relative overflow-hidden group border border-emerald-100 dark:border-emerald-800"
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors relative z-10">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 relative z-10">
                  {stat.label}
                </div>

                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 dark:from-emerald-600/20 dark:to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-0 rounded-lg"></div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-0"></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-200/30 dark:via-emerald-400/20 to-transparent rounded-lg"></div>

                {/* Counter Animation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-0"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
