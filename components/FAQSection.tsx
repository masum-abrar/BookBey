import { ArrowRight } from 'lucide-react';

const FAQS = [
  { q: 'Is it worldwide shipping?', a: 'Yes, we deliver to over 45 countries with full tracking support.' },
  { q: 'Can I return a book?', a: 'Of course. We offer a 14-day hassle-free return policy.' },
  { q: 'Do you have rare editions?', a: 'Our premium members get early access to signed and limited editions.' }
];

export default function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto" />
        </div>
        <div className="space-y-4">
          {FAQS.map((item, idx) => (
            <details key={idx} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none">
                {item.q}
                <span className="group-open:rotate-180 transition-transform"><ArrowRight className="rotate-90" /></span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}