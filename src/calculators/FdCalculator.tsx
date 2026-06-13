import React, { useState, useMemo } from 'react';
import { calculateFD } from '../utils/finance';
import { Share2, Percent, Calendar, CheckCircle } from 'lucide-react';

export default function FdCalculator() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(5);
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('quarterly');
  const [shared, setShared] = useState<boolean>(false);

  const fdData = useMemo(() => {
    return calculateFD(principal, rate, tenure, compounding);
  }, [principal, rate, tenure, compounding]);

  const handleShare = () => {
    const text = `ClearFinCalc Fixed Deposit Calculation:\nPrincipal: ₹${principal.toLocaleString('en-IN')}\nInterest Rate: ${rate}%\nDuration: ${tenure} years\nMaturity Value: ₹${fdData.maturityAmount.toLocaleString('en-IN')}\nCalculate yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Fixed Deposit (FD) Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate the maturity amount and interest earned on your Fixed Deposits with custom compounding cycles.</p>
        </div>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-all shadow-sm"
        >
          {shared ? <CheckCircle className="w-4 h-4 text-emerald-500 animate-scale" /> : <Share2 className="w-4 h-4" />}
          {shared ? 'Copied!' : 'Share Result'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Principal Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Deposit Principal
              </label>
              <input 
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹10,000</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-500" />
                Interest Rate (% p.a.)
              </label>
              <input 
                type="number"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Tenure (Years)
              </label>
              <input 
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Compounding frequency selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['monthly', 'quarterly', 'half-yearly', 'yearly'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCompounding(mode)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border capitalize transition-all ${compounding === mode ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Results & Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mb-1">Interest Earned</span>
              <span className="text-xl font-extrabold text-sky-950 dark:text-sky-200">
                ₹{fdData.interestEarned.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Maturity Amount</span>
              <span className="text-xl font-extrabold text-emerald-950 dark:text-emerald-200">
                ₹{fdData.maturityAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>FD Investment Summary</span>
              <span>Value</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Total Invested Principal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">₹{principal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Rate of Return</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{rate}% p.a.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Compounding Type</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{compounding}</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Est. Maturity Amount</span>
              <span className="text-indigo-500">₹{fdData.maturityAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
