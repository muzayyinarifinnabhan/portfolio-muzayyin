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

const row1 = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React Native', icon: SiReact, color: '#61DAFB' },
    { name: 'React.js', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000' },
];

const row2 = [
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
    { name: 'Framer Motion', icon: SiFramer, color: '#000' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
];

const MarqueeRow = ({ items, direction = 'left', duration = 25 }) => {
    const duplicatedItems = [...items, ...items];

    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex gap-3 md:gap-4 w-max"
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    duration,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {duplicatedItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div
                            key={`${item.name}-${index}`}
                            whileHover={{ scale: 1.05, y: -4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            className="flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/60 cursor-default shrink-0 select-none"
                        >
                            <IconComponent
                                style={{ color: item.color }}
                                className={`text-xl md:text-2xl shrink-0 ${item.name === 'Next.js' || item.name === 'Framer Motion' ? 'dark:text-white' : ''}`}
                            />
                            <span className="font-medium text-gray-800 dark:text-light-100 whitespace-nowrap text-sm md:text-base">
                                {item.name}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
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

                <div className="space-y-5 md:space-y-6 max-w-7xl mx-auto">
                    <MarqueeRow items={row1} direction="left" duration={25} />
                    <MarqueeRow items={row2} direction="right" duration={30} />
                </div>
            </div>
        </section>
    );
};

export default Skills;
