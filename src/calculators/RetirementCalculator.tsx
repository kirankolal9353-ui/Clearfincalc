import React, { useState, useMemo } from 'react';
import { calculateRetirement } from '../utils/finance';
import { useTrackCalculation } from '../hooks/useTrackCalculation';
import { Share2, CheckCircle, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(500000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [preReturn, setPreReturn] = useState<number>(12);
  const [postReturn, setPostReturn] = useState<number>(8);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [shared, setShared] = useState<boolean>(false);

  useTrackCalculation('retirement', { currentAge, retirementAge, monthlyExpenses, currentSavings, inflationRate, preReturn, postReturn, lifeExpectancy });

  const retirementData = useMemo(() => {
    return calculateRetirement(
      currentAge,
      retirementAge,
      monthlyExpenses,
      currentSavings,
      inflationRate,
      preReturn,
      postReturn,
      lifeExpectancy
    );
  }, [currentAge, retirementAge, monthlyExpenses, currentSavings, inflationRate, preReturn, postReturn, lifeExpectancy]);

  const handleShare = () => {
    const text = `ClearFinCalc Retirement Planning:\nRetirement Corpus Needed: ₹${retirementData.corpusRequired.toLocaleString('en-IN')}\nSuggested Monthly Savings: ₹${retirementData.suggestedMonthlySavings.toLocaleString('en-IN')}/mo\nCalculate your retirement nest egg at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    const reportData = {
      title: 'Retirement Planning Report',
      filename: 'retirement-report.pdf',
      summary: { label: 'Total Retirement Corpus Required', value: `₹${retirementData.corpusRequired.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'Current Age', value: `${currentAge} Years` },
        { label: 'Retirement Age', value: `${retirementAge} Years` },
        { label: 'Life Expectancy', value: `${lifeExpectancy} Years` },
        { label: 'Current Monthly Expenses', value: `₹${monthlyExpenses.toLocaleString('en-IN')}` },
        { label: 'Current Accumulated Savings', value: `₹${currentSavings.toLocaleString('en-IN')}` },
        { label: 'Expected Inflation Rate', value: `${inflationRate}%` },
        { label: 'Expected Pre-Retirement Return', value: `${preReturn}%` },
        { label: 'Expected Post-Retirement Return', value: `${postReturn}%` }
      ],
      results: [
        { label: 'Future Monthly Expenses (Adjusted for Inflation)', value: `₹${retirementData.futureMonthlyExpenses.toLocaleString('en-IN')}` },
        { label: 'Future Value of Current Savings', value: `₹${retirementData.currentSavingsFutureValue.toLocaleString('en-IN')}` },
        { label: 'Total Retirement Corpus Required', value: `₹${retirementData.corpusRequired.toLocaleString('en-IN')}` },
        { label: 'Net Corpus Shortfall (Gap)', value: `₹${retirementData.netCorpusGap.toLocaleString('en-IN')}` },
        { label: 'Suggested Monthly Savings Needed', value: `₹${retirementData.suggestedMonthlySavings.toLocaleString('en-IN')}` }
      ]
    };
    generatePDFReport(reportData);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Retirement Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Find out how much money you need to accumulate for a stress-free retirement adjusted for inflation.</p>
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
        <div className="lg:col-span-6 space-y-5">
          {/* Ages */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Age</label>
              <input 
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full py-1.5 px-2.5 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Retire Age</label>
              <input 
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full py-1.5 px-2.5 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Life Expectancy</label>
              <input 
                type="number"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                className="w-full py-1.5 px-2.5 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Current Monthly Expenses
              </label>
              <input 
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="5000"
              max="500000"
              step="5000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Current Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Current Savings
              </label>
              <input 
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="0"
              max="20000000"
              step="20000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Rates */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Inflation Rate</label>
              <input 
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full py-1.5 px-2 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Working Return</label>
              <input 
                type="number"
                value={preReturn}
                onChange={(e) => setPreReturn(Number(e.target.value))}
                className="w-full py-1.5 px-2 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Retired Return</label>
              <input 
                type="number"
                value={postReturn}
                onChange={(e) => setPostReturn(Number(e.target.value))}
                className="w-full py-1.5 px-2 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Dynamic Calculations */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl text-center">
              <span className="text-[10px] md:text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Inflation-Adjusted Monthly expenses</span>
              <span className="text-base md:text-xl font-extrabold text-rose-950 dark:text-rose-200">
                ₹{retirementData.futureMonthlyExpenses.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-[10px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Total Corpus Required</span>
              <span className="text-base md:text-xl font-extrabold text-emerald-950 dark:text-emerald-200">
                ₹{retirementData.corpusRequired.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Action Plan for Gap</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">Savings Shortfall</span>
                <span className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-200">
                  ₹{retirementData.netCorpusGap.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-indigo-500 text-white p-3 rounded-xl shadow-md">
                <span className="text-[10px] font-bold text-indigo-100 block">Save Monthly (Est.)</span>
                <span className="text-sm md:text-base font-black">
                  ₹{retirementData.suggestedMonthlySavings.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium text-center">
              *Assumes savings grow at {preReturn}% return compound annually during your working years.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
