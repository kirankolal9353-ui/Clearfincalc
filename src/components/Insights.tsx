import React from 'react';
import { ARTICLES } from '../data/articles';
import { User, Calendar, Clock } from 'lucide-react';

export default function Insights() {
  return (
    <section id="insights" className="py-12 md:py-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-full uppercase tracking-wider">
            Finance Insights
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Wealth & Tax Strategies
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
            Gain expert knowledge on tax optimization, smart saving techniques, and international trade customs codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article 
              key={article.id} 
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Category & Read Time */}
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 uppercase rounded-full">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-500 transition-colors cursor-pointer">
                  {article.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Author Footer */}
              <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-300" />
                  {article.author.split(',')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-300" />
                  {article.date}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
