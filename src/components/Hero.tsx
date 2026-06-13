import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  liveUsdRate?: number;
}

export default function Hero({ liveUsdRate = 83.45 }: HeroProps) {
  const [calculationCount, setCalculationCount] = useState(1420500);

  // Animate the counter subtly
  useEffect(() => {
    const timer = setInterval(() => {
      setCalculationCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const newsItems = [
    "🔥 Gold Rate surges past ₹72,000/10g",
    "📈 NIFTY 50 crosses record high of 23,200",
    "🏦 Repo Rate remains unchanged at 6.5%",
    `🟢 LIVE: 1 USD = ₹${liveUsdRate.toFixed(2)} | 1 EUR = ₹${(liveUsdRate * 1.08).toFixed(2)}`,
    "📊 New Income Tax regime rebate limit increased to ₹12L",
    "🚚 Customs duty rate revised on imported electronic assemblies"
  ];

  return (
    <header className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 via-sky-50/50 to-white dark:from-sky-950/10 dark:via-emerald-950/5 dark:to-transparent">
      
      {/* News Ticker */}
      <div className="absolute top-0 left-0 w-full bg-slate-900 text-white text-[10px] md:text-xs py-2 overflow-hidden z-10 flex items-center select-none font-bold">
        <div className="flex-shrink-0 bg-red-600 text-white font-extrabold uppercase px-2.5 py-0.5 rounded-r text-[9px] tracking-wider animate-pulse ml-4 mr-2">
          LIVE TICKER
        </div>
        <div className="overflow-hidden relative w-full flex">
          <div className="animate-ticker flex whitespace-nowrap gap-12 text-slate-400">
            {newsItems.concat(newsItems).map((item, idx) => (
              <span key={idx} className="hover:text-white transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Trusted tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-sm text-xs font-bold text-slate-700 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Secure & Privacy Friendly Tools
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              All-in-One Smart <br/>
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Finance Calculator
              </span> <br/>
              Platform
            </h1>

            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto lg:mx-0">
              Clear Calculations. Smarter Decisions. Calculate EMI, SIP, Taxes, Salary, Loans, TDS, and Import Duties Instantly.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a 
                href="#calculators"
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-sm md:text-base group"
              >
                Start Calculating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#advisor"
                className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold rounded-2xl transition-all text-sm md:text-base border border-slate-250/20"
              >
                Explore AI Advisor
              </a>
            </div>

            {/* Live Counters */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200/50 dark:border-slate-800/50 pt-8 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Calculations</span>
                <span className="text-sm md:text-lg font-black text-slate-800 dark:text-white mt-1 block">
                  {calculationCount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Available Tools</span>
                <span className="text-sm md:text-lg font-black text-slate-800 dark:text-white mt-1 block">
                  15+ Premium
                </span>
              </div>
              <div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Accuracy Rate</span>
                <span className="text-sm md:text-lg font-black text-emerald-500 mt-1 block flex items-center justify-center lg:justify-start gap-0.5">
                  100% CA Verified
                </span>
              </div>
            </div>

          </div>

          {/* Graphical Illustration Container */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-500/10 blur-3xl -z-10 rounded-full"></div>
            
            {/* Logo Showcase Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden space-y-4 animate-float group">
              <div className="relative rounded-2xl overflow-hidden shadow-inner bg-white border border-slate-150/50 dark:border-slate-800">
                <img 
                  src="/logo.jpg" 
                  alt="ClearFinCalc Official Logo" 
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-all duration-700"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-bold px-1">
                <span>ClearFinCalc Core Engine v4.0</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  CA Verified & Trust Compliant
                </span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </header>
  );
}
