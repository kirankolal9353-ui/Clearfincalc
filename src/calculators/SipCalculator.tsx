import React, { useState, useMemo } from 'react';
import { calculateSIP } from '../utils/finance';
import { useTrackCalculation } from '../hooks/useTrackCalculation';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Share2, IndianRupee, Calendar, Percent, CheckCircle, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function SipCalculator() {
  const [monthlyInvest, setMonthlyInvest] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(20);
  const [shared, setShared] = useState<boolean>(false);

  useTrackCalculation('sip', { monthlyInvest, expectedReturn, tenure });

  const sipData = useMemo(() => {
    return calculateSIP(monthlyInvest, expectedReturn, tenure);
  }, [monthlyInvest, expectedReturn, tenure]);

  const handleShare = () => {
    const text = `ClearFinCalc SIP Calculation:\nMonthly SIP: ₹${monthlyInvest.toLocaleString('en-IN')}\nDuration: ${tenure} years\nFuture Value: ₹${sipData.totalValue.toLocaleString('en-IN')}\nInvested: ₹${sipData.investedAmount.toLocaleString('en-IN')}\nWealth Gained: ₹${sipData.wealthGained.toLocaleString('en-IN')}\nCalculate yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    const reportData = {
      title: 'SIP Calculation Report',
      filename: 'sip-report.pdf',
      summary: { label: 'Expected Maturity Value', value: `₹${sipData.totalValue.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'Monthly Investment', value: `₹${monthlyInvest.toLocaleString('en-IN')}` },
        { label: 'Expected Return Rate', value: `${expectedReturn}%` },
        { label: 'Investment Tenure', value: `${tenure} Years` }
      ],
      results: [
        { label: 'Invested Amount', value: `₹${sipData.investedAmount.toLocaleString('en-IN')}` },
        { label: 'Est. Returns (Wealth Gained)', value: `₹${sipData.wealthGained.toLocaleString('en-IN')}` },
        { label: 'Total Value (Future Value)', value: `₹${sipData.totalValue.toLocaleString('en-IN')}` }
      ]
    };
    generatePDFReport(reportData);
  };

  // Prepare chart data: { name: 'Yr 1', invested: 120000, value: 130000 }
  const chartData = sipData.breakdown.map((b) => ({
    year: `Yr ${b.year}`,
    'Invested Amount': b.invested,
    'Future Value': b.value,
  }));

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">SIP Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate potential wealth creation through monthly Systematic Investment Plans.</p>
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
          {/* Monthly Investment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-sky-500" />
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                  type="number"
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                  className="w-28 py-1.5 pl-5 pr-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>
            <input 
              type="range"
              min="500"
              max="1000000"
              step="500"
              value={monthlyInvest}
              onChange={(e) => setMonthlyInvest(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹500</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-500" />
                Expected Return (p.a)
              </label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-20 py-1.5 px-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
              </div>
            </div>
            <input 
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1 %</span>
              <span>30 %</span>
            </div>
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Time Period
              </label>
              <div className="relative">
                <input 
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-20 py-1.5 px-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Yrs</span>
              </div>
            </div>
            <input 
              type="range"
              min="1"
              max="40"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1 Yr</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        {/* Center: Outputs */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
          <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Invested Amount</span>
            <div className="text-2xl font-black text-sky-950 dark:text-sky-200 mt-1">
              ₹{sipData.investedAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Est. Wealth Gained</span>
            <div className="text-2xl font-black text-emerald-950 dark:text-emerald-200 mt-1">
              ₹{sipData.wealthGained.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Future Maturity Value</span>
            <div className="text-2xl font-black text-indigo-950 dark:text-indigo-200 mt-1">
              ₹{sipData.totalValue.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Right Side: Recharts Area Chart */}
        <div className="lg:col-span-4 h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={9} 
                tickLine={false} 
                tickFormatter={(value) => {
                  if (value >= 10000000) return `₹${(value/10000000).toFixed(1)}Cr`;
                  if (value >= 100000) return `₹${(value/100000).toFixed(0)}L`;
                  return `₹${value}`;
                }} 
              />
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
              <Area type="monotone" dataKey="Invested Amount" stroke="#0284c7" fillOpacity={1} fill="url(#colorInvested)" />
              <Area type="monotone" dataKey="Future Value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SIP Growth Table */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Annual SIP Projections</h3>
        <div className="overflow-x-auto max-h-72 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold sticky top-0">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Total Invested</th>
                <th className="p-3">Future Value</th>
                <th className="p-3">Wealth Accumulation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {sipData.breakdown.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-semibold">Year {row.year}</td>
                  <td className="p-3">₹{row.invested.toLocaleString('en-IN')}</td>
                  <td className="p-3">₹{row.value.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-emerald-500 font-semibold">+₹{(row.value - row.invested).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
