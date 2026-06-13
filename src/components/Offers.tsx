import React from 'react';
import { AFFILIATE_OFFERS } from '../data/offers';
import { Star, Check, ArrowRight } from 'lucide-react';

export default function Offers() {
  return (
    <section id="offers" className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 font-bold text-xs rounded-full uppercase tracking-wider">
            Partners
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Loan & Credit Card Offers
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
            Compare premium financial products and apply through our secure partnerships for exclusive rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AFFILIATE_OFFERS.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {offer.badge && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[8px] uppercase tracking-wider py-1 px-3 rounded-bl-xl">
                  {offer.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{offer.category}</span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{offer.name}</h3>
                  <span className="text-[10px] font-semibold text-slate-500">{offer.provider}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{offer.rating} / 5</span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-1.5 text-[10px] text-slate-500 font-semibold">
                  {offer.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 space-y-3">
                <div className="text-[9px] text-slate-400 font-bold leading-none">
                  * {offer.terms}
                </div>
                <a 
                  href={offer.ctaLink}
                  className="w-full py-2 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-slate-100 rounded-xl text-center text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  {offer.ctaText}
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
