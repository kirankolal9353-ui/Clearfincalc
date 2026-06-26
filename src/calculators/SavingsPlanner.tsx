import React, { useState, useMemo } from 'react';
import { calculateSavingsGoal } from '../utils/finance';
import { useTrackCalculation } from '../hooks/useTrackCalculation';
import { Share2, Calendar, Percent, CheckCircle, Target, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function SavingsPlanner() {
  const [target, setTarget] = useState<number>(1000000);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(10);
  const [initial, setInitial] = useState<number>(50000);
  const [shared, setShared] = useState<boolean>(false);

  useTrackCalculation('savings-goal', { target, years, rate, initial });

  const goalData = useMemo(() => {
    return calculateSavingsGoal(target, years, rate, initial);
  }, [target, years, rate, initial]);

  const handleShare = () => {
    const text = `ClearFinCalc Savings Planner:\nGoal Target: ₹${target.toLocaleString('en-IN')}\nTimeline: ${years} years\nInitial Savings: ₹${initial.toLocaleString('en-IN')}\nRequired Monthly: ₹${goalData.monthlySavingsRequired.toLocaleString('en-IN')}/mo\nPlan your savings at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    const totalInvested = initial + (goalData.monthlySavingsRequired * years * 12);
    const reportData = {
      title: 'Savings Goal Plan Report',
      filename: 'savings-planner-report.pdf',
      summary: { label: 'Required Monthly Savings', value: `₹${goalData.monthlySavingsRequired.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'Target Savings Goal', value: `₹${target.toLocaleString('en-IN')}` },
        { label: 'Time Horizon', value: `${years} Years` },
        { label: 'Expected Return Rate', value: `${rate}%` },
        { label: 'Initial Savings', value: `₹${initial.toLocaleString('en-IN')}` }
      ],
      results: [
        { label: 'Required Monthly Savings', value: `₹${goalData.monthlySavingsRequired.toLocaleString('en-IN')}` },
        { label: 'Estimated Total Invested (Initial + Monthly)', value: `₹${totalInvested.toLocaleString('en-IN')}` },
        { label: 'Estimated Interest Earned', value: `₹${goalData.totalInterestEarned.toLocaleString('en-IN')}` },
        { label: 'Final Maturity Value (Target)', value: `₹${target.toLocaleString('en-IN')}` }
      ]
    };
    generatePDFReport(reportData);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Savings Goal Planner</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate how much you need to save monthly to achieve your target financial goal.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl text-sm transition-all border border-indigo-200/20 shadow-sm"
          >
            <Download className="w-4 h-4" />
            PDF Report
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-all shadow-sm"
          >
            {shared ? <CheckCircle className="w-4 h-4 text-emerald-500 animate-scale" /> : <Share2 className="w-4 h-4" />}
            {shared ? 'Copied!' : 'Share Result'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-500" />
                Target Savings Goal
              </label>
              <input 
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="50000"
              max="20000000"
              step="50000"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹50,000</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* Initial Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Initial Savings Accumulation
              </label>
              <input 
                type="number"
                value={initial}
                onChange={(e) => setInitial(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="0"
              max={target}
              step="5000"
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹0</span>
              <span>₹{Math.round(target / 100000)} Lakhs</span>
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
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Timeline (Yrs)
              </label>
              <input 
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="p-6 bg-indigo-500 text-white rounded-3xl text-center shadow-lg">
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest block">Required Monthly Investment</span>
            <div className="text-3xl md:text-4xl font-black mt-2">
              ₹{goalData.monthlySavingsRequired.toLocaleString('en-IN')}/mo
            </div>
            <p className="text-[10px] text-indigo-150 mt-2 font-medium">
              Invest monthly to grow from ₹{initial.toLocaleString('en-IN')} to ₹{target.toLocaleString('en-IN')} in {years} years.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mb-1">Target Wealth</span>
              <span className="text-lg font-extrabold text-sky-950 dark:text-sky-200">
                ₹{target.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Est. Returns Earned</span>
              <span className="text-lg font-extrabold text-emerald-950 dark:text-emerald-200">
                ₹{goalData.totalInterestEarned.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
