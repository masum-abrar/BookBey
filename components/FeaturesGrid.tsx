'use client';
import { Search, Shield, Truck, Star } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { motion } from 'framer-motion';

const FEATURE_LIST = [
  { icon: <Search size={24} />, title: 'Curated Selection', desc: 'Hand-picked by our editorial team for quality and significance.' },
  { icon: <Shield size={24} />, title: 'Verified Reviews', desc: 'Authentic reader reviews with verified purchase badges.' },
  { icon: <Truck size={24} />, title: 'Fast Delivery', desc: 'Dispatched within 24 hours. Free over $35.' },
  { icon: <Star size={24} />, title: 'Loyalty Rewards', desc: 'Earn points on every purchase for exclusive editions.' },
];

export default function FeaturesGrid() {
  return (
    <section className="py-32 px-6 bg-[#0c0c14] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-yellow-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURE_LIST.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <FeatureCard {...f} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}