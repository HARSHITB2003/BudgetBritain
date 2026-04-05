import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Cell
} from 'recharts';
import { BUDGET_CATEGORIES, TOTAL_BUDGET } from '../data/budgetData';

interface ResultsProps {
  allocations: Record<string, number>;
  communityData: Record<string, number>;
}

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`card p-8 bg-chalk border border-white/40 shadow-2xl relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </motion.div>
  );
};

const Results: React.FC<ResultsProps> = ({ allocations, communityData }) => {
  const comparisonData = useMemo(() => {
    return BUDGET_CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      actual: cat.actual,
      user: allocations[cat.id],
      community: communityData[cat.id] || cat.actual,
      diff: allocations[cat.id] - cat.actual,
      color: cat.color
    })).sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  }, [allocations, communityData]);

  const flows = useMemo(() => {
    const sources = comparisonData.filter(d => d.diff < 0).map(d => ({ ...d, absDiff: Math.abs(d.diff) }));
    const targets = comparisonData.filter(d => d.diff > 0);
    return { sources, targets };
  }, [comparisonData]);

  const radarData = useMemo(() => [
    { subject: 'Health', user: allocations.health, gov: 192 },
    { subject: 'Defence', user: allocations.defence, gov: 78 },
    { subject: 'Education', user: allocations.education, gov: 115 },
    { subject: 'Environment', user: (allocations.housing + allocations.energy), gov: 42 },
    { subject: 'Social', user: allocations.social, gov: 379 },
    { subject: 'Infrastructure', user: allocations.transport, gov: 28 },
  ], [allocations]);

  return (
    <div className="space-y-20 py-20 px-4">
      
      {/* Visualizing the Tradeoffs (Sankey Flow) */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">The Great Reallocation</h2>
          <p className="text-graphite max-w-2xl mx-auto">Visualizing how your priorities shifted capital across the United Kingdom.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-deficit-red/10 text-deficit-red text-xs uppercase tracking-widest mono">Sources</span>
              <span>Where you found savings</span>
            </h3>
            {flows.sources.slice(0, 4).map((s, i) => (
              <motion.div 
                key={s.name}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-3xl glass border border-white/40"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: s.color }}>
                     {s.name[0]}
                   </div>
                   <span className="font-bold text-ink">{s.name}</span>
                </div>
                <span className="mono font-bold text-deficit-red">-£{s.absDiff}B</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-westminster-green/10 text-westminster-green text-xs uppercase tracking-widest mono">Destinations</span>
              <span>Where you invested</span>
            </h3>
            {flows.targets.slice(0, 4).map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-3xl glass border border-white/40"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: t.color }}>
                     {t.name[0]}
                   </div>
                   <span className="font-bold text-ink">{t.name}</span>
                </div>
                <span className="mono font-bold text-westminster-green">+£{t.diff}B</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Radar Analysis */}
        <TiltCard className="xl:col-span-1">
          <h3 className="text-2xl font-bold mb-8">Alignment</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E8E5DE" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B6B6B', fontSize: 10, fontWeight: 500 }} />
                <Radar name="You" dataKey="user" stroke="#1B6B4A" fill="#1B6B4A" fillOpacity={0.3} />
                <Radar name="Gov" dataKey="gov" stroke="#C5973E" fill="#C5973E" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-westminster-green/5 border border-westminster-green/10">
            <p className="text-xs text-center text-charcoal">
              You prioritized <span className="font-bold">Social Equality</span> and <span className="font-bold">Public Health</span> significantly above the current treasury baseline.
            </p>
          </div>
        </TiltCard>

        {/* Detailed Comparison */}
        <TiltCard className="xl:col-span-2">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-2xl font-bold">Category Delta</h3>
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-stone" />
                   <span className="text-[10px] mono text-silver uppercase">Treasury</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-westminster-green" />
                   <span className="text-[10px] mono text-silver uppercase">You</span>
                </div>
             </div>
           </div>
           
           <div className="h-[400px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={comparisonData.slice(0, 8)} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fill: '#1A1A1A', fontSize: 11, fontWeight: 600 }} />
                 <Tooltip cursor={{ fill: 'transparent' }} content={({ active, payload }) => {
                    if (active && payload) {
                      const d = payload[0].payload;
                      return (
                        <div className="glass p-4 rounded-2xl shadow-2xl border border-white/50">
                           <p className="font-bold text-sm mb-2">{d.name}</p>
                           <div className="space-y-1">
                              <p className="text-xs text-graphite flex justify-between gap-8"><span>Gov:</span> <span>£{d.actual}B</span></p>
                              <p className="text-xs text-westminster-green font-bold flex justify-between gap-8"><span>You:</span> <span>£{d.user}B</span></p>
                           </div>
                        </div>
                      )
                    }
                    return null;
                 }} />
                 <Bar dataKey="actual" fill="#E8E5DE" radius={[0, 4, 4, 0]} barSize={8} />
                 <Bar dataKey="user" radius={[0, 4, 4, 0]} barSize={16}>
                   {comparisonData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </TiltCard>

      </div>

      {/* Community Pulse */}
      <section className="max-w-7xl mx-auto">
         <div className="p-12 rounded-[40px] bg-ink text-white relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-westminster-green/20 blur-[120px] rounded-full" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <span className="mono text-xs text-westminster-green uppercase tracking-[0.4em] mb-6 block font-bold">The People's Consensus</span>
                  <h2 className="text-4xl font-bold mb-6">How Your Choice Compares to 14,204 Citizens</h2>
                  <p className="text-silver leading-relaxed mb-10">
                    The average user allocates <span className="text-white font-bold">£21B more to Health</span> than the current government. 
                    You diverged from the community consensus most in <span className="text-white font-bold">Defence</span>.
                  </p>
                  <div className="flex gap-8">
                     <div>
                        <div className="text-3xl font-bold text-surplus-blue">84%</div>
                        <div className="text-[10px] mono text-silver uppercase mt-1">Agree on NHS Hike</div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-treasury-gold">62%</div>
                        <div className="text-[10px] mono text-silver uppercase mt-1">Agree on R&D Cut</div>
                     </div>
                  </div>
               </div>
               
               <div className="space-y-6">
                  {comparisonData.slice(0, 3).map(d => (
                    <div key={d.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                       <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">{d.name}</span>
                          <span className="text-surplus-blue mono text-xs">Community Avg: £{d.community}B</span>
                       </div>
                       <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(d.community / 400) * 100}%` }}
                            className="h-full bg-surplus-blue"
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <div className="text-center py-20">
         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="px-12 py-5 rounded-2xl bg-ink text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl"
         >
           Try Another Allocation
         </button>
      </div>

    </div>
  );
};

export default Results;
