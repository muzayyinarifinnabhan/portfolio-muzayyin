import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Clock, Folder, Mail, Globe, Moon, Sun, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    const navItems = [
        { href: '#home', icon: Home, label: t.nav.home },
        { href: '#about', icon: User, label: t.nav.about },
        { href: '#skills', icon: Code, label: t.nav.skills },
        { href: '#resume', icon: Clock, label: language === 'ID' ? 'Riwayat' : 'Resume' },
        { href: '#projects', icon: Folder, label: t.nav.projects },
        { href: '#contact', icon: Mail, label: t.nav.contact },
    ];

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        }, { threshold: 0.3 });

        navItems.forEach(item => {
            const el = document.querySelector(item.href);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [language, t]);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed w-full z-50 transition-all duration-700 ${
                isScrolled
                    ? 'glass py-3 shadow-[0_4px_24px_rgba(15,61,46,0.08)]'
                    : 'py-5 bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between text-dark-100 dark:text-light-100">
                <a href="#home" className="flex items-center gap-3 shrink-0">
                    <img
                        src="/Purzay%20JAS.png"
                        alt="Muzayyin Arifin Nabhan"
                        width={42}
                        height={42}
                        className="rounded-full border border-[#E5E5E5] shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300 object-cover"
                    />
                    <span className="text-2xl font-bold tracking-tighter font-serif">
                        <span className="text-accent">M</span>AN.
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href;
                        const IconComponent = item.icon;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className="relative px-4 py-2"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-accent/10 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative flex items-center gap-2 transition-colors duration-300 hover:text-accent">
                                    <IconComponent
                                        size={16}
                                        className={`transition-colors duration-300 ${
                                            isActive
                                                ? 'text-accent'
                                                : 'text-dark-100/40 dark:text-light-100/40 group-hover:text-accent'
                                        }`}
                                    />
                                    <span
                                        className={`text-sm font-medium transition-colors duration-300 ${
                                            isActive
                                                ? 'text-accent'
                                                : 'text-dark-100 dark:text-light-100'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </span>
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 bg-white/80 dark:bg-dark-100/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 shadow-sm">
                        <Globe size={14} className="text-gray-500 dark:text-gray-400 shrink-0" />
                        <button
                            onClick={() => language !== 'ID' && toggleLanguage()}
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                                language === 'ID'
                                    ? 'bg-accent text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10'
                            }`}
                        >
                            ID
                        </button>
                        <span className="text-gray-300 dark:text-gray-600 text-xs leading-none">|</span>
                        <button
                            onClick={() => language !== 'EN' && toggleLanguage()}
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                                language === 'EN'
                                    ? 'bg-accent text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10'
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-accent/10 transition-colors duration-300"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-accent/10 transition-colors duration-300"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden absolute top-full left-0 w-full glass border-t border-gray-200 dark:border-gray-800 py-5 px-6 flex flex-col gap-1"
                    >
                        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-dark-100/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 shadow-sm self-start mb-3">
                            <Globe size={14} className="text-gray-500 dark:text-gray-400 shrink-0" />
                            <button
                                onClick={() => { if (language !== 'ID') { toggleLanguage(); } setIsOpen(false); }}
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                                    language === 'ID'
                                        ? 'bg-accent text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10'
                                }`}
                            >
                                ID
                            </button>
                            <span className="text-gray-300 dark:text-gray-600 text-xs leading-none">|</span>
                            <button
                                onClick={() => { if (language !== 'EN') { toggleLanguage(); } setIsOpen(false); }}
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                                    language === 'EN'
                                        ? 'bg-accent text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        {navItems.map((item) => {
                            const isActive = activeSection === item.href;
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? 'bg-accent/10 text-accent font-semibold'
                                            : 'text-dark-100 dark:text-light-100 hover:bg-accent/5 hover:text-accent'
                                    }`}
                                >
                                    <IconComponent
                                        size={18}
                                        className={`transition-colors duration-300 ${
                                            isActive ? 'text-accent' : 'text-dark-100/40 dark:text-light-100/40'
                                        }`}
                                    />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
