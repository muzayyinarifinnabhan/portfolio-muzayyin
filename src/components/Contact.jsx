import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsEnvelope, BsPhone, BsGeoAlt, BsGithub, BsLinkedin, BsInstagram, BsCheckCircleFill } from 'react-icons/bs';
import SectionHeader from './SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const { error } = await supabase.from('contact_messages').insert([{
            name: formData.name,
            email: formData.email,
            message: formData.message,
            status: 'unread',
            starred: false,
            created_at: new Date().toISOString(),
        }]);

        if (error) {
            setErrorMsg(language === 'ID' ? 'Gagal mengirim pesan. Coba lagi.' : 'Failed to send. Please try again.');
            setStatus('error');
        } else {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const contactCards = [
        { icon: <BsEnvelope size={24} />, title: t.contact.email, content: <a href="mailto:muzayyinarifinnabhan@gmail.com" className="text-muted dark:text-light-100/85 hover:text-accent transition-colors">muzayyinarifinnabhan@gmail.com</a> },
        { icon: <BsPhone size={24} />, title: t.contact.phone, content: <p className="text-muted dark:text-light-100/85">+62 856 9767 1091</p> },
        { icon: <BsGeoAlt size={24} />, title: t.contact.location, content: <p className="text-muted dark:text-light-100/85">{t.contact.locationValue}</p> },
    ];

    const socials = [
        { icon: <BsGithub size={24} />, href: 'https://github.com/muzayyinarifinnabhan' },
        { icon: <BsLinkedin size={24} />, href: '#' },
        { icon: <BsInstagram size={24} />, href: 'https://www.instagram.com/lifesecretzarr?igsh=M3drdjQzdHRqaGlt' },
    ];

    return (
        <section id="contact" className="py-24 bg-light-100 dark:bg-dark-300 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <SectionHeader
                    tag={language === 'ID' ? 'Hubungi' : 'Get in touch'}
                    title={t.contact.title}
                    highlight={t.contact.titleHighlight}
                    subtitle={t.contact.subtitle}
                />

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 space-y-5"
                    >
                        {contactCards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ x: 6 }}
                                className="glass-card p-6 flex items-start gap-4"
                            >
                                <div className="p-4 bg-accent/15 text-accent rounded-xl shrink-0">{card.icon}</div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1 text-dark-100 dark:text-light-100">{card.title}</h4>
                                    {card.content}
                                </div>
                            </motion.div>
                        ))}

                        <div className="flex gap-4 pt-2">
                            {socials.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.08 }}
                                    whileHover={{ scale: 1.1, y: -4, rotate: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 glass-card text-dark-100 dark:text-light-100 hover:text-accent hover:border-accent/40 transition-colors"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1"
                    >
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-10 flex flex-col items-center justify-center gap-5 text-center h-full min-h-[320px]"
                            >
                                <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center">
                                    <BsCheckCircleFill size={36} className="text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-dark-100 dark:text-light-100">
                                    {language === 'ID' ? 'Pesan Terkirim!' : 'Message Sent!'}
                                </h3>
                                <p className="text-muted dark:text-light-100/70 text-sm max-w-xs">
                                    {language === 'ID'
                                        ? 'Terima kasih! Saya akan segera membalas pesan Anda.'
                                        : 'Thank you! I\'ll get back to you as soon as possible.'}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-5">
                                {[
                                    { label: t.contact.formName, type: 'text', key: 'name', placeholder: t.contact.formNamePlaceholder },
                                    { label: t.contact.formEmail, type: 'email', key: 'email', placeholder: t.contact.formEmailPlaceholder },
                                ].map((field, i) => (
                                    <motion.div
                                        key={field.key}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.08 }}
                                    >
                                        <label className="block text-sm font-semibold mb-2 text-dark-100 dark:text-light-100">{field.label}</label>
                                        <input
                                            type={field.type}
                                            required
                                            value={formData[field.key]}
                                            onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-light-200 dark:bg-dark-200 border-2 border-light-300 dark:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-dark-100 dark:text-light-100"
                                            placeholder={field.placeholder}
                                        />
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.26 }}
                                >
                                    <label className="block text-sm font-semibold mb-2 text-dark-100 dark:text-light-100">{t.contact.formMessage}</label>
                                    <textarea
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-light-200 dark:bg-dark-200 border-2 border-light-300 dark:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none text-dark-100 dark:text-light-100"
                                        placeholder={t.contact.formMessagePlaceholder}
                                    />
                                </motion.div>

                                {status === 'error' && (
                                    <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-4 text-center">
                                        {errorMsg}
                                    </p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-accent text-light-100 font-bold rounded-lg hover:bg-[#c96228] transition-colors shadow-[0_4px_20px_rgba(224,112,48,0.35)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                className="w-4 h-4 border-2 border-light-100/30 border-t-light-100 rounded-full"
                                            />
                                            {language === 'ID' ? 'Mengirim...' : 'Sending...'}
                                        </>
                                    ) : t.contact.submitBtn}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
