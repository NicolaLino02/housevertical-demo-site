import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayText('');
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{displayText}<span className="animate-pulse text-blue-500">|</span></h2>;
};
