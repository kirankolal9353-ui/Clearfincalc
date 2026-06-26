import React, { useState, useMemo } from 'react';
import { calculateSalary } from '../utils/finance';
import { useTrackCalculation } from '../hooks/useTrackCalculation';
import { Share2, IndianRupee, CheckCircle, Percent, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function SalaryCalculator() {
  const [grossMonthly, setGrossMonthly] = useState<number>(100000);
  const [pfRate, setPfRate] = useState<number>(12);
  const [pt, setPt] = useState<number>(200);
  const [shared, setShared] = useState<boolean>(false);

  useTrackCalculation('salary', { grossMonthly, pfRate, pt });

  const salaryData = useMemo(() => {
    return calculateSalary(grossMonthly, pfRate, pt);
  }, [grossMonthly, pfRate, pt]);

  const handleShare = () => {
    const text = `ClearFinCalc Salary Breakdown:\nGross Monthly: ₹${grossMonthly.toLocaleString('en-IN')}\nTake Home Monthly: ₹${salaryData.takeHomeMonthly.toLocaleString('en-IN')}\nPF Deduction: ₹${salaryData.providentFund.toLocaleString('en-IN')}\nYearly Take Home: ₹${salaryData.takeHomeYearly.toLocaleString('en-IN')}\nEstimate yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    const totalDeductionsVal = salaryData.providentFund + salaryData.professionalTax + salaryData.tdsDeduction;
    const reportData = {
      title: 'Salary Breakdown Report',
      filename: 'salary-report.pdf',
      summary: { label: 'Monthly Take-Home Salary (Net)', value: `₹${salaryData.takeHomeMonthly.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'Gross Monthly Salary', value: `₹${grossMonthly.toLocaleString('en-IN')}` },
        { label: 'EPF Deduction Rate', value: `${pfRate}%` },
        { label: 'Professional Tax (PT)', value: `₹${pt.toLocaleString('en-IN')}` }
      ],
      results: [
        { label: 'Provident Fund (EPF) Deduction', value: `₹${salaryData.providentFund.toLocaleString('en-IN')}` },
        { label: 'Professional Tax (PT) Deduction', value: `₹${salaryData.professionalTax.toLocaleString('en-IN')}` },
        { label: 'Total Monthly Deductions', value: `₹${totalDeductionsVal.toLocaleString('en-IN')}` },
        { label: 'Monthly Take-Home Salary (Net)', value: `₹${salaryData.takeHomeMonthly.toLocaleString('en-IN')}` },
        { label: 'Annual Gross Salary', value: `₹${(grossMonthly * 12).toLocaleString('en-IN')}` },
        { label: 'Annual Take-Home Salary (Net)', value: `₹${salaryData.takeHomeYearly.toLocaleString('en-IN')}` }
      ]
    };
    generatePDFReport(reportData);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Salary Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Estimate your monthly net take-home salary after PF, Professional Tax, and TDS deductions.</p>
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
          {/* Gross Monthly Salary */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Gross Monthly Salary
              </label>
              <input 
                type="number"
                value={grossMonthly}
                onChange={(e) => setGrossMonthly(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={grossMonthly}
              onChange={(e) => setGrossMonthly(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹10,000</span>
              <span>₹5 Lakhs/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* PF Rate */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-500" />
                Employee EPF Rate
              </label>
              <input 
                type="number"
                value={pfRate}
                onChange={(e) => setPfRate(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>

            {/* PT Rate */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-indigo-500" />
                Professional Tax
              </label>
              <input 
                type="number"
                value={pt}
                onChange={(e) => setPt(Number(e.target.value))}
                className="w-full py-2 px-3 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Disbursal details */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mb-1">Monthly Take-Home</span>
              <span className="text-xl font-extrabold text-sky-950 dark:text-sky-200">
                ₹{salaryData.takeHomeMonthly.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Yearly Net take-home</span>
              <span className="text-xl font-extrabold text-emerald-950 dark:text-emerald-200">
                ₹{salaryData.takeHomeYearly.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>Salary Breakup</span>
              <span>Amount</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Gross Monthly Salary</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">₹{grossMonthly.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">EPF Contribution</span>
              <span className="font-semibold text-rose-500">-₹{salaryData.providentFund.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Professional Tax</span>
              <span className="font-semibold text-rose-500">-₹{salaryData.professionalTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">TDS Deduction (Est.)</span>
              <span className="font-semibold text-rose-500">-₹{salaryData.tdsDeduction.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Net Take-Home Salary</span>
              <span className="text-emerald-500">₹{salaryData.takeHomeMonthly.toLocaleString('en-IN')}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
