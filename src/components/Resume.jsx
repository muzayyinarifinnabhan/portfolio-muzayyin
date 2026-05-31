import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const Resume = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('experience');

    return (
        <section id="resume" className="py-24 bg-light-200 dark:bg-dark-200 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <SectionHeader
                    tag={language === 'ID' ? 'Perjalanan' : 'Journey'}
                    title={language === 'ID' ? 'Riwayat' : 'Resume'}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-16"
                >
                    <div className="inline-flex p-1 bg-light-100 dark:bg-dark-300 rounded-2xl border-2 border-light-300 dark:border-secondary/30">
                        {['experience', 'education'].map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileTap={{ scale: 0.97 }}
                                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === tab
                                    ? 'bg-primary text-light-100 shadow-lg'
                                    : 'text-muted hover:text-accent'
                                    }`}
                            >
                                {tab === 'experience'
                                    ? (language === 'ID' ? 'Pengalaman' : 'Experience')
                                    : (language === 'ID' ? 'Pendidikan' : 'Education')}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto relative min-h-[400px]">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/40 dark:bg-accent/30 transform md:-translate-x-1/2" />

                    <AnimatePresence mode="wait">
                        {activeTab === 'experience' ? (
                            <motion.div
                                key="experience"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-12"
                            >
                                {t.experience.list.map((exp, idx) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                        whileHover={{ scale: 1.02 }}
                                        className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-accent rounded-full transform md:-translate-x-1/2 z-10 ring-4 ring-light-100 dark:ring-dark-200"></div>
                                        <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                            <div className="glass-card p-6 border-l-4 border-l-accent md:border-l-0 md:border-b-4 md:border-b-accent hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(30,58,47,0.06)] hover:shadow-[0_8px_28px_rgba(184,92,56,0.1)]">
                                                <span className="text-sm font-bold text-accent mb-1 inline-block">{exp.period}</span>
                                                <h3 className="text-xl font-bold text-dark-100 dark:text-light-100">{exp.role}</h3>
                                                <h4 className="text-lg font-medium text-primary dark:text-accent/90 mb-3">{exp.company}</h4>
                                                <p className="text-muted dark:text-light-100/85 leading-relaxed">{exp.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="education"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-12"
                            >
                                {t.education.list.map((edu, idx) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                        whileHover={{ scale: 1.02 }}
                                        className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-accent rounded-full transform md:-translate-x-1/2 z-10 ring-4 ring-light-100 dark:ring-dark-200"></div>
                                        <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                            <div className="glass-card p-6 border-l-4 border-l-accent md:border-l-0 md:border-b-4 md:border-b-accent hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(30,58,47,0.06)] hover:shadow-[0_8px_28px_rgba(184,92,56,0.1)]">
                                                <span className="text-sm font-bold text-accent mb-1 inline-block">{edu.period}</span>
                                                <h3 className="text-xl font-bold text-dark-100 dark:text-light-100">{edu.degree}</h3>
                                                <h4 className="text-lg font-medium text-primary dark:text-accent/90 mb-3">{edu.school}</h4>
                                                <p className="text-muted dark:text-light-100/85 leading-relaxed">{edu.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Resume;
