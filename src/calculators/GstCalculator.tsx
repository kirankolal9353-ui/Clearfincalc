import React, { useState, useMemo } from 'react';
import { calculateGST } from '../utils/finance';
import { Share2, CheckCircle } from 'lucide-react';

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(50000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [shared, setShared] = useState<boolean>(false);

  const gstData = useMemo(() => {
    return calculateGST(amount, rate, type);
  }, [amount, rate, type]);

  const handleShare = () => {
    const text = `ClearFinCalc GST Calculation:\nAmount: ₹${amount.toLocaleString('en-IN')}\nType: GST ${type === 'exclusive' ? 'Exclusive' : 'Inclusive'}\nRate: ${rate}%\nGST Amount: ₹${gstData.gstAmount.toLocaleString('en-IN')}\nNet Value: ₹${gstData.netAmount.toLocaleString('en-IN')}\nCalculate yours at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const gstRates = [5, 12, 18, 28];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">GST Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate Goods and Services Tax (GST) for inclusive or exclusive amounts and view CGST/SGST breakdowns.</p>
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
          {/* Amount input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Amount (₹)
              </label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-28 py-1 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none"
              />
            </div>
            <input 
              type="range"
              min="100"
              max="1000000"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹100</span>
              <span>₹10 Lakhs</span>
            </div>
          </div>

          {/* GST Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              GST Inclusion Type
            </label>
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/30 dark:border-slate-750">
              <button 
                onClick={() => setType('exclusive')}
                className={`py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${type === 'exclusive' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                GST Exclusive (+)
              </button>
              <button 
                onClick={() => setType('inclusive')}
                className={`py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${type === 'inclusive' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                GST Inclusive (-)
              </button>
            </div>
          </div>

          {/* GST Rate Preset Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              GST Rate (%)
            </label>
            <div className="flex flex-wrap gap-2">
              {gstRates.map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl border transition-all ${rate === r ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                >
                  {r}%
                </button>
              ))}
              {/* Custom rate input */}
              <div className="relative inline-flex items-center">
                <input 
                  type="number"
                  placeholder="Custom"
                  value={gstRates.includes(rate) ? '' : rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-24 px-3 py-2 text-xs md:text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none"
                />
                <span className="absolute right-2.5 text-slate-400 text-xs font-bold">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Results & Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 block mb-1">
                {type === 'exclusive' ? 'Original Value' : 'Net Value (Pre-Tax)'}
              </span>
              <span className="text-xl font-extrabold text-sky-950 dark:text-sky-200">
                ₹{gstData.originalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Total GST Amount</span>
              <span className="text-xl font-extrabold text-emerald-950 dark:text-emerald-200">
                ₹{gstData.gstAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>GST Component Breakup</span>
              <span>Amount</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">CGST (Central GST - {rate / 2}%)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">₹{gstData.cgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">SGST (State GST - {rate / 2}%)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">₹{gstData.sgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">IGST (Integrated GST - {rate}%)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">₹{gstData.igst.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-700/50 my-1"></div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-900 dark:text-white">
                {type === 'exclusive' ? 'Gross Amount (Post-Tax)' : 'Gross Amount (Paid)'}
              </span>
              <span className="text-indigo-500">₹{gstData.netAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
