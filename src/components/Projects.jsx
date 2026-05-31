import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsBoxArrowUpRight } from 'react-icons/bs';
import SectionHeader from './SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const projects = [
    {
        id: 1,
        title: "SMPN 112 Jakarta",
        description: "Website berbasis PWA untuk memudahkan siswa SMPN 112 Jakarta dalam mengakses informasi akademik dan kegiatan sekolah.",
        image: "/smpn 112.jpg",
        tags: ["React", "Tailwind", "Supabase", "Vite", "PWA", "Framer Motion", "Lucide React"],
        github: "https://github.com/muzayyinarifinnabhan/website-112-jkt",
        live: "https://smpn112jkt.pages.dev/"
    },
    {
        id: 2,
        title: "CBT SMPN 112 Jakarta",
        description: "Website berbasis CBT yang dibuat untuk memudahkan guru siswa SMPN 112 Jakarta dalam mengakses, mengelola dan digitalisasi Ujian Sekolah.",
        image: "/smpn 112.jpg",
        tags: ["React", "PWA", "Tailwind", "Supabase", "Vite", "Lucide React"],
        github: "https://github.com/muzayyinarifinnabhan/cbt-smpn112",
        live: "https://cbtsmpn112jkt.pages.dev/login"
    },
    {
        id: 3,
        title: "ESSA Media",
        description: "ESSA Media Website adalah website resmi untuk ekstrakurikuler ESSA Media di SMK Negeri 1 Jakarta. Website ini berfungsi sebagai portofolio digital untuk menampilkan karya video, desain, dan konten kreatif dari berbagai divisi.",
        image: "/essa med.jpg",
        tags: ["HTML", "CSS", "JavaScript Vanilla"],
        github: "https://github.com/muzayyinarifinnabhan/ESSA-Media",
        live: "essamedia.netlify.app"
    },
    {
        id: 4,
        title: "MindMate AI",
        description: "MindMate adalah aplikasi kesehatan mental berbasis AI yang menyediakan dukungan emosional 24/7, pelacakan mood, dan wawasan mendalam tentang kesehatan mental pengguna.",
        image: "/mindmate.png",
        tags: ["Next.js", "Framer Motion", "Tailwind", "Chart.js", "Vercel"],
        github: "https://github.com/Varaaa-arch/TechnoSprint2026_MindMate",
        live: "https://mind-mate-teal.vercel.app/"
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
};

const Projects = () => {
    const { t, language } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? projects : projects.slice(0, 3);
    return (
        <section id="projects" className="py-24 bg-light-200 dark:bg-dark-200 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <SectionHeader
                    tag={language === 'ID' ? 'Karya' : 'Work'}
                    title={t.projects.title}
                    highlight={t.projects.titleHighlight}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {visibleProjects.map((project, idx) => {
                            const title = typeof project.title === 'object' ? (project.title[language] || project.title['ID']) : project.title;
                            const description = typeof project.description === 'object' ? (project.description[language] || project.description['ID']) : project.description;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    custom={idx}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.3 } }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                    className="bg-light-100 dark:bg-dark-100 rounded-2xl overflow-hidden group shadow-[0_4px_24px_rgba(15,61,46,0.1)] hover:shadow-[0_12px_40px_rgba(224,112,48,0.15)] transition-shadow duration-400"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex items-center justify-center gap-4">
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-3 bg-light-100 dark:bg-dark-200 text-dark-100 dark:text-light-100 rounded-full hover:text-accent transition-colors translate-y-6 group-hover:translate-y-0 duration-300"
                                            >
                                                <BsGithub size={20} />
                                            </motion.a>
                                            <motion.a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-3 bg-light-100 dark:bg-dark-200 text-dark-100 dark:text-light-100 rounded-full hover:text-accent transition-colors translate-y-6 group-hover:translate-y-0 duration-300 delay-75"
                                            >
                                                <BsBoxArrowUpRight size={20} />
                                            </motion.a>
                                        </div>
                                        <img
                                            src={project.image}
                                            alt={title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2 font-serif text-dark-100 dark:text-light-100">{title}</h3>
                                        <p className="text-muted dark:text-light-100/85 mb-4 line-clamp-2 leading-relaxed">
                                            {description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 text-xs font-semibold bg-accent/15 text-accent rounded-full border border-accent/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-outline cursor-pointer"
                    >
                        {showAll ? t.projects.viewLessBtn : t.projects.viewAllBtn}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
