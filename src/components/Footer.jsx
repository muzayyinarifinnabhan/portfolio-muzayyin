import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="py-8 bg-light-200 dark:bg-dark-300 border-t border-light-300 dark:border-secondary/20">
            <div className="container mx-auto px-6 text-center">
                <p className="text-dark-100/70 dark:text-light-100/70">
                    &copy; {new Date().getFullYear()} <span className="font-bold text-dark-100 dark:text-light-100">Muzayyin Arifin Nabhan</span>. {t.footer.copyright}
                </p>
                <p className="text-sm text-dark-100/60 dark:text-light-100/60 mt-2">
                    {t.footer.builtWith}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
