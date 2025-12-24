import React from 'react';
import { motion } from 'framer-motion';

interface ScoreRingProps {
    score: number;
    label: string;
    color?: string; // New Optional Prop
}

const ScoreRing = ({ score, label, color = "#22d3ee" }: ScoreRingProps) => {
    const circumference = 2 * Math.PI * 120; // Radius 120
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">

            {/* 1. Outer Rotating Ring (Decorative) */}
            <motion.div
                animate={{ rotate: 360, borderColor: color }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, borderColor: { duration: 1 } }}
                className="absolute inset-0 rounded-full border border-dashed opacity-30 w-full h-full"
                style={{ borderColor: color }}
            />

            {/* 2. Inner Pulsing Glow */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5], backgroundColor: color }}
                transition={{ scale: { duration: 3, repeat: Infinity }, backgroundColor: { duration: 1 } }}
                className="absolute inset-4 rounded-full blur-3xl opacity-10"
            />

            {/* 3. SVG Gauge */}
            <svg className="w-full h-full rotate-[-90deg]">
                {/* Background Track */}
                <circle
                    cx="150"
                    cy="150"
                    r="120"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="20"
                />
                {/* Progress Track */}
                <motion.circle
                    cx="150"
                    cy="150"
                    r="120"
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset, stroke: color }}
                    transition={{ strokeDashoffset: { duration: 1.5, ease: "easeOut" }, stroke: { duration: 1 } }}
                />
            </svg>

            {/* 4. Center Content */}
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-7xl font-bold text-white tracking-tighter"
                >
                    {score}
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, color }}
                    transition={{ delay: 0.8 }}
                    className="font-bold text-sm uppercase tracking-widest mt-2"
                    style={{ color }}
                >
                    {label}
                </motion.span>
            </div>

        </div>
    );
};

export default ScoreRing;
