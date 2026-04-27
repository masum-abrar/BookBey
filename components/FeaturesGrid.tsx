import { Search, Shield, Truck, Star } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const FEATURE_LIST = [
  { icon: <Search size={24} />, title: 'Curated Selection', desc: 'Hand-picked by our editorial team for quality and significance.' },
  { icon: <Shield size={24} />, title: 'Verified Reviews', desc: 'Authentic reader reviews with verified purchase badges.' },
  { icon: <Truck size={24} />, title: 'Fast Delivery', desc: 'Dispatched within 24 hours. Free over $35.' },
  { icon: <Star size={24} />, title: 'Loyalty Rewards', desc: 'Earn points on every purchase for exclusive editions.' },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-[#0c0c14]">
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURE_LIST.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}