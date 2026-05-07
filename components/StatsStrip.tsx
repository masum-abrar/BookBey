'use client';
import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { icon: <BookOpen size={20} />, val: "12k+", lab: "Volumes" },
  { icon: <Users size={20} />, val: "98k+", lab: "Readers" },
  { icon: <Award size={20} />, val: "4.9★", lab: "Rating" },
  { icon: <Globe size={20} />, val: "45+", lab: "Countries" }
];

export default function StatsStrip() {
  return (
    <section className="py-16 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {STATS.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-3 rounded-full bg-yellow-500/5 text-yellow-500 mb-1 group-hover:scale-110 group-hover:bg-yellow-500/10 transition-all duration-500">
              {stat.icon}
            </div>
            <span className="text-3xl font-black tracking-tighter">{stat.val}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">{stat.lab}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}