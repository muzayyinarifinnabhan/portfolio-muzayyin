import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ tag, title, highlight, subtitle, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`text-center mb-16 ${className}`}
    >
        {tag && (
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="section-tag"
            >
                {tag}
            </motion.span>
        )}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            {title}
            {highlight ? <> <span className="text-accent">{highlight}</span></> : null}
        </h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-28 h-1 section-line mx-auto rounded-full"
        />
        {subtitle && (
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 text-muted dark:text-light-100/85 max-w-2xl mx-auto"
            >
                {subtitle}
            </motion.p>
        )}
    </motion.div>
);

export default SectionHeader;
