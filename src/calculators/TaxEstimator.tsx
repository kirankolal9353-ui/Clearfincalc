import React, { useState, useMemo } from 'react';
import { calculateTax } from '../utils/finance';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, CheckCircle, Scale, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function TaxEstimator() {
  const [income, setIncome] = useState<number>(1500000);
  const [deductions, setDeductions] = useState<number>(150000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [shared, setShared] = useState<boolean>(false);

  const taxData = useMemo(() => {
    return calculateTax(income, deductions, regime);
  }, [income, deductions, regime]);

  // Compute other regime for comparison
  const otherRegimeData = useMemo(() => {
    const otherRegime = regime === 'new' ? 'old' : 'new';
    // Deductions under new regime are generally capped at standard deduction (₹75k), while old regime has Section 80C etc.
    // For comparison, let's keep the user's deductions input for Old and standard deduction (75000) for New
    const compareDeductions = otherRegime === 'new' ? 75000 : deductions;
    return calculateTax(income, compareDeductions, otherRegime);
  }, [income, deductions, regime]);

  const handleShare = () => {
    const text = `ClearFinCalc Tax Estimator:\nAnnual Income: ₹${income.toLocaleString('en-IN')}\nRegime: ${regime === 'new' ? 'New (FY 2025-26)' : 'Old'}\nTax Liability: ₹${taxData.totalTaxLiability.toLocaleString('en-IN')}\nEffective Rate: ${taxData.effectiveTaxRate}%\nCalculate yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    const reportData = {
      title: 'Income Tax Estimation Report',
      filename: 'income-tax-report.pdf',
      summary: { label: 'Total Tax Payable', value: `₹${taxData.totalTaxLiability.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'Gross Annual Income', value: `₹${income.toLocaleString('en-IN')}` },
        { label: 'Deductions & Exemptions', value: `₹${deductions.toLocaleString('en-IN')}` },
        { label: 'Selected Tax Regime', value: regime === 'new' ? 'New Tax Regime (FY 2025-26)' : 'Old Tax Regime' }
      ],
      results: [
        { label: 'Taxable Net Income', value: `₹${taxData.taxableIncome.toLocaleString('en-IN')}` },
        { label: 'Total Tax Payable', value: `₹${taxData.totalTaxLiability.toLocaleString('en-IN')}` },
        { label: 'Effective Tax Rate', value: `${taxData.effectiveTaxRate}%` }
      ],
      notes: [
        recommendedRegimeText,
        'Disclaimer: Tax calculations are estimates based on standard slabs for FY 2025-26.'
      ]
    };
    generatePDFReport(reportData);
  };

  const chartData = taxData.breakdown.map((b) => ({
    name: b.bracket,
    'Tax (₹)': b.tax,
  }));

  const recommendedRegimeText = useMemo(() => {
    // Current regime liability vs other regime
    const currentTax = taxData.totalTaxLiability;
    const otherTax = otherRegimeData.totalTaxLiability;
    const difference = Math.abs(currentTax - otherTax);
    
    const isNewBetter = regime === 'new' ? currentTax < otherTax : otherTax < currentTax;

    if (difference === 0) {
      return "Both regimes result in the same tax liability.";
    }
    return `The ${isNewBetter ? 'New Tax Regime' : 'Old Tax Regime'} is better for you. It saves you ₹${difference.toLocaleString('en-IN')}!`;
  }, [taxData, otherRegimeData, regime]);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Tax Estimator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Estimate your annual income tax liability and compare Old vs New regimes based on FY 2025-26 rules.</p>
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
        <div className="lg:col-span-5 space-y-6">
          {/* Regime Switcher */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-sky-500" />
              Tax Regime
            </span>
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/30 dark:border-slate-700">
              <button 
                onClick={() => setRegime('new')}
                className={`py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${regime === 'new' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                New Regime (Default)
              </button>
              <button 
                onClick={() => setRegime('old')}
                className={`py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${regime === 'old' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Old Regime
              </button>
            </div>
          </div>

          {/* Gross Annual Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Gross Annual Income
              </label>
              <input 
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="200000"
              max="10000000"
              step="50000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹2 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Deductions / Exemptions
              </label>
              <input 
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={deductions}
              onChange={(e) => setDeductions(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              disabled={regime === 'new'} // standard deduction is hardcoded for new regime in calculations
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹0</span>
              <span>{regime === 'new' ? '₹75,000 (Standard)' : '₹5 Lakhs'}</span>
            </div>
            {regime === 'new' && (
              <p className="text-[10px] text-amber-500 font-medium">
                *New Regime replaces manual deductions with a flat ₹75,000 Standard Deduction.
              </p>
            )}
          </div>
        </div>

        {/* Center: Outputs */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
          <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Taxable Income</span>
            <div className="text-xl md:text-2xl font-black text-sky-950 dark:text-sky-200 mt-1">
              ₹{taxData.taxableIncome.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Total Tax Payable</span>
            <div className="text-xl md:text-2xl font-black text-emerald-950 dark:text-emerald-200 mt-1">
              ₹{taxData.totalTaxLiability.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Effective Tax Rate</span>
            <div className="text-xl md:text-2xl font-black text-indigo-950 dark:text-indigo-200 mt-1">
              {taxData.effectiveTaxRate}%
            </div>
          </div>
        </div>

        {/* Right Side: Recharts Bar Chart */}
        <div className="lg:col-span-4 h-64 flex items-center justify-center">
          {chartData.length > 0 && chartData.some(d => d['Tax (₹)'] > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Bar dataKey="Tax (₹)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              No taxes payable under this income slab!
            </div>
          )}
        </div>
      </div>

      {/* Comparison Panel */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs md:text-sm font-semibold mb-6">
          <Scale className="w-5 h-5 flex-shrink-0 text-emerald-500" />
          <span>{recommendedRegimeText}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Regime Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Active Regime (Selected)</span>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Gross Income</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">₹{taxData.grossIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Taxable Income</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">₹{taxData.taxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Standard + Deductions</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">₹{taxData.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white">
              <span>Total Tax (inc. Cess)</span>
              <span className="text-sky-500">₹{taxData.totalTaxLiability.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 bg-slate-50/50 dark:bg-slate-800/10">
            <span className="text-sm font-bold text-slate-500">Alternative Regime</span>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Gross Income</span>
              <span className="font-semibold">₹{otherRegimeData.grossIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Taxable Income</span>
              <span className="font-semibold">₹{otherRegimeData.taxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Standard + Deductions</span>
              <span className="font-semibold">₹{otherRegimeData.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>Total Tax (inc. Cess)</span>
              <span>₹{otherRegimeData.totalTaxLiability.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
