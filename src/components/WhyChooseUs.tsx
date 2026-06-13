import React from 'react';
import { Zap, Scale, ShieldAlert, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Zap className="w-6 h-6 text-sky-500" />,
      title: "Fast Calculations",
      description: "Results update dynamically in real time on slider and input changes, saving you time."
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: "Accurate & CA Verified",
      description: "Algorithms are designed in accordance with the latest Finance Acts and verified by tax professionals."
    },
    {
      icon: <Scale className="w-6 h-6 text-indigo-500" />,
      title: "100% Free Tools",
      description: "No subscription fee, registration, or credit cards required. Accessible to everyone."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
      title: "Secure & Privacy First",
      description: "No data is saved on servers. All calculations happen instantly on your local device."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 font-bold text-xs rounded-full uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Choose ClearFinCalc?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
            We deliver state-of-the-art accuracy with premium speed and absolute security for daily financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
