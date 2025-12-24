import React from 'react';
import { GraduationCap, ShoppingCart, HeartPulse, Utensils, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LifestyleGridProps {
    data: any;
    onCategoryClick: (category: any) => void;
}

const CategoryCard = ({ title, items, icon: Icon, gradient, textColor, delay, onClick }: any) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-between group cursor-pointer ${gradient} shadow-2xl`}
    >
        {/* Hover Scale Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700" />

        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white shadow-lg group-hover:bg-white/30 transition-colors`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            <p className={`text-sm font-medium ${textColor} opacity-90`}>{items.length} Punti di interesse</p>
        </div>

        <div className="relative z-10 mt-6 space-y-3 pointer-events-none">
            {items.slice(0, 3).map((item: any, idx: number) => (
                <div key={idx} className="bg-black/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-white/10">
                    <span className="text-white text-sm font-bold truncate max-w-[120px]">{item.name}</span>
                    <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-md">
                        <Star className="w-3 h-3 text-white fill-white" />
                        <span className="text-[10px] font-bold text-white">{item.rating}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-white font-bold text-sm opacity-60 group-hover:opacity-100 transition-opacity">
            Vedi tutti <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
    </motion.div>
);

const LifestyleGrid = ({ data, onCategoryClick }: { data: any, onCategoryClick: (category: any) => void }) => {
    const schools = data.schools || [];
    const supermarkets = data.supermarkets || [];
    const lifestyle = data.lifestyle || [...(data.pharmacies || []), ...(data.lifestyle || [])]; // Merge for demo

    return (
        <>
            <CategoryCard
                title="Istruzione"
                items={schools}
                icon={GraduationCap}
                gradient="bg-gradient-to-br from-purple-600 to-indigo-700"
                textColor="text-purple-100"
                delay={0.1}
                onClick={() => onCategoryClick({ title: 'Istruzione', items: schools, theme: 'purple' })}
            />
            <CategoryCard
                title="Shopping"
                items={supermarkets}
                icon={ShoppingCart}
                gradient="bg-gradient-to-br from-emerald-500 to-teal-700"
                textColor="text-emerald-100"
                delay={0.2}
                onClick={() => onCategoryClick({ title: 'Shopping', items: supermarkets, theme: 'emerald' })}
            />
            <CategoryCard
                title="Lifestyle"
                items={lifestyle}
                icon={Utensils}
                gradient="bg-gradient-to-br from-orange-400 to-rose-600"
                textColor="text-orange-100"
                delay={0.3}
                onClick={() => onCategoryClick({ title: 'Lifestyle', items: lifestyle, theme: 'orange' })}
            />
        </>
    );
};

export default LifestyleGrid;
