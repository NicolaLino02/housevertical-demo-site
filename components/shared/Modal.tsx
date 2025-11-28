import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: any;
    color: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon: Icon, color, children }) => {
    if (!isOpen) return null;

    const colorName = color.split('-')[1] || 'blue';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        className="bg-[#0f172a] p-6 md:p-8 rounded-[2rem] border border-white/10 max-w-lg w-full relative overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-${colorName}-500/20 to-transparent rounded-full blur-[60px]`}></div>
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 z-10">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className={`p-4 bg-white/5 rounded-2xl border border-white/10 ${color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{title}</h3>
                                <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>Dettaglio Sezione</span>
                            </div>
                        </div>
                        <div className="relative z-10 space-y-4">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
