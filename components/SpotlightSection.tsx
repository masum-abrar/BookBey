import { BookOpen, ArrowRight } from 'lucide-react';

export default function SpotlightSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 to-transparent p-12 border border-white/5">
          <div className="relative z-10 max-w-md">
            <span className="text-yellow-500 font-bold text-sm tracking-tighter uppercase">Author of the Month</span>
            <h3 className="text-4xl font-bold mt-4 mb-6">The Art of Storytelling by Marcus Aurelius</h3>
            <p className="text-muted-foreground mb-8 text-lg">A deep dive into the philosophy of ancient wisdom and its impact on modern literature.</p>
            <button className="text-white font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
              Read Biography <ArrowRight size={20} />
            </button>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:opacity-40 transition-opacity">
             <BookOpen size={300} strokeWidth={1} />
          </div>
        </div>

        <div className="rounded-3xl bg-yellow-500 p-10 flex flex-col justify-between text-black">
          <h3 className="text-2xl font-bold leading-tight">Get Weekly Curations In Your Inbox.</h3>
          <div className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full bg-black/10 border-none rounded-xl p-4 placeholder:text-black/50 outline-none" />
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:opacity-90">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}