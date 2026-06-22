import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import CalculatorContainer from './components/CalculatorContainer';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Insights from './components/Insights';
import Offers from './components/Offers';
import Footer from './components/Footer';
import AIAdvisor from './components/AIAdvisor';

// Extra Utilities
import { calculateInflation, calculateNetWorth } from './utils/finance';
import { IndianRupee, Landmark, Globe, Activity, RefreshCw } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTool, setActiveTool] = useState<string | null>(null); // Default to home page (no open tool)
  const [utilityTab, setUtilityTab] = useState<'currency' | 'inflation' | 'networth' | 'budget'>('currency');

  // Read URL query parameters on load for direct deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get('tool');
    if (tool) {
      setActiveTool(tool);
    }
  }, []);

  const handleSelectTool = (id: string) => {
    setActiveTool(id);
    const newUrl = `${window.location.origin}${window.location.pathname}?tool=${id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleCloseTool = () => {
    setActiveTool(null);
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Toggle dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Currency Converter State — Live Rates
  const [fromCurrency, setFromCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [liveRates, setLiveRates] = useState({ USD: 83.45, EUR: 90.12, GBP: 105.54 });
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<Date | null>(null);
  const [ratesFetchError, setRatesFetchError] = useState(false);
  const convertedAmount = currencyAmount * liveRates[fromCurrency];

  const fetchLiveRates = async () => {
    setRatesLoading(true);
    setRatesFetchError(false);
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setLiveRates({
        USD: parseFloat((1 / data.rates.USD).toFixed(2)),
        EUR: parseFloat((1 / data.rates.EUR).toFixed(2)),
        GBP: parseFloat((1 / data.rates.GBP).toFixed(2)),
      });
      setRatesLastUpdated(new Date());
    } catch {
      setRatesFetchError(true);
    } finally {
      setRatesLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 5 * 60 * 1000); // auto-refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  // Inflation Calculator State
  const [infAmount, setInfAmount] = useState<number>(10000);
  const [infYears, setInfYears] = useState<number>(10);
  const [infRate, setInfRate] = useState<number>(6);
  const [infDirection, setInfDirection] = useState<'future' | 'past'>('future');
  const inflationResult = calculateInflation(infAmount, infYears, infRate, infDirection);

  // Net Worth State
  const [assetCash, setAssetCash] = useState<number>(150000);
  const [assetProp, setAssetProp] = useState<number>(4500000);
  const [assetInv, setAssetInv] = useState<number>(600000);
  const [liabHome, setLiabHome] = useState<number>(2000000);
  const [liabCard, setLiabCard] = useState<number>(50000);
  const netWorthResult = calculateNetWorth(
    { cash: assetCash, property: assetProp, investments: assetInv },
    { homeloan: liabHome, creditcards: liabCard }
  );

  // Budget Planner State
  const [budgetIncome, setBudgetIncome] = useState<number>(60000);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans antialiased">
      
      {/* Sticky Top Navbar */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Hero Section */}
      <Hero liveUsdRate={liveRates.USD} />

      {/* Main Active Calculator Widget (Sticky details viewport) */}
      <CalculatorContainer 
        toolId={activeTool} 
        onClose={handleCloseTool} 
      />

      {/* Grid of calculators */}
      <ToolGrid 
        onSelectTool={handleSelectTool} 
        activeToolId={activeTool} 
        searchQuery={searchQuery} 
      />

      {/* Quick Dashboard Finance Utilities */}
      <section className="py-12 md:py-16 bg-blue-50/60 dark:bg-slate-900 border-y border-blue-100/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 font-bold text-xs rounded-full uppercase tracking-wider">
              Utilities
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Quick Finance Utilities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
              Track net worth, convert common currency, compute inflation adjustments, and create standard 50/30/20 budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Tabs */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              <button
                onClick={() => setUtilityTab('currency')}
                className={`flex-shrink-0 lg:flex-shrink flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs md:text-sm font-bold text-left transition-all ${utilityTab === 'currency' ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                <Globe className="w-4 h-4" />
                Currency Converter
              </button>
              <button
                onClick={() => setUtilityTab('inflation')}
                className={`flex-shrink-0 lg:flex-shrink flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs md:text-sm font-bold text-left transition-all ${utilityTab === 'inflation' ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                <Activity className="w-4 h-4" />
                Inflation Calculator
              </button>
              <button
                onClick={() => setUtilityTab('networth')}
                className={`flex-shrink-0 lg:flex-shrink flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs md:text-sm font-bold text-left transition-all ${utilityTab === 'networth' ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                <Landmark className="w-4 h-4" />
                Net Worth Tracker
              </button>
              <button
                onClick={() => setUtilityTab('budget')}
                className={`flex-shrink-0 lg:flex-shrink flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs md:text-sm font-bold text-left transition-all ${utilityTab === 'budget' ? 'bg-indigo-500 border-indigo-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                <IndianRupee className="w-4 h-4" />
                50/30/20 Budget Planner
              </button>
            </div>

            {/* Right: Tab Contents */}
            <div className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              
              {/* CURRENCY CONVERTER — LIVE */}
              {utilityTab === 'currency' && (
                <div className="space-y-5">
                  {/* Header row */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Live Currency Converter (INR)
                      {ratesLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 text-sky-500 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[9px] font-extrabold text-emerald-500 uppercase tracking-wider">Live</span>
                        </span>
                      )}
                    </h3>
                    <button
                      onClick={fetchLiveRates}
                      disabled={ratesLoading}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-sky-500 hover:text-sky-600 disabled:opacity-50 transition-colors"
                    >
                      <RefreshCw className={`w-3 h-3 ${ratesLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                  </div>

                  {/* Live Rate Pills */}
                  <div className="flex flex-wrap gap-2">
                    {(['USD', 'EUR', 'GBP'] as const).map((cur) => (
                      <div key={cur} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        fromCurrency === cur
                          ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`} onClick={() => setFromCurrency(cur)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        1 {cur} = ₹{liveRates[cur].toLocaleString('en-IN')}
                      </div>
                    ))}
                    {ratesFetchError && (
                      <span className="text-[9px] text-rose-400 font-bold px-2 py-1.5">⚠ Using cached rates</span>
                    )}
                  </div>

                  {/* Converter inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Convert From</label>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value as 'USD' | 'EUR' | 'GBP')}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold focus:outline-none"
                      >
                        <option value="USD">USD — US Dollar ($)</option>
                        <option value="EUR">EUR — Euro (€)</option>
                        <option value="GBP">GBP — British Pound (£)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Amount</label>
                      <input
                        type="number"
                        value={currencyAmount}
                        onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex flex-col justify-center text-center">
                      <span className="text-[10px] font-bold text-sky-500 uppercase">Converted Value (INR)</span>
                      <span className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                        {ratesLoading ? (
                          <span className="text-sky-300 text-sm animate-pulse">Fetching…</span>
                        ) : (
                          <>₹{convertedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</>
                        )}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold">
                        Rate: 1 {fromCurrency} = ₹{liveRates[fromCurrency]}
                      </span>
                    </div>
                  </div>

                  {/* Last updated */}
                  <p className="text-[10px] text-slate-400 font-bold">
                    {ratesLastUpdated
                      ? `🟢 Rates live as of ${ratesLastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} — auto-refreshes every 5 min`
                      : '⏳ Fetching live market rates…'}
                  </p>
                </div>
              )}

              {/* INFLATION CALCULATOR */}
              {utilityTab === 'inflation' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Inflation Purchasing Power</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Amount (₹)</label>
                      <input 
                        type="number" 
                        value={infAmount} 
                        onChange={(e) => setInfAmount(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Time (Years)</label>
                      <input 
                        type="number" 
                        value={infYears} 
                        onChange={(e) => setInfYears(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Avg. Inflation (%)</label>
                      <input 
                        type="number" 
                        value={infRate} 
                        onChange={(e) => setInfRate(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Adjust Direction</label>
                      <select 
                        value={infDirection} 
                        onChange={(e) => setInfDirection(e.target.value as 'future' | 'past')}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold focus:outline-none"
                      >
                        <option value="future">Future Cost value</option>
                        <option value="past">Past Value equivalent</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/10 rounded-2xl text-center">
                    <span className="text-[10px] font-bold text-amber-500 uppercase">
                      {infDirection === 'future' ? 'Future Adjusted Cost' : 'Purchasing Power Value'}
                    </span>
                    <div className="text-xl font-black mt-1">₹{inflationResult.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              )}

              {/* NET WORTH TRACKER */}
              {utilityTab === 'networth' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Net Worth Tracker</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Cash Reserves (₹)</label>
                      <input 
                        type="number" 
                        value={assetCash} 
                        onChange={(e) => setAssetCash(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Properties Value (₹)</label>
                      <input 
                        type="number" 
                        value={assetProp} 
                        onChange={(e) => setAssetProp(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Investments/Gold (₹)</label>
                      <input 
                        type="number" 
                        value={assetInv} 
                        onChange={(e) => setAssetInv(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Home Loans (Debt - ₹)</label>
                      <input 
                        type="number" 
                        value={liabHome} 
                        onChange={(e) => setLiabHome(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-rose-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400">Credit Card Debt (₹)</label>
                      <input 
                        type="number" 
                        value={liabCard} 
                        onChange={(e) => setLiabCard(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-rose-500 focus:outline-none"
                      />
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/10 rounded-2xl flex flex-col justify-center text-center">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">Estimated Net Worth</span>
                      <span className="text-lg font-black mt-1 text-slate-900 dark:text-white">₹{netWorthResult.netWorth.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BUDGET PLANNER */}
              {utilityTab === 'budget' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">50/30/20 Monthly Budget Allocations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Monthly Income</label>
                      <input 
                        type="number" 
                        value={budgetIncome} 
                        onChange={(e) => setBudgetIncome(Number(e.target.value))}
                        className="w-full py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="p-4 bg-sky-50 dark:bg-slate-800 rounded-xl text-center">
                      <span className="text-[9px] font-bold text-sky-500 uppercase block">Needs (50%)</span>
                      <span className="text-sm font-extrabold mt-1 block text-slate-900 dark:text-white">₹{(budgetIncome * 0.5).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-slate-800 rounded-xl text-center">
                      <span className="text-[9px] font-bold text-amber-500 uppercase block">Wants (30%)</span>
                      <span className="text-sm font-extrabold mt-1 block text-slate-900 dark:text-white">₹{(budgetIncome * 0.3).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-slate-800 rounded-xl text-center">
                      <span className="text-[9px] font-bold text-emerald-500 uppercase block">Savings (20%)</span>
                      <span className="text-sm font-extrabold mt-1 block text-slate-900 dark:text-white">₹{(budgetIncome * 0.2).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* AI Financial Advisor floating widget / Section */}
      <AIAdvisor />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQs */}
      <FAQs />

      {/* Insights / Articles */}
      <Insights />

      {/* Loan & Credit Card Offers */}
      <Offers />

      {/* Footer */}
      <Footer />

    </div>
  );
}
