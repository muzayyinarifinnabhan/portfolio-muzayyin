import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PullableString = () => {
    const stringRef = useRef(null);
    const controls = useAnimation();
    const [path, setPath] = useState("M 10 0 Q 50 100 90 0");
    const [isDragging, setIsDragging] = useState(false);

    // The control point of the bezier curve
    const [controlPoint, setControlPoint] = useState({ x: 50, y: 0 });

    const handleMouseMove = (e) => {
        if (!stringRef.current || !isDragging) return;

        const rect = stringRef.current.getBoundingClientRect();

        // Calculate relative mouse position
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Constraint control point within reasonable bounds so it doesn't break
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, 150)); // Max pull depth

        setControlPoint({ x: (x / rect.width) * 100, y });
        setPath(`M 10 0 Q ${x} ${y} 90 0`);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        // Animate snap back
        controls.start({
            d: "M 10 0 Q 50 0 90 0",
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 5,
                mass: 1
            }
        }).then(() => {
            setPath("M 10 0 Q 50 0 90 0");
        });
    };

    const handleMouseDown = (e) => {
        const rect = stringRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;

        // Only start dragging if clicking somewhat near the line
        if (y < 40) {
            setIsDragging(true);
            controls.stop();
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={stringRef}
            className="w-full h-40 absolute bottom-0 left-0 right-0 z-50 cursor-grab active:cursor-grabbing pointer-events-auto flex items-start justify-center"
            onMouseDown={handleMouseDown}
            style={{ touchAction: 'none' }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 150"
                preserveAspectRatio="none"
                className="overflow-visible"
            >
                <motion.path
                    d={path}
                    animate={controls}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent/70 dark:text-accent/50"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute top-4 text-xs text-secondary/60 dark:text-light-100/40 max-w-xs text-center pointer-events-none">
                Tarik garis ke bawah
            </div>
        </div>
    );
};

export default PullableString;
