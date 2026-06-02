import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';
import FloatingOrbs from './FloatingOrbs';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const socials = [
    { icon: FaGithub, href: 'https://github.com/muzayyinarifinnabhan', label: 'GitHub' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/lifesecretzarr?igsh=M3drdjQzdHRqaGlt', label: 'Instagram' },
];

const Hero = () => {
    const { t, language } = useLanguage();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [12, -12]);
    const rotateY = useTransform(x, [-100, 100], [-12, 12]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - (rect.left + rect.width / 2));
        y.set(event.clientY - (rect.top + rect.height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden bg-light-100 dark:bg-dark-300">
            <FloatingOrbs />
            <div className="absolute inset-0 w-full h-full z-0 opacity-60 dark:opacity-40">
                <ParticleBackground />
            </div>

            <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center relative z-10 gap-12 pointer-events-none">
                <div className="flex-1 text-center md:text-left pointer-events-auto">
                    <motion.span {...fadeUp(0)} className="section-tag">
                        {language === 'ID' ? 'Portofolio Pribadi' : 'Personal Portfolio'}
                    </motion.span>

                    <motion.h1
                        {...fadeUp(0.1)}
                        className="text-5xl md:text-7xl font-extrabold mb-4 font-serif leading-tight text-dark-100 dark:text-light-100"
                    >
                        {language === 'ID' ? 'Halo, Saya ' : "Hi, I'm "}
                        <span className="text-accent">Muzayyin Arifin Nabhan</span>
                    </motion.h1>

                    <motion.div
                        {...fadeUp(0.25)}
                        className="text-2xl md:text-4xl font-semibold mb-6 h-[44px] text-dark-100 dark:text-light-100"
                    >
                        <TypeAnimation
                            sequence={[
                                t.hero.roles[0], 2000,
                                t.hero.roles[1], 2000,
                                t.hero.roles[2], 2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            key={language}
                        />
                    </motion.div>

                    <motion.p
                        {...fadeUp(0.4)}
                        className="text-lg md:text-xl text-muted dark:text-light-100/85 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.55)}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-primary"
                        >
                            {t.hero.portfolioBtn}
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-outline pointer-events-auto"
                        >
                            {t.hero.contactBtn}
                        </motion.a>
                    </motion.div>
                </div>

                <div className="flex-1 flex justify-center md:justify-end pointer-events-auto">
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 14, delay: 0.2 }}
                            style={{ rotateX, rotateY, transformPerspective: 800 }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full cursor-pointer animate-float bg-[#9B1C1C]"
                        >
                            <div className="absolute -inset-3 bg-gradient-to-tr from-accent/40 to-primary/30 rounded-full blur-2xl opacity-40" />
                            <img
                                src="/profile.png"
                                alt="Muzayyin"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                width="384"
                                height="384"
                                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-light-300 dark:border-dark-100 shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            {...fadeUp(0.6)}
                            className="flex items-center gap-4 md:gap-5 mt-7"
                        >
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.label}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group w-12 h-12 flex items-center justify-center bg-white dark:bg-dark-100 border border-[#E5E5E5] dark:border-gray-700 rounded-[20px] shadow-sm hover:bg-accent hover:shadow-xl transition-all duration-300 ease-out"
                                >
                                    <social.icon className="text-xl text-dark-100 dark:text-light-100 group-hover:text-white transition-colors duration-300 ease-out" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
