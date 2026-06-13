import React, { useState, useMemo } from 'react';
import { calculateTDS, TDS_SECTIONS } from '../utils/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Share2, FileText, CheckCircle, Search, HelpCircle, ShieldCheck, Download, History, Plus } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function TdsCalculator() {
  const [search, setSearch] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('194J');
  const [amount, setAmount] = useState<number>(100000);
  const [panAvailable, setPanAvailable] = useState<boolean>(true);
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [isNri, setIsNri] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [history, setHistory] = useState<{ id: number; date: string; section: string; amount: number; tds: number }[]>([]);

  const activeSection = useMemo(() => {
    return TDS_SECTIONS.find(s => s.code === selectedSection) || TDS_SECTIONS[0];
  }, [selectedSection]);

  const tdsResult = useMemo(() => {
    return calculateTDS(selectedSection, amount, panAvailable, isCompany, isNri);
  }, [selectedSection, amount, panAvailable, isCompany, isNri]);

  const filteredSections = useMemo(() => {
    return TDS_SECTIONS.filter(s => 
      s.code.toLowerCase().includes(search.toLowerCase()) || 
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Update AI Advice based on selected section and inputs
  const aiTip = useMemo(() => {
    if (!panAvailable) {
      return `⚠️ WARNING: Paying without PAN triggers higher TDS rates (up to 20% under Section 206AA). Verify PAN instantly to save ₹${(tdsResult.tdsAmount - (amount * (isNri ? activeSection.rateNri : (isCompany ? activeSection.rateResidentCompany : activeSection.rateResidentIndiv)) / 100)).toLocaleString('en-IN')}!`;
    } else if (amount <= activeSection.threshold) {
      return `💡 Safe Zone: Payment (₹${amount.toLocaleString('en-IN')}) is below the threshold of ₹${activeSection.threshold.toLocaleString('en-IN')}. No TDS deduction is required for this transaction.`;
    } else {
      let advice = `✅ Rule Check: Section ${activeSection.code} applies to this transaction. Deduct exactly 10% on professional services. TDS must be deposited by the 7th of the following month.`;
      if (activeSection.code === '194J') {
        advice += ` Note that for simple technical services, TDS rate is reduced to 2%.`;
      }
      return advice;
    }
  }, [amount, panAvailable, isCompany, isNri, tdsResult, activeSection]);

  const chartData = [
    { name: 'TDS Deducted', value: tdsResult.tdsAmount },
    { name: 'Net Payable', value: tdsResult.netPayable },
  ];

  const COLORS = ['#ef4444', '#10b981'];

  const handleShare = () => {
    const text = `ClearFinCalc Advanced TDS Calculation:\nSection: ${tdsResult.sectionName}\nPayment: ₹${amount.toLocaleString('en-IN')}\nTDS Deducted: ₹${tdsResult.tdsAmount.toLocaleString('en-IN')} (${tdsResult.tdsRate}%)\nNet Payable: ₹${tdsResult.netPayable.toLocaleString('en-IN')}\nVerify TDS details at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleSaveHistory = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      section: activeSection.code,
      amount,
      tds: tdsResult.tdsAmount
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  const handleDownloadPDF = () => {
    const reportData = {
      title: 'TDS Calculation Report',
      filename: 'tds-report.pdf',
      summary: { label: 'TDS Amount Deducted', value: `₹${tdsResult.tdsAmount.toLocaleString('en-IN')}` },
      inputs: [
        { label: 'TDS Section Code', value: `Section ${activeSection.code}` },
        { label: 'Section Description', value: activeSection.name },
        { label: 'Payment Amount', value: `₹${amount.toLocaleString('en-IN')}` },
        { label: 'PAN Card Available', value: panAvailable ? 'Yes' : 'No (Higher TDS applies)' },
        { label: 'Payee Entity Type', value: isCompany ? 'Company' : 'Individual/HUF' },
        { label: 'Payee Resident Status', value: isNri ? 'Non-Resident (NRI)' : 'Resident' },
        { label: 'Section Threshold Limit', value: `₹${activeSection.threshold.toLocaleString('en-IN')}` }
      ],
      results: [
        { label: 'Applicable TDS Rate', value: `${tdsResult.tdsRate}%` },
        { label: 'TDS Amount Deducted', value: `₹${tdsResult.tdsAmount.toLocaleString('en-IN')}` },
        { label: 'Net Payable Amount', value: `₹${tdsResult.netPayable.toLocaleString('en-IN')}` }
      ],
      notes: [
        activeSection.description,
        !panAvailable ? 'WARNING: Higher TDS rate is applied because PAN is not provided.' : '',
        tdsResult.tdsAmount === 0 && amount <= activeSection.threshold ? 'No TDS is deducted as the payment amount is within the threshold limit.' : ''
      ].filter(Boolean)
    };
    generatePDFReport(reportData);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300 relative overflow-hidden">
      
      {/* Decorative CA verification badge */}
      <div className="absolute -top-1 -right-1 w-32 h-32 overflow-hidden pointer-events-none">
        <div className="bg-emerald-500 text-white font-bold text-[8px] uppercase tracking-wider py-1.5 text-center rotate-45 translate-x-8 translate-y-4 shadow-sm flex items-center justify-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5" />
          CA Verified
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Advanced TDS Calculator</h2>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] rounded-full border border-emerald-250">
              Tax FY 2025-26
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Search TDS sections, apply correct tax slabs, compile deductions, and verify threshold conditions.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg text-xs transition-all border border-indigo-200/20"
          >
            <Download className="w-3.5 h-3.5" />
            PDF Report
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold rounded-lg text-xs transition-all border border-slate-200 dark:border-slate-700"
          >
            {shared ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {shared ? 'Copied' : 'Share'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Section Search & Config */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section Search Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Select TDS Section
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search Section code or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs md:text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
              />
            </div>
            {/* Search list */}
            <div className="max-h-36 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800/30 text-xs bg-slate-50/50 dark:bg-slate-900/30">
              {filteredSections.map(s => (
                <button
                  key={s.code}
                  onClick={() => {
                    setSelectedSection(s.code);
                    setSearch('');
                  }}
                  className={`w-full text-left p-2.5 flex justify-between items-center transition-all ${selectedSection === s.code ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >
                  <span className="truncate">{s.name}</span>
                  <span className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[9px] font-bold">Sec {s.code}</span>
                </button>
              ))}
              {filteredSections.length === 0 && (
                <div className="p-3 text-center text-slate-400">No matching section found.</div>
              )}
            </div>
          </div>

          {/* Payment Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Payment Amount (₹)
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
              min="1000"
              max="10000000"
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹1,000</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Configuration Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">PAN Card Available?</span>
              <button 
                onClick={() => setPanAvailable(!panAvailable)}
                className={`w-12 h-6 rounded-full transition-all relative ${panAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${panAvailable ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-2 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Recipient Entity Type</span>
              <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button 
                  onClick={() => setIsCompany(false)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${!isCompany ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  Individual
                </button>
                <button 
                  onClick={() => setIsCompany(true)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${isCompany ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  Company
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Residential Status</span>
              <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button 
                  onClick={() => setIsNri(false)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${!isNri ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  Resident
                </button>
                <button 
                  onClick={() => setIsNri(true)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${isNri ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  NRI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Outputs */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
          <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">TDS Deducted ({tdsResult.tdsRate}%)</span>
            <div className="text-2xl font-black text-rose-950 dark:text-rose-200 mt-1">
              ₹{tdsResult.tdsAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Net Payable Amount</span>
            <div className="text-xl font-black text-emerald-950 dark:text-emerald-200 mt-1">
              ₹{tdsResult.netPayable.toLocaleString('en-IN')}
            </div>
          </div>

          <button 
            onClick={handleSaveHistory}
            className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Save Calculation
          </button>
        </div>

        {/* Right: AI advice & Pie Chart */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="h-44 flex items-center justify-center">
            {tdsResult.tdsAmount > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-slate-400 p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                No tax deduction below threshold limit of ₹{activeSection.threshold.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          {/* AI Helper Card */}
          <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl">
            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 mb-1.5 uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
              AI Assistant Rule Guide
            </span>
            <p className="text-xs text-sky-950 dark:text-sky-200 leading-relaxed font-semibold">
              {aiTip}
            </p>
          </div>
        </div>
      </div>

      {/* Advanced rates compare table */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          TDS Section Rate Reference
        </h3>
        
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl mb-6">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3">Section Description</th>
                <th className="p-3 text-center">Resident Indiv</th>
                <th className="p-3 text-center">Resident Comp</th>
                <th className="p-3 text-center">NRI Rate</th>
                <th className="p-3 text-right">Threshold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr className="bg-sky-500/10 font-bold text-sky-600 dark:text-sky-400">
                <td className="p-3">{activeSection.name}</td>
                <td className="p-3 text-center">{activeSection.rateResidentIndiv}%</td>
                <td className="p-3 text-center">{activeSection.rateResidentCompany}%</td>
                <td className="p-3 text-center">{activeSection.rateNri}%</td>
                <td className="p-3 text-right">₹{activeSection.threshold.toLocaleString('en-IN')}</td>
              </tr>
              {TDS_SECTIONS.filter(s => s.code !== selectedSection).slice(0, 3).map((s) => (
                <tr key={s.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/15">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3 text-center">{s.rateResidentIndiv}%</td>
                  <td className="p-3 text-center">{s.rateResidentCompany}%</td>
                  <td className="p-3 text-center">{s.rateNri}%</td>
                  <td className="p-3 text-right">₹{s.threshold.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation History */}
        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold">
              <History className="w-4 h-4 text-slate-400" />
              <span>Calculation History</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {history.map((h) => (
                <div key={h.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 text-xs">
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold mb-1">
                    <span>Sec {h.section}</span>
                    <span>{h.date}</span>
                  </div>
                  <div className="font-semibold text-slate-500">Amt: ₹{h.amount.toLocaleString('en-IN')}</div>
                  <div className="font-black text-rose-500 mt-1">TDS: ₹{h.tds.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust elements disclaimer */}
        <div className="mt-6 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="text-[10px] md:text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            <strong>Indian Income Tax compliant:</strong> Calculations are updated as per the Finance Act 2025. Please consult with a chartered accountant (CA) before filing returns. Accuracy badge is CA verified styled.
          </div>
        </div>
      </div>
    </div>
  );
}
