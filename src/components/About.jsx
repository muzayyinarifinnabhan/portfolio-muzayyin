import React from 'react';
import { motion } from 'framer-motion';
import { BsDownload } from 'react-icons/bs';
import ParticleBackground from './ParticleBackground';
import FloatingOrbs from './FloatingOrbs';
import SectionHeader from './SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const PHOTO_BG = '#9B1C1C';

const About = () => {
    const { t, language } = useLanguage();

    const infoItems = [
        { label: language === 'ID' ? 'Nama:' : 'Name:', value: 'Muzayyin Arifin Nabhan' },
        { label: language === 'ID' ? 'Lokasi:' : 'Location:', value: 'Indonesia' },
        { label: 'Email:', value: 'muzayyinarifinnabhan@gmail.com' },
        { label: language === 'ID' ? 'Ketersediaan:' : 'Availability:', value: language === 'ID' ? 'Pekerja Lepas & Purnawaktu' : 'Freelance & Full-time' },
    ];

    return (
        <section id="about" className="pt-24 pb-24 bg-light-200 dark:bg-dark-200 relative overflow-hidden">
            <FloatingOrbs variant="subtle" />
            <div className="absolute inset-0 z-0 h-full w-full opacity-25 dark:opacity-20">
                <ParticleBackground />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        tag={language === 'ID' ? 'Kenalan' : 'Introduction'}
                        title={t.about.title}
                        highlight={t.about.titleHighlight}
                    />

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl relative flex-shrink-0 border-4 border-light-300 dark:border-dark-100"
                            style={{ backgroundColor: PHOTO_BG }}
                        >
                            <motion.img
                                src="/profile.png"
                                alt="Muzayyin Arifin Nabhan"
                                loading="lazy"
                                decoding="async"
                                width="320"
                                height="400"
                                initial={{ opacity: 0, scale: 1.08 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full object-cover object-top"
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-0 left-0 right-0 h-1.5 bg-accent origin-left z-10"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 text-lg space-y-6 leading-relaxed"
                        >
                            {[t.about.p1, t.about.p2].map((text, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                    className="text-muted dark:text-light-100/85"
                                >
                                    {text}
                                </motion.p>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="grid grid-cols-2 gap-4 pt-4 border-t border-accent/60 dark:border-accent/40"
                            >
                                {infoItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.45 + i * 0.07 }}
                                    >
                                        <h4 className="font-bold text-dark-100 dark:text-light-100 text-sm uppercase tracking-wide">{item.label}</h4>
                                        <p className="text-muted dark:text-light-100/80 break-all">{item.value}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="pt-4"
                            >
                                <motion.a
                                    href="/cv.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-light-100 transition-all duration-300 group"
                                >
                                    {t.about.resumeBtn}
                                    <BsDownload className="group-hover:translate-y-1 transition-transform duration-300" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
