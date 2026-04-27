import { BookOpen, Users, Award, Globe } from 'lucide-react';

const STATS = [
  { icon: <BookOpen />, val: "12k+", lab: "Books" },
  { icon: <Users />, val: "98k+", lab: "Readers" },
  { icon: <Award />, val: "4.9★", lab: "Rating" },
  { icon: <Globe />, val: "45+", lab: "Countries" }
];

export default function StatsStrip() {
  return (
    <section className="py-12 bg-white/[0.02] border-y border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <span className="text-yellow-500/50 mb-1">{stat.icon}</span>
            <span className="text-2xl font-bold">{stat.val}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{stat.lab}</span>
          </div>
        ))}
      </div>
    </section>
  );
}