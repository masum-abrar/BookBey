'use client';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQS = [
  { q: 'Is it worldwide shipping?', a: 'Yes, we deliver to over 45 countries with full tracking support and carbon-neutral logistics.' },
  { q: 'Can I return a volume?', a: 'Of course. We offer a 14-day hassle-free return policy for all standard editions in original condition.' },
  { q: 'Do you have rare editions?', a: 'Our premium members get early access to signed, limited, and first-edition volumes from our private vaults.' }
];

export default function FAQSection() {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-bold mb-4"
          >
            Assistance
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tighter"
          >
            Common Inquiries
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, idx) => (
            <motion.details 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer hover:border-white/10 transition-colors"
            >
              <summary className="flex justify-between items-center font-bold text-lg list-none outline-none">
                {item.q}
                <ChevronDown className="group-open:rotate-180 transition-transform text-yellow-500" size={20} />
              </summary>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-muted-foreground leading-relaxed font-light"
              >
                {item.a}
              </motion.p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}