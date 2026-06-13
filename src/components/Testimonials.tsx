import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Rohit Deshmukh",
      role: "SaaS Business Founder",
      text: "The Advanced TDS Calculator is a lifesaver. Being able to compare normal and higher rates and export PDF summaries has saved our finance team hours of manual checking.",
      stars: 5
    },
    {
      name: "Ananya Sen",
      role: "Freelance UI Designer",
      text: "ClearFinCalc is on my bookmark bar. I use the GST and Salary calculators monthly to calculate my tax liability and take-home income. Simple, fast, and stunning UI.",
      stars: 5
    },
    {
      name: "Rajesh Kannan",
      role: "Import-Export Cargo Manager",
      text: "Customs calculations are complex, but the landed cost flowchart on ClearFinCalc breaks down BCD, SWS, and IGST step-by-step. Extremely accurate and helpful.",
      stars: 5
    }
  ];

  return (
    <section className="py-12 md:py-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-full uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            What Our Users Say
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
            Join thousands of small businesses, founders, and individuals who manage their wealth with ClearFinCalc daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold italic">
                  "{r.text}"
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{r.name}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">{r.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
