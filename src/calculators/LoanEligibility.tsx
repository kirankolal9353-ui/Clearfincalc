import React, { useState, useMemo } from 'react';
import { calculateLoanEligibility } from '../utils/finance';
import { Share2, IndianRupee, Calendar, Percent, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function LoanEligibility() {
  const [income, setIncome] = useState<number>(80000);
  const [existingEmi, setExistingEmi] = useState<number>(10000);
  const [rate, setRate] = useState<number>(9.5);
  const [tenure, setTenure] = useState<number>(20);
  const [foir, setFoir] = useState<number>(50); // FOIR percentage (default 50%)
  const [shared, setShared] = useState<boolean>(false);

  const eligibility = useMemo(() => {
    return calculateLoanEligibility(income, existingEmi, rate, tenure, foir);
  }, [income, existingEmi, rate, tenure, foir]);

  const handleShare = () => {
    const text = `ClearFinCalc Loan Eligibility:\nMonthly Income: ₹${income.toLocaleString('en-IN')}\nEligible Loan Amount: ₹${eligibility.eligibleAmount.toLocaleString('en-IN')}\nMax EMI: ₹${eligibility.maxAffordableEMI.toLocaleString('en-IN')}\nCheck yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Loan Eligibility Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Estimate your borrowing capacity based on monthly income and current loan obligations.</p>
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
          {/* Gross Monthly Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-sky-500" />
                Gross Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-28 py-1.5 pl-5 pr-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>
            <input 
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹10,000</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* Existing Monthly EMIs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Existing Monthly EMIs
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-28 py-1.5 pl-5 pr-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>
            <input 
              type="range"
              min="0"
              max="500000"
              step="1000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹0</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-500" />
                Rate (p.a)
              </label>
              <input 
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Tenure (Yrs)
              </label>
              <input 
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* FOIR Slider (Advanced setting) */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                FOIR Limit (Interest Ratio)
                <span className="cursor-help" title="Fixed Obligation to Income Ratio determines the percent of income banks assume you can pay for EMI.">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{foir}%</span>
            </div>
            <input 
              type="range"
              min="30"
              max="70"
              step="5"
              value={foir}
              onChange={(e) => setFoir(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-500"
            />
          </div>
        </div>

        {/* Right Side: Results & Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl text-center">
            {eligibility.isEligible ? (
              <div className="mb-4 inline-flex p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full">
                <CheckCircle className="w-8 h-8" />
              </div>
            ) : (
              <div className="mb-4 inline-flex p-3 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
            )}
            
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Eligible Loan Amount
            </h3>
            
            <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2">
              ₹{eligibility.eligibleAmount.toLocaleString('en-IN')}
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
              Based on {foir}% FOIR limit of your income, subtracting existing EMIs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mb-1">Max Affordable EMI</span>
              <span className="text-lg font-extrabold text-sky-950 dark:text-sky-200">
                ₹{eligibility.maxAffordableEMI.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Affordability Status</span>
              <span className={`text-base font-extrabold block ${eligibility.isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {eligibility.isEligible ? 'Good Affordability' : 'Low Eligibility'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
