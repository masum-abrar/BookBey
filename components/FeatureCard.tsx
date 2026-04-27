// components/FeatureCard.tsx
import { Feature } from "@/types";

export default function FeatureCard({ icon, title, desc }: Feature) {
  return (
    <div className="group p-8 border border-white/5 bg-white/[0.02] rounded-2xl transition-all hover:bg-white/[0.04] hover:border-yellow-500/30">
      <div className="text-yellow-500 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}