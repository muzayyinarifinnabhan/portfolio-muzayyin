import React, { useState, useEffect } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    const navLinks = [
        { name: t.nav.home, href: '#home' },
        { name: t.nav.about, href: '#about' },
        { name: t.nav.skills, href: '#skills' },
        { name: language === 'ID' ? 'Riwayat' : 'Resume', href: '#resume' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ];

    // Theme setup
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // Scroll Navbar Background & ScrollSpy Tracker
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Scrollspy Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        }, { threshold: 0.3 });

        navLinks.forEach(link => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'glass py-4 shadow-[0_4px_24px_rgba(15,61,46,0.08)]' : 'py-6 bg-transparent'}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center text-dark-100 dark:text-light-100">

                <a href="#home" className="text-2xl font-bold tracking-tighter font-serif">
                    <span className="text-accent">M</span>AN.
                </a>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`relative group font-medium transition-all duration-500 py-1 ${isActive ? 'text-accent' : 'text-dark-100 dark:text-light-100 hover:text-accent'}`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </a>
                        );
                    })}
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-accent/10 text-dark-100 dark:text-light-100 rounded-full hover:bg-accent/20 transition-colors shadow-sm"
                        aria-label="Toggle Language"
                    >
                        {language}
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-accent/10 text-dark-100 dark:text-light-100 rounded-full hover:bg-accent/20 transition-colors shadow-sm"
                    >
                        {language}
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                    >
                        {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-full left-0 w-full glass-card border-x-0 border-t-0 py-4 px-6 flex flex-col space-y-4"
                >
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium transition-colors ${isActive ? 'text-accent border-l-4 border-accent pl-2' : 'text-dark-100 dark:text-light-100 hover:text-accent'}`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
