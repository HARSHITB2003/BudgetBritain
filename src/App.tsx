import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUDGET_CATEGORIES, TOTAL_BUDGET } from './data/budgetData';
import BudgetSphere from './components/BudgetSphere';
import Slider from './components/Slider';
import Results from './components/Results';
import * as LucideIcons from 'lucide-react';

const App: React.FC = () => {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    BUDGET_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.actual }), {})
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [communityData, setCommunityData] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Mock community data
    const mockCommunity = BUDGET_CATEGORIES.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: cat.actual + (Math.random() * 20 - 5)
    }), {});
    setCommunityData(mockCommunity);
  }, []);

  const currentTotal = useMemo(() => 
    Object.values(allocations).reduce((sum, val) => sum + val, 0)
  , [allocations]);

  const difference = currentTotal - TOTAL_BUDGET;
  const isBalanced = Math.abs(difference) < 0.5;

  const handleAllocationChange = (id: string, value: number) => {
    setAllocations(prev => ({ ...prev, [id]: value }));
  };

  const autoBalance = () => {
    const diff = TOTAL_BUDGET - currentTotal;
    const currentOther = allocations.other;
    setAllocations(prev => ({ ...prev, other: Math.max(0, currentOther + diff) }));
  };

  const handleSubmit = () => {
    if (isBalanced) {
      setIsSubmitted(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen mesh-gradient grid-bg selection:bg-westminster-green/20">
      
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-[32px] px-8 py-4 pointer-events-auto shadow-2xl border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-ink rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">B</div>
            <div>
              <h1 className="text-xl font-bold text-ink leading-none">BudgetBritain</h1>
              <span className="text-[10px] mono text-silver uppercase tracking-widest tracking-tighter">Chancellor Protocol</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[11px] font-bold text-graphite uppercase tracking-widest">
            <a href="#simulator" className="hover:text-westminster-green transition-all">Simulator</a>
            <a href="#community" className="hover:text-westminster-green transition-all">Consensus</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-stone" />
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-ink mono leading-none">14,204</div>
              <div className="text-[9px] text-silver uppercase tracking-tighter">Protocols Submitted</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-20">
        <div id="simulator" className="max-w-7xl mx-auto px-6">
          
          {/* Hero Content */}
          <section className="text-center mb-32 relative">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/40 mb-8"
             >
               <span className="w-2 h-2 rounded-full bg-westminster-green animate-pulse" />
               <span className="text-[10px] font-bold text-ink uppercase tracking-widest">Live 2025/26 Treasury Dataset</span>
             </motion.div>

             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-6xl md:text-8xl font-bold text-ink mb-8 leading-[0.9] tracking-tight"
             >
               The UK Budget <span className="text-westminster-green">In Your Hands.</span>
             </motion.h2>

             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-xl text-charcoal max-w-2xl mx-auto mb-16 font-light leading-relaxed"
             >
               Governance is the art of the tradeoff. To fund your vision, 
               you must decide what to sacrifice. Every pound is accounted for.
             </motion.p>

             {/* Real 3D interactive Sphere */}
             <div className="relative h-[600px] mb-20">
                <BudgetSphere allocations={allocations} />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                   <div className="text-[12rem] font-bold text-ink/[0.02] select-none tracking-tighter">£1,335B</div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
               {[
                 { label: 'Total Budget', value: '£1,335B', icon: LucideIcons.Zap, color: 'text-westminster-green' },
                 { label: 'Citizens Affected', value: '67.3M', icon: LucideIcons.Users, color: 'text-treasury-gold' },
                 { label: 'Fixed Debt', value: '£114B', icon: LucideIcons.Lock, color: 'text-deficit-red' }
               ].map((stat, i) => (
                 <motion.div 
                   key={stat.label}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 + i * 0.1 }}
                   className="card p-8 flex flex-col items-center justify-center text-center"
                 >
                   <stat.icon size={24} className={`${stat.color} mb-4`} />
                   <div className="text-3xl font-bold text-ink mb-1">{stat.value}</div>
                   <div className="text-[10px] text-silver uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                 </motion.div>
               ))}
             </div>
          </section>

          {/* Simulator Section */}
          <section className="relative z-10">
            {/* Balance Bar - Stickier and more premium */}
            <div className="sticky top-32 z-40 mb-12">
              <motion.div 
                layout
                className={`glass rounded-[40px] px-10 py-6 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-2 transition-all duration-500 ${isBalanced ? 'border-westminster-green bg-westminster-green/5' : 'border-deficit-red bg-deficit-red/5'}`}
              >
                <div className="flex items-center gap-8">
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-silver uppercase tracking-widest mb-1">Fiscal Balance</div>
                    <div className={`text-4xl font-bold mono ${isBalanced ? 'text-westminster-green' : 'text-deficit-red'}`}>
                      £{currentTotal.toLocaleString()}B
                    </div>
                  </div>
                  <div className="h-10 w-px bg-stone/50" />
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-silver uppercase tracking-widest mb-1">Target</div>
                    <div className="text-2xl font-bold text-ink mono">£1,335B</div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <AnimatePresence mode="wait">
                    {!isBalanced ? (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-deficit-red/10 text-deficit-red border border-deficit-red/20">
                          <LucideIcons.AlertTriangle size={20} className="animate-bounce" />
                          <span className="mono text-sm font-bold uppercase tracking-tight">
                            {difference > 0 ? `Cut £${difference.toFixed(1)}B` : `Add £${Math.abs(difference).toFixed(1)}B`}
                          </span>
                        </div>
                        <button 
                          onClick={autoBalance}
                          className="px-6 py-3 rounded-2xl bg-ink text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                          Auto-Fix
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-westminster-green font-bold text-sm uppercase tracking-widest"
                      >
                        <LucideIcons.CheckCircle2 size={24} />
                        Budget Balanced
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button 
                    onClick={handleSubmit}
                    disabled={!isBalanced || isSubmitted}
                    className={`px-10 py-5 rounded-2xl font-bold text-sm tracking-widest transition-all duration-500 uppercase ${isBalanced ? 'bg-ink text-white shadow-2xl hover:scale-105 active:scale-95' : 'bg-stone text-silver cursor-not-allowed opacity-50'}`}
                  >
                    {isSubmitted ? 'Protocol Submitted' : 'Submit Budget Protocol'}
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="card shadow-3xl overflow-hidden border-white/20">
              {BUDGET_CATEGORIES.map((cat) => (
                <Slider 
                  key={cat.id} 
                  category={cat} 
                  value={allocations[cat.id]} 
                  onChange={(val) => handleAllocationChange(cat.id, val)}
                />
              ))}
            </div>
          </section>

          {/* Results Section */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                ref={resultsRef}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                className="mt-40"
              >
                <div className="w-full h-px bg-stone/30 mb-40" />
                <Results allocations={allocations} communityData={communityData} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <footer className="bg-ink text-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-20">
             <div>
                <h3 className="text-4xl font-bold mb-8">BudgetBritain</h3>
                <p className="text-silver text-lg font-light leading-relaxed max-w-md">
                  Empowering citizens through radical fiscal transparency. Built with official HM Treasury PESA 2025/26 data sets.
                </p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[11px] font-bold uppercase tracking-[0.2em]">
                <div className="space-y-6">
                  <h4 className="text-westminster-green">Framework</h4>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">Methodology</p>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">Data Engine</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-westminster-green">Protocol</h4>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">Privacy</p>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">Governance</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-westminster-green">Access</h4>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">API Docs</p>
                  <p className="hover:text-westminster-green cursor-pointer transition-colors">Source Code</p>
                </div>
             </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] mono text-silver uppercase tracking-widest">
             <span>© 2026 BudgetBritain Protocol · Sovereign Simulation</span>
             <div className="flex gap-12">
                <span>Designed by Harshit Baldota</span>
                <span className="text-westminster-green">Day 10 / #30DaysChallenge</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
