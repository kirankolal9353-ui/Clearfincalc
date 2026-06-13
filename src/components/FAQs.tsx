import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQs() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<'All' | 'General' | 'EMI' | 'SIP' | 'TDS' | 'Customs'>('All');

  const categories: ('All' | 'General' | 'EMI' | 'SIP' | 'TDS' | 'Customs')[] = ['All', 'General', 'EMI', 'SIP', 'TDS', 'Customs'];

  const filteredFaqs = FAQS.filter(f => activeCat === 'All' || f.category === activeCat);

  const toggleFaq = (id: string) => {
    setActiveFaq(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center space-y-3 mb-10">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 font-bold text-xs rounded-full uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">
            Find instant answers to common questions about loans, compounding interest, tax rules, and customs.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setActiveFaq(null);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${activeCat === cat ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm' : 'bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                >
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100/50 dark:border-slate-800/40 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
