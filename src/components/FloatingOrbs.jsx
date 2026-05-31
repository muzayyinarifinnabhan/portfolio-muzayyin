import React from 'react';

const FloatingOrbs = ({ variant = 'default' }) => {
    const configs = {
        default: [
            { className: 'top-[10%] left-[5%] w-72 h-72 bg-accent/20 animate-blob', delay: '' },
            { className: 'bottom-[15%] right-[8%] w-96 h-96 bg-primary/15 animate-blob-slow animation-delay-2000', delay: 'animation-delay-2000' },
            { className: 'top-[40%] right-[20%] w-48 h-48 bg-accent/10 animate-float animation-delay-1000', delay: '' },
        ],
        subtle: [
            { className: 'top-0 right-0 w-80 h-80 bg-accent/12 animate-blob', delay: '' },
            { className: 'bottom-0 left-0 w-80 h-80 bg-primary/10 animate-blob-slow animation-delay-2000', delay: '' },
        ],
    };

    const orbs = configs[variant] || configs.default;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {orbs.map((orb, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-60 ${orb.className}`}
                />
            ))}
        </div>
    );
};

export default FloatingOrbs;
