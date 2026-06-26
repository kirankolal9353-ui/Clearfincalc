import React, { useState, useMemo } from 'react';
import { calculateImportDuty, calculateExportDuty } from '../utils/finance';
import { useTrackCalculation } from '../hooks/useTrackCalculation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Share2, FileText, CheckCircle, ShieldCheck, ArrowRight, Table, Globe, Download } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';

export default function CustomsDuty() {
  const [tab, setTab] = useState<'import' | 'export'>('import');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  const [shared, setShared] = useState<boolean>(false);

  // Import Inputs
  const [hsCode, setHsCode] = useState<string>('8471.30.10');
  const [originCountry, setOriginCountry] = useState<string>('China');
  const [cifValue, setCifValue] = useState<number>(500000);
  const [freight, setFreight] = useState<number>(35000);
  const [insurance, setInsurance] = useState<number>(5000);
  const [bcdRate, setBcdRate] = useState<number>(7.5);
  const [igstRate, setIgstRate] = useState<number>(18);
  const antiDumping = 0;
  const safeguard = 0;
  
  // Export Inputs
  const [exportValue, setExportValue] = useState<number>(400000);
  const [exportDest, setExportDest] = useState<string>('USA');
  const exportFreight = 25000;
  const exportInsurance = 3000;
  const [exportDutyRate, setExportDutyRate] = useState<number>(10);
  const [exportTaxRate, setExportTaxRate] = useState<number>(2);
  const [incentiveRate, setIncentiveRate] = useState<number>(3); // RoDTEP incentive
  const [costOfProduction, setCostOfProduction] = useState<number>(280000);

  // Track calculations (Atomic and debounced)
  useTrackCalculation('customs', { tab, cifValue, freight, insurance, bcdRate, igstRate, exportValue, exportDutyRate, exportTaxRate });

  // Calculations
  const importResult = useMemo(() => {
    return calculateImportDuty(cifValue, freight, insurance, bcdRate, igstRate, 10, antiDumping, safeguard, 0);
  }, [cifValue, freight, insurance, bcdRate, igstRate, antiDumping, safeguard]);

  const exportResult = useMemo(() => {
    return calculateExportDuty(exportValue, exportFreight, exportInsurance, exportDutyRate, exportTaxRate, incentiveRate, costOfProduction);
  }, [exportValue, exportFreight, exportInsurance, exportDutyRate, exportTaxRate, incentiveRate, costOfProduction]);

  const currencySymbol = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : '€');

  // HS Code auto-fill rates
  const handleHsCodeSelect = (code: string, rate: number) => {
    setHsCode(code);
    setBcdRate(rate);
  };

  const hsCodePresets = [
    { code: '8471.30.10', rate: 7.5, label: 'Laptops & Computers' },
    { code: '8517.13.00', rate: 20.0, label: 'Smartphones / Mobile Devices' },
    { code: '9018.90.99', rate: 2.5, label: 'Medical Instruments' },
    { code: '8703.23.91', rate: 100.0, label: 'Motor Vehicles / Cars' },
  ];

  const handleShare = () => {
    const text = `ClearFinCalc Customs Duty Calculation:\nType: ${tab.toUpperCase()}\nValue: ${currencySymbol}${tab === 'import' ? importResult.landedCost.toLocaleString('en-IN') : exportResult.netRevenue.toLocaleString('en-IN')}\nVerify global trade compliance at ClearFinCalc!`;
    navigator.clipboard.writeText(text);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (tab === 'import') {
      const reportData = {
        title: 'Customs Import Duty Report',
        filename: 'customs-import-report.pdf',
        summary: { label: 'Total Landed Cost', value: `${currencySymbol}${importResult.landedCost.toLocaleString('en-IN')}` },
        inputs: [
          { label: 'HS Code', value: hsCode },
          { label: 'Origin Country', value: originCountry },
          { label: 'CIF Value', value: `${currencySymbol}${cifValue.toLocaleString('en-IN')}` },
          { label: 'Freight Cost', value: `${currencySymbol}${freight.toLocaleString('en-IN')}` },
          { label: 'Insurance Cost', value: `${currencySymbol}${insurance.toLocaleString('en-IN')}` },
          { label: 'Basic Customs Duty (BCD) Rate', value: `${bcdRate}%` },
          { label: 'IGST Rate', value: `${igstRate}%` }
        ],
        results: [
          { label: 'Assessable Value', value: `${currencySymbol}${importResult.assessableValue.toLocaleString('en-IN')}` },
          { label: 'Basic Customs Duty (BCD) Amount', value: `${currencySymbol}${importResult.bcdAmount.toLocaleString('en-IN')}` },
          { label: 'Social Welfare Surcharge (SWS)', value: `${currencySymbol}${importResult.swsAmount.toLocaleString('en-IN')}` },
          { label: 'IGST Amount', value: `${currencySymbol}${importResult.igstAmount.toLocaleString('en-IN')}` },
          { label: 'Total Duties & Taxes', value: `${currencySymbol}${importResult.totalDuties.toLocaleString('en-IN')}` },
          { label: 'Landed Cost (Total Cost)', value: `${currencySymbol}${importResult.landedCost.toLocaleString('en-IN')}` }
        ]
      };
      generatePDFReport(reportData);
    } else {
      const reportData = {
        title: 'Customs Export Duty Report',
        filename: 'customs-export-report.pdf',
        summary: { label: 'Net Export Revenue', value: `${currencySymbol}${exportResult.netRevenue.toLocaleString('en-IN')}` },
        inputs: [
          { label: 'Destination Country', value: exportDest },
          { label: 'FOB Value (Export Value)', value: `${currencySymbol}${exportValue.toLocaleString('en-IN')}` },
          { label: 'Freight Cost', value: `${currencySymbol}${exportFreight.toLocaleString('en-IN')}` },
          { label: 'Insurance Cost', value: `${currencySymbol}${exportInsurance.toLocaleString('en-IN')}` },
          { label: 'Export Duty Rate', value: `${exportDutyRate}%` },
          { label: 'Other Export Taxes', value: `${exportTaxRate}%` },
          { label: 'Government Incentives Rate (RoDTEP)', value: `${incentiveRate}%` },
          { label: 'Cost of Production', value: `${currencySymbol}${costOfProduction.toLocaleString('en-IN')}` }
        ],
        results: [
          { label: 'Export Duty Amount', value: `${currencySymbol}${exportResult.exportDuty.toLocaleString('en-IN')}` },
          { label: 'Other Export Taxes Amount', value: `${currencySymbol}${exportResult.exportTax.toLocaleString('en-IN')}` },
          { label: 'Incentive Claimable (RoDTEP)', value: `${currencySymbol}${exportResult.incentivesEarned.toLocaleString('en-IN')}` },
          { label: 'Gross Export Revenue (FOB)', value: `${currencySymbol}${exportResult.fobValue.toLocaleString('en-IN')}` },
          { label: 'Net Export Revenue (Revenue - Duties + Incentives)', value: `${currencySymbol}${exportResult.netRevenue.toLocaleString('en-IN')}` },
          { label: 'Net Profit Margin Amount', value: `${currencySymbol}${(exportResult.netRevenue - costOfProduction).toLocaleString('en-IN')}` }
        ]
      };
      generatePDFReport(reportData);
    }
  };

  const chartData = [
    { name: 'Assessable Value', value: importResult.assessableValue },
    { name: 'Customs Duties (BCD+SWS)', value: importResult.bcdAmount + importResult.swsAmount },
    { name: 'IGST Amount', value: importResult.igstAmount },
  ];
  const COLORS = ['#0ea5e9', '#f59e0b', '#10b981'];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-xl transition-all duration-300">
      
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Advanced Import & Export Duty Calculator</h2>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold text-[10px] rounded-full border border-blue-250">
              Customs FY 2026
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Calculate customs duty, taxes, landed costs, export margins, and search HS codes instantly.</p>
        </div>
        
        <div className="flex gap-2">
          {/* Currency Switcher */}
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD' | 'EUR')}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold focus:outline-none"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl text-xs transition-all border border-indigo-200/20 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            PDF Report
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs transition-all border border-slate-200 dark:border-slate-700"
          >
            {shared ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {shared ? 'Copied' : 'Share'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/30 dark:border-slate-750 mb-8 max-w-sm">
        <button 
          onClick={() => setTab('import')}
          className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all ${tab === 'import' ? 'bg-white dark:bg-slate-900 text-blue-500 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-750'}`}
        >
          Import Duty Calculator
        </button>
        <button 
          onClick={() => setTab('export')}
          className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all ${tab === 'export' ? 'bg-white dark:bg-slate-900 text-blue-500 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-750'}`}
        >
          Export Duty & Profit
        </button>
      </div>

      {tab === 'import' ? (
        // IMPORT CALCULATOR VIEW
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* HS Preset Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quick HS Class presets</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {hsCodePresets.map((preset) => (
                    <button
                      key={preset.code}
                      onClick={() => handleHsCodeSelect(preset.code, preset.rate)}
                      className={`p-2 text-[10px] font-bold rounded-xl border text-center transition-all truncate ${hsCode === preset.code ? 'bg-blue-500 border-blue-500 text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* General details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product HS Code</label>
                  <input 
                    type="text"
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    className="w-full py-1.5 px-3 font-bold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Country of Origin</label>
                  <select 
                    value={originCountry} 
                    onChange={(e) => setOriginCountry(e.target.value)}
                    className="w-full py-1.5 px-2 font-bold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  >
                    <option value="China">China</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>
              </div>

              {/* CIF Cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product CIF Value ({currencySymbol})</label>
                  <input 
                    type="number"
                    value={cifValue}
                    onChange={(e) => setCifValue(Number(e.target.value))}
                    className="w-24 py-0.5 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <input 
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={cifValue}
                  onChange={(e) => setCifValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Freight and Insurance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Freight Cost ({currencySymbol})</label>
                  <input 
                    type="number"
                    value={freight}
                    onChange={(e) => setFreight(Number(e.target.value))}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Insurance ({currencySymbol})</label>
                  <input 
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Duty rates configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">BCD Rate (%)</label>
                  <input 
                    type="number"
                    value={bcdRate}
                    onChange={(e) => setBcdRate(Number(e.target.value))}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">IGST Rate (%)</label>
                  <input 
                    type="number"
                    value={igstRate}
                    onChange={(e) => setIgstRate(Number(e.target.value))}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Outcomes & Recharts */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 block mb-1 uppercase">Assessable Value</span>
                  <span className="text-lg font-extrabold text-sky-950 dark:text-sky-200">
                    {currencySymbol}{importResult.assessableValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block mb-1 uppercase">Total Duty + Surcharges</span>
                  <span className="text-lg font-extrabold text-rose-950 dark:text-rose-200">
                    {currencySymbol}{importResult.totalDuties.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Core Outcomes */}
              <div className="p-5 bg-indigo-500 text-white rounded-3xl text-center shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-4 -translate-y-4">
                  <Globe className="w-48 h-48" />
                </div>
                <span className="text-xs font-bold text-indigo-150 uppercase tracking-widest block">Total Landed Import Cost</span>
                <div className="text-3xl font-black mt-2">
                  {currencySymbol}{importResult.landedCost.toLocaleString('en-IN')}
                </div>
                <p className="text-[10px] text-indigo-200 mt-2 font-semibold">
                  Effective customs duty rate: <span className="underline">{importResult.effectiveDutyPercent}%</span>
                </p>
              </div>

              <div className="h-40 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${currencySymbol}${Number(value).toLocaleString('en-IN')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Flowchart Breakdown */}
          <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Step-by-Step Customs Flowchart
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl relative">
                <span className="text-[8px] font-bold text-slate-400 block mb-1">STEP 1</span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350 block truncate">Assessable Value</span>
                <span className="text-xs font-black text-slate-800 dark:text-white mt-1 block">
                  {currencySymbol}{importResult.assessableValue.toLocaleString('en-IN')}
                </span>
                <ArrowRight className="hidden md:block w-4 h-4 absolute top-1/2 -right-2 -translate-y-1/2 text-slate-300" />
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl relative">
                <span className="text-[8px] font-bold text-slate-400 block mb-1">STEP 2</span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350 block truncate">Basic Customs Duty ({bcdRate}%)</span>
                <span className="text-xs font-black text-slate-800 dark:text-white mt-1 block">
                  {currencySymbol}{importResult.bcdAmount.toLocaleString('en-IN')}
                </span>
                <ArrowRight className="hidden md:block w-4 h-4 absolute top-1/2 -right-2 -translate-y-1/2 text-slate-300" />
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl relative">
                <span className="text-[8px] font-bold text-slate-400 block mb-1">STEP 3</span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350 block truncate">Welfare Surcharge (10%)</span>
                <span className="text-xs font-black text-slate-800 dark:text-white mt-1 block">
                  {currencySymbol}{importResult.swsAmount.toLocaleString('en-IN')}
                </span>
                <ArrowRight className="hidden md:block w-4 h-4 absolute top-1/2 -right-2 -translate-y-1/2 text-slate-300" />
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl relative">
                <span className="text-[8px] font-bold text-slate-400 block mb-1">STEP 4</span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-350 block truncate">IGST Calculation ({igstRate}%)</span>
                <span className="text-xs font-black text-slate-800 dark:text-white mt-1 block">
                  {currencySymbol}{importResult.igstAmount.toLocaleString('en-IN')}
                </span>
                <ArrowRight className="hidden md:block w-4 h-4 absolute top-1/2 -right-2 -translate-y-1/2 text-slate-300" />
              </div>

              <div className="p-3 border border-indigo-200 bg-indigo-500/10 dark:bg-indigo-950/20 rounded-xl">
                <span className="text-[8px] font-bold text-indigo-400 block mb-1">STEP 5</span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block truncate">Landed Cost</span>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-300 mt-1 block">
                  {currencySymbol}{importResult.landedCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // EXPORT CALCULATOR VIEW
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Export inputs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Destination Country</label>
                  <input 
                    type="text"
                    value={exportDest}
                    onChange={(e) => setExportDest(e.target.value)}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Production Cost ({currencySymbol})</label>
                  <input 
                    type="number"
                    value={costOfProduction}
                    onChange={(e) => setCostOfProduction(Number(e.target.value))}
                    className="w-full py-1.5 px-3 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Export Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product Export FOB Value ({currencySymbol})</label>
                  <input 
                    type="number"
                    value={exportValue}
                    onChange={(e) => setExportValue(Number(e.target.value))}
                    className="w-24 py-0.5 px-2 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none"
                  />
                </div>
                <input 
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={exportValue}
                  onChange={(e) => setExportValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Rates */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Export Duty (%)</label>
                  <input 
                    type="number"
                    value={exportDutyRate}
                    onChange={(e) => setExportDutyRate(Number(e.target.value))}
                    className="w-full py-1.5 px-2 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Tax Rate (%)</label>
                  <input 
                    type="number"
                    value={exportTaxRate}
                    onChange={(e) => setExportTaxRate(Number(e.target.value))}
                    className="w-full py-1.5 px-2 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500">Incentives (%)</label>
                  <input 
                    type="number"
                    value={incentiveRate}
                    onChange={(e) => setIncentiveRate(Number(e.target.value))}
                    className="w-full py-1.5 px-2 font-semibold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-center"
                  />
                </div>
              </div>
            </div>

            {/* Right: Export results */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1 uppercase">Net Export Revenue</span>
                  <span className="text-lg font-extrabold text-emerald-950 dark:text-emerald-200">
                    {currencySymbol}{exportResult.netRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 block mb-1 uppercase">Govt. Incentives Earned</span>
                  <span className="text-lg font-extrabold text-sky-950 dark:text-sky-200">
                    {currencySymbol}{exportResult.incentivesEarned.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Export Financial Breakdown</span>
                  <span>Amount</span>
                </div>
                <div className="border-t border-slate-200/30 dark:border-slate-700/30 my-1"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross FOB Value</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{currencySymbol}{exportResult.fobValue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Export Duty Paid ({exportDutyRate}%)</span>
                  <span className="font-semibold text-rose-500">-{currencySymbol}{exportResult.exportDuty.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Other Export Taxes ({exportTaxRate}%)</span>
                  <span className="font-semibold text-rose-500">-{currencySymbol}{exportResult.exportTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-slate-200/30 dark:border-slate-700/30 my-1"></div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-900 dark:text-white">Estimated Profit Margin</span>
                  <span className="text-emerald-500">{exportResult.profitMargin}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global country rates comparison */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
          <Table className="w-5 h-5 text-amber-500" />
          Country-wise Trade & GST Comparison
        </h3>
        
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3">Country / Region</th>
                <th className="p-3 text-center">Avg. Import Duty</th>
                <th className="p-3 text-center">Export Taxes</th>
                <th className="p-3 text-center">VAT/GST Rate</th>
                <th className="p-3 text-right">FTA Exemption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                <td className="p-3 font-semibold">India</td>
                <td className="p-3 text-center">12.5%</td>
                <td className="p-3 text-center">0% - 15%</td>
                <td className="p-3 text-center">18% (GST)</td>
                <td className="p-3 text-right text-emerald-500 font-semibold">SAFTA, ASEAN</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                <td className="p-3 font-semibold">USA</td>
                <td className="p-3 text-center">3.5%</td>
                <td className="p-3 text-center">0%</td>
                <td className="p-3 text-center">0% - 10% (Sales Tax)</td>
                <td className="p-3 text-right text-emerald-500 font-semibold">USMCA, CAFTA</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                <td className="p-3 font-semibold">UAE</td>
                <td className="p-3 text-center">5.0%</td>
                <td className="p-3 text-center">0%</td>
                <td className="p-3 text-center">5% (VAT)</td>
                <td className="p-3 text-right text-emerald-500 font-semibold">GCC Trade Agreement</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                <td className="p-3 font-semibold">Singapore</td>
                <td className="p-3 text-center">0% (except tobacco/alcohol)</td>
                <td className="p-3 text-center">0%</td>
                <td className="p-3 text-center">9% (GST)</td>
                <td className="p-3 text-right text-emerald-500 font-semibold">CPTPP, RCEP</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer / Compliances */}
        <div className="mt-6 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="text-[10px] md:text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            <strong>Customs Compliance Badge:</strong> Computations match standard WCO (World Customs Organization) rules. Subject to regional surcharges and anti-dumping modifications.
          </div>
        </div>
      </div>
    </div>
  );
}
