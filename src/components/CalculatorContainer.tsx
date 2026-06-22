import React, { useRef, useEffect, useState } from 'react';
import EmiCalculator from '../calculators/EmiCalculator';
import SipCalculator from '../calculators/SipCalculator';
import LoanEligibility from '../calculators/LoanEligibility';
import PersonalLoan from '../calculators/PersonalLoan';
import HomeLoan from '../calculators/HomeLoan';
import TaxEstimator from '../calculators/TaxEstimator';
import SalaryCalculator from '../calculators/SalaryCalculator';
import TdsCalculator from '../calculators/TdsCalculator';
import GstCalculator from '../calculators/GstCalculator';
import FdCalculator from '../calculators/FdCalculator';
import RetirementCalculator from '../calculators/RetirementCalculator';
import SavingsPlanner from '../calculators/SavingsPlanner';
import CustomsDuty from '../calculators/CustomsDuty';
import { X, ChevronRight, Home, BookOpen, Calculator, HelpCircle, ShieldCheck, AlertCircle, FileText, Info } from 'lucide-react';
import { CALCULATOR_EXPLANATIONS } from '../data/calculatorExplanations';
import { ARTICLES } from '../data/articles';

interface CalculatorContainerProps {
  toolId: string | null;
  onClose: () => void;
}

