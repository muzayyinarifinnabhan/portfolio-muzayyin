import React from 'react';
import { motion } from 'framer-motion';
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript,
    SiFramer, SiNodedotjs, SiPostgresql, SiGit, SiFigma, SiVite,
    SiKotlin
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';
import FloatingOrbs from './FloatingOrbs';
import SectionHeader from './SectionHeader';
import { useLanguage } from '../context/LanguageContext';

const skills = [
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: "React Native", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "React.Js", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-dark-100 dark:text-light-100" /> },
    { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
    { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "Kotlin", icon: <SiKotlin className="text-[#7F52FF]" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-dark-100 dark:text-light-100" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Skills = () => {
    const { t, language } = useLanguage();
    return (
        <section id="skills" className="py-24 bg-light-100 dark:bg-dark-300 relative overflow-hidden">
            <FloatingOrbs variant="subtle" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <SectionHeader
                    tag={language === 'ID' ? 'Toolkit' : 'Toolkit'}
                    title={t.skills.title}
                    highlight={t.skills.titleHighlight}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl mx-auto"
                >
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            className="glass-card p-6 flex flex-col items-center justify-center gap-3 cursor-default relative overflow-hidden group hover:border-accent/40 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                            <div className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>
                            <span className="font-semibold text-dark-100 dark:text-light-100 text-center text-sm relative z-10 group-hover:text-accent transition-colors duration-300">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
