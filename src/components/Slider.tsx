import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BudgetCategory } from '../data/budgetData';
import * as LucideIcons from 'lucide-react';

interface SliderProps {
  category: BudgetCategory;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ category, value, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = (LucideIcons as any)[category.icon];
  const max = 400;
  const percentage = (value / max) * 100;
  const diff = value - category.actual;

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative py-12 px-8 border-b border-stone/20 transition-all duration-700 ${category.locked ? 'bg-stone/10 opacity-70' : 'hover:bg-chalk/60'}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Identity & Visual State */}
        <div className="w-full lg:w-[25%] flex items-center gap-6">
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
            className="p-4 rounded-3xl shadow-xl glass"
            style={{ color: category.color }}
          >
            <Icon size={28} />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-ink tracking-tight">{category.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className="mono text-[10px] text-silver uppercase">Actual: £{category.actual}B</span>
              {diff !== 0 && (
                <span className={`mono text-[10px] font-bold ${diff > 0 ? 'text-westminster-green' : 'text-deficit-red'}`}>
                  {diff > 0 ? '▲' : '▼'} {Math.abs(diff)}B
                </span>
              )}
            </div>
          </div>
        </div>

        {/* The Interactive Controller */}
        <div className="w-full lg:w-[45%] group/slider">
          <div className="relative h-12 flex items-center">
            {/* Background Track */}
            <div className="absolute w-full h-2 bg-stone/40 rounded-full overflow-hidden">
               {/* Pulse effect on hover */}
               <motion.div 
                 animate={{ opacity: isHovered ? 1 : 0 }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                 transition={{ repeat: Infinity, duration: 1.5 }}
               />
            </div>

            {/* Progress Fill */}
            <motion.div 
              className="absolute h-2 rounded-full z-10"
              style={{ width: `${percentage}%`, backgroundColor: category.color }}
              animate={{ 
                opacity: isHovered ? 0.9 : 0.7,
                boxShadow: isHovered ? `0 0 20px ${category.color}40` : 'none'
              }}
            />

            <input
              type="range"
              min="0"
              max={max}
              value={value}
              disabled={category.locked}
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-30"
            />

            {/* Custom Thumb */}
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{ left: `calc(${percentage}% - 16px)` }}
              animate={{ 
                scale: isHovered ? 1.15 : 1,
                y: isHovered ? -2 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="w-8 h-8 rounded-2xl bg-chalk shadow-2xl border-2 border-white flex items-center justify-center">
                {category.locked ? (
                  <LucideIcons.Lock size={14} className="text-silver" />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                )}
              </div>
              
              {/* Floating Value */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl glass shadow-2xl border border-white/40 whitespace-nowrap"
                  >
                    <span className="mono text-sm font-bold text-ink">£{value}B</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <div className="flex justify-between mt-2 px-1">
            <span className="mono text-[10px] text-silver font-medium">£0B</span>
            <span className="mono text-[10px] text-silver font-medium">£400B</span>
          </div>
        </div>

        {/* Intelligent Consequence Feed */}
        <div className="w-full lg:w-[30%] min-h-[60px] flex items-center">
          <AnimatePresence mode="wait">
            {Math.abs(diff) >= 5 ? (
              <motion.div
                key={category.id + (diff > 0 ? 'pos' : 'neg')}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                className="relative p-6 rounded-3xl glass-card flex gap-4 overflow-hidden group/card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className={`w-1.5 h-full rounded-full shrink-0 ${diff > 0 ? 'bg-westminster-green' : 'bg-deficit-red'}`} />
                <div className="relative">
                  <p className="text-sm font-medium text-ink leading-relaxed italic pr-4">
                    {(() => {
                      const items = diff > 0 ? category.consequences.increase : category.consequences.decrease;
                      const absDiff = Math.abs(diff);
                      const consequence = items
                        .filter(c => absDiff >= c.threshold)
                        .sort((a, b) => b.threshold - a.threshold)[0];
                      return consequence ? `"${consequence.text}"` : "Significant fiscal shift observed.";
                    })()}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-[10px] mono text-silver uppercase tracking-widest pl-6"
              >
                Stable Allocation
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default Slider;
