import React, { useState, useMemo } from 'react';
import { calculateEMI } from '../utils/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Share2, IndianRupee, Calendar, Percent, CheckCircle } from 'lucide-react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(15);
  const [shared, setShared] = useState<boolean>(false);

  const emiData = useMemo(() => {
    return calculateEMI(amount, rate, tenure);
  }, [amount, rate, tenure]);

  const chartData = [
    { name: 'Principal Amount', value: amount },
    { name: 'Total Interest', value: emiData.totalInterest },
  ];

  const COLORS = ['#0284c7', '#10b981'];

  const handleShare = () => {
    const text = `ClearFinCalc EMI Calculation:\nLoan Amount: ₹${amount.toLocaleString('en-IN')}\nEMI: ₹${emiData.monthlyPayment.toLocaleString('en-IN')}/mo\nTotal Interest: ₹${emiData.totalInterest.toLocaleString('en-IN')}\nCalculate more at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">EMI Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate monthly repayments, interest burdens, and view amortization schedules.</p>
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
        <div className="lg:col-span-5 space-y-6">
          {/* Amount input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-sky-500" />
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-32 py-1.5 pl-5 pr-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>
            <input 
              type="range"
              min="100000"
              max="100000000"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹1 Lakh</span>
              <span>₹10 Cr</span>
            </div>
          </div>

          {/* Rate input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-500" />
                Interest Rate
              </label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-24 py-1.5 px-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
              </div>
            </div>
            <input 
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1 %</span>
              <span>30 %</span>
            </div>
          </div>

          {/* Tenure input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-500" />
                Loan Tenure
              </label>
              <div className="relative">
                <input 
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-24 py-1.5 px-2.5 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Monthly EMI</span>
            <div className="text-2xl md:text-3xl font-black text-sky-950 dark:text-sky-200 mt-1">
              ₹{emiData.monthlyPayment.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Interest Payable</span>
            <div className="text-xl md:text-2xl font-black text-emerald-950 dark:text-emerald-200 mt-1">
              ₹{emiData.totalInterest.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Total Payment (P + I)</span>
            <div className="text-xl md:text-2xl font-black text-indigo-950 dark:text-indigo-200 mt-1">
              ₹{emiData.totalPayment.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Right Side: Recharts Pie Chart */}
        <div className="lg:col-span-4 h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Annual Breakup Schedule</h3>
        <div className="overflow-x-auto max-h-72 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold sticky top-0">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Principal Paid</th>
                <th className="p-3">Interest Paid</th>
                <th className="p-3">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {emiData.amortization.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-semibold">Year {row.year}</td>
                  <td className="p-3">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                  <td className="p-3">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                  <td className="p-3">₹{row.remainingBalance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