export default function CalculatorContainer({ toolId, onClose }: CalculatorContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'math' | 'benefits' | 'faqs'>('guide');

  // Dynamically update document head tags for SEO
  useEffect(() => {
    if (toolId && CALCULATOR_EXPLANATIONS[toolId]) {
      const exp = CALCULATOR_EXPLANATIONS[toolId];
      document.title = `${exp.title} | ClearFinCalc`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${exp.intro.slice(0, 155)}... Get instant calculations, detailed guides, and free PDF reports.`);
      }
    } else {
      document.title = 'ClearFinCalc - Clear Calculations. Smarter Decisions.';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Clear Calculations. Smarter Decisions. Calculate EMI, SIP, Taxes, Salary, Loans, TDS, and Customs duties instantly. ClearFinCalc is a premium, secure, CA-verified financial utility dashboard.');
      }
    }
  }, [toolId]);

  // Scroll into view when tool opens
  useEffect(() => {
    if (toolId && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab('guide'); // Reset to first tab on tool change
    }
  }, [toolId]);

  if (!toolId) return null;

  const explanation = CALCULATOR_EXPLANATIONS[toolId];

  const renderCalculator = () => {
    switch (toolId) {
      case 'emi': return <EmiCalculator />;
      case 'sip': return <SipCalculator />;
      case 'eligibility': return <LoanEligibility />;
      case 'personal-loan': return <PersonalLoan />;
      case 'home-loan': return <HomeLoan />;
      case 'tax': return <TaxEstimator />;
      case 'salary': return <SalaryCalculator />;
      case 'tds': return <TdsCalculator />;
      case 'gst': return <GstCalculator />;
      case 'fd': return <FdCalculator />;
      case 'retirement': return <RetirementCalculator />;
      case 'savings-goal': return <SavingsPlanner />;
      case 'customs': return <CustomsDuty />;
      default: return <EmiCalculator />;
    }
  };

  // Find related tools (by category or arbitrary related IDs)
  const getRelatedTools = () => {
    const allTools = [
      { id: 'emi', name: 'EMI Calculator', cat: 'Loans' },
      { id: 'sip', name: 'SIP Calculator', cat: 'Savings' },
      { id: 'tds', name: 'Advanced TDS Calculator', cat: 'Taxes' },
      { id: 'customs', name: 'Customs Duty Calculator', cat: 'Customs' },
      { id: 'eligibility', name: 'Loan Eligibility', cat: 'Loans' },
      { id: 'personal-loan', name: 'Personal Loan EMI', cat: 'Loans' },
      { id: 'home-loan', name: 'Home Loan EMI', cat: 'Loans' },
      { id: 'tax', name: 'Income Tax Estimator', cat: 'Taxes' },
      { id: 'salary', name: 'Salary Calculator', cat: 'Taxes' },
      { id: 'gst', name: 'GST Calculator', cat: 'Taxes' },
      { id: 'fd', name: 'FD Calculator', cat: 'Savings' },
      { id: 'retirement', name: 'Retirement Corpus Planner', cat: 'Savings' },
      { id: 'savings-goal', name: 'Savings Goal Planner', cat: 'Savings' }
    ];

    const currentCat = allTools.find(t => t.id === toolId)?.cat || 'Loans';
    return allTools.filter(t => t.cat === currentCat && t.id !== toolId).slice(0, 3);
  };

  // Find related articles for this calculator
  const getRelatedArticles = () => {
    return ARTICLES.filter(art => art.relatedCalculators.includes(toolId)).slice(0, 2);
  };

  const relatedTools = getRelatedTools();
  const relatedArticles = getRelatedArticles();

  return (
    <div 
      ref={containerRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24"
    >
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 mb-5 select-none">
        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer" onClick={onClose}>
          <Home className="w-3.5 h-3.5" />
          Home
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>Calculators</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 dark:text-slate-200">
          {explanation?.title ? explanation.title.split(' Guide')[0] : 'Calculator'}
        </span>
      </nav>

      {/* Main Calculator Body */}
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 p-2 bg-slate-900 text-white dark:bg-slate-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-md flex items-center justify-center border border-slate-700"
          aria-label="Close Calculator"
        >
          <X className="w-4 h-4" />
        </button>
        {renderCalculator()}
      </div>

      {/* Educational Guide Section (800-1500 words per calculator) */}
      {explanation && (
        <div className="mt-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Complete Educational Handbook
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Read our expert-written, CA-reviewed guide explaining calculations, math formulas, and practical implications.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all border ${
                activeTab === 'guide'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              <Info className="w-4 h-4" />
              Overview & Guide
            </button>
            <button
              onClick={() => setActiveTab('math')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all border ${
                activeTab === 'math'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Formula & Examples
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all border ${
                activeTab === 'benefits'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Benefits & Limits
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all border ${
                activeTab === 'faqs'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              FAQ & Takeaways
            </button>
          </div>

          {/* Tab Contents */}
          <div className="space-y-6">
            
            {/* OVERVIEW & GUIDE */}
            {activeTab === 'guide' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">1. Introduction</h3>
                  <p className="text-[13px] leading-relaxed text-slate-550 dark:text-slate-350 font-medium">
                    {explanation.intro}
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100/50 dark:border-slate-800/30">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">2. How to Use</h3>
                  <p className="text-[13px] leading-relaxed text-slate-550 dark:text-slate-350 font-medium">
                    {explanation.howItWorks}
                  </p>
                </div>
              </div>
            )}

            {/* FORMULA & EXAMPLES */}
            {activeTab === 'math' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">1. Mathematical Model</h3>
                  <div className="text-[13px] leading-relaxed text-slate-550 dark:text-slate-350 font-medium whitespace-pre-line bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150/50 dark:border-slate-800">
                    {explanation.formula}
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-slate-100/50 dark:border-slate-800/30">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">2. Step-by-Step Example</h3>
                  <div className="text-[13px] leading-relaxed text-slate-550 dark:text-slate-350 font-medium whitespace-pre-line bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150/50 dark:border-slate-800">
                    {explanation.example}
                  </div>
                </div>
              </div>
            )}

            {/* BENEFITS & LIMITATIONS */}
            {activeTab === 'benefits' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                <div className="space-y-4 p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <h3 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-3 text-[13px] text-slate-650 dark:text-slate-300 font-semibold list-disc list-inside">
                    {explanation.benefits.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                  <h3 className="text-sm font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                    Practical Limitations
                  </h3>
                  <ul className="space-y-3 text-[13px] text-slate-650 dark:text-slate-300 font-semibold list-disc list-inside">
                    {explanation.limitations.map((l, idx) => (
                      <li key={idx} className="leading-relaxed">{l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* FAQS & CITATIONS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">1. Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {explanation.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <h4 className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white mb-2 flex items-start gap-1">
                          <span className="text-blue-500 font-black">Q:</span>
                          {faq.q}
                        </h4>
                        <p className="text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed pl-4">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">2. Key Takeaways</h3>
                    <ul className="space-y-2 text-[13px] text-slate-500 dark:text-slate-400 font-semibold list-decimal list-inside">
                      {explanation.takeaways.map((takeaway, idx) => (
                        <li key={idx} className="leading-relaxed">{takeaway}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">3. Authoritative References</h3>
                    <div className="flex flex-col gap-2">
                      {explanation.citations.map((c, idx) => (
                        <a
                          key={idx}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-bold transition-all border border-blue-500/10 hover:bg-blue-500/5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/20"
                        >
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          {c.text}
                          <span className="text-[9px] uppercase bg-emerald-500/10 text-emerald-550 rounded px-1.5 py-0.5 ml-auto font-black">Verified Source</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Content (Breadcrumb relation, other tools, related articles) */}
      <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Related Tools */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTools.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  window.location.search = `?tool=${t.id}`;
                }}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer select-none transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{t.name}</h4>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-1.5">{t.cat}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Related Articles */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Related Insights</h3>
          <div className="space-y-3">
            {relatedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  window.location.search = `?article=${art.id}`;
                }}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer select-none transition-all flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center text-[9px] font-bold">
                  <span className="text-blue-500 uppercase">{art.category}</span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight line-clamp-1">{art.title}</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold line-clamp-1 leading-relaxed">{art.excerpt}</p>
              </div>
            ))}
            {relatedArticles.length === 0 && (
              <div className="text-xs font-semibold text-slate-400 italic py-4">No related articles found. Visit the blog below.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
