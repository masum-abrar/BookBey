"use client"
import { motion } from 'framer-motion';
import { MousePointer2, BookOpenCheck, Coffee, Sparkles } from 'lucide-react';

const JOURNEY_STEPS = [
  { 
    icon: <MousePointer2 />, 
    title: 'Discover', 
    desc: 'Browse our hand-picked collection of hidden gems and bestsellers.' 
  },
  { 
    icon: <Coffee />, 
    title: 'Personalize', 
    desc: 'Tell us what you love, and we’ll brew the perfect list for you.' 
  },
  { 
    icon: <BookOpenCheck />, 
    title: 'Experience', 
    desc: 'Enjoy seamless reading with our premium physical and digital editions.' 
  },
  { 
    icon: <Sparkles />, 
    title: 'Connect', 
    desc: 'Join local book clubs and discuss your favorite chapters.' 
  },
];

export default function JourneySection() {
  return (
    <section className="py-32 px-6 bg-[#08080c] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Your Literary BookBey</h2>
          <p className="text-muted-foreground italic">"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-yellow-500 mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-yellow-500/20 group-hover:-rotate-12">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.desc}</p>
              <div className="mt-6 text-xs font-mono text-white/20 group-hover:text-yellow-500/50 transition-colors">0{idx + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}