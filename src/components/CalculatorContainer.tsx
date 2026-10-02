import EducationalText from './EducationalText';
import { CALCULATOR_SEO } from '../utils/seo';
import React, { useRef, useEffect, lazy, Suspense } from 'react';
import { X, ChevronRight, Home, BookOpen, Calculator, HelpCircle, ShieldCheck, AlertCircle, FileText, Info } from 'lucide-react';
import { CALCULATOR_EXPLANATIONS } from '../data/calculatorExplanations';
import { ARTICLES } from '../data/articles';

const EmiCalculator = lazy(() => import('../calculators/EmiCalculator'));
const SipCalculator = lazy(() => import('../calculators/SipCalculator'));
const LoanEligibility = lazy(() => import('../calculators/LoanEligibility'));
const PersonalLoan = lazy(() => import('../calculators/PersonalLoan'));
const HomeLoan = lazy(() => import('../calculators/HomeLoan'));
const TaxEstimator = lazy(() => import('../calculators/TaxEstimator'));
const SalaryCalculator = lazy(() => import('../calculators/SalaryCalculator'));
const TdsCalculator = lazy(() => import('../calculators/TdsCalculator'));
const GstCalculator = lazy(() => import('../calculators/GstCalculator'));
const FdCalculator = lazy(() => import('../calculators/FdCalculator'));
const RetirementCalculator = lazy(() => import('../calculators/RetirementCalculator'));
const SavingsPlanner = lazy(() => import('../calculators/SavingsPlanner'));
const CustomsDuty = lazy(() => import('../calculators/CustomsDuty'));

const CalculatorLoadingFallback = () => (
  <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl min-h-[400px] flex flex-col items-center justify-center gap-3 animate-pulse">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Loading calculator...</p>
  </div>
);

interface CalculatorContainerProps {
  prerenderCalculator?: React.ComponentType;
  toolId: string | null;
  onClose: () => void;
}

export default function CalculatorContainer({ toolId, onClose, prerenderCalculator: PrerenderCalculator }: CalculatorContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Scroll into view when tool opens
  useEffect(() => {
    if (toolId && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <nav className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 mb-5 select-none" aria-label="Breadcrumb">
        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer" onClick={onClose}>
          <Home className="w-3.5 h-3.5" aria-hidden="true" />
          Home
        </span>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Calculators</span>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="text-slate-700 dark:text-slate-200">
          {explanation?.title ? explanation.title.split(' Guide')[0] : 'Calculator'}
        </span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">{CALCULATOR_SEO[toolId]?.title.split(' | ')[0] || 'Financial Calculator'}</h1>
      {/* Main Calculator Body */}
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 p-2 bg-slate-900 text-white dark:bg-slate-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-md flex items-center justify-center border border-slate-700"
          aria-label="Close Calculator"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
        {PrerenderCalculator ? <PrerenderCalculator /> : <Suspense fallback={<CalculatorLoadingFallback />}>
          {renderCalculator()}
        </Suspense>}
      </div>

      {explanation && (
        <article className="mt-12 bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 space-y-8">
          <header className="space-y-3">
            <h2 className="text-2xl font-black">{explanation.title}</h2>
            <p className="text-sm text-slate-500">By ClearFinCalc Editorial Team. Formula-based educational estimates; review the assumptions and applicable year before using a result.</p>
          </header>
          <nav aria-label="Calculator guide sections" className="flex flex-wrap gap-4 text-blue-600 font-bold text-sm">
            <a href="#calculator-guide">Overview &amp; Guide</a>
            <a href="#calculator-math">Formula &amp; Examples</a>
            <a href="#calculator-limits">Benefits &amp; Limits</a>
            <a href="#calculator-faqs">FAQ &amp; Takeaways</a>
          </nav>
          <section id="calculator-guide" className="space-y-4 scroll-mt-24">
            <h3 className="font-bold text-xl">Overview and how to use this calculator</h3>
            <EducationalText text={explanation.intro} />
            <EducationalText text={explanation.howItWorks} />
          </section>
          <section id="calculator-math" className="space-y-4 scroll-mt-24">
            <h3 className="font-bold text-xl">Formula and worked examples</h3>
            <EducationalText text={explanation.formula} />
            <EducationalText text={explanation.example} />
          </section>
          <section id="calculator-limits" className="space-y-4 scroll-mt-24">
            <h3 className="font-bold text-xl">Benefits and limitations</h3>
            <h4 className="font-bold">Benefits</h4>
            <ul className="list-disc pl-6 space-y-2">{explanation.benefits.map((text, i) => <li key={i}><EducationalText text={text} /></li>)}</ul>
            <h4 className="font-bold">Limitations</h4>
            <ul className="list-disc pl-6 space-y-2">{explanation.limitations.map((text, i) => <li key={i}><EducationalText text={text} /></li>)}</ul>
          </section>
          <section id="calculator-faqs" className="space-y-4 scroll-mt-24">
            <h3 className="font-bold text-xl">Frequently asked questions</h3>
            {explanation.faqs.map((faq, i) => <div key={i} className="space-y-2"><h4 className="font-bold">{faq.q}</h4><EducationalText text={faq.a} /></div>)}
            <h3 className="font-bold text-xl">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2">{explanation.takeaways.map((text, i) => <li key={i}><EducationalText text={text} /></li>)}</ul>
            <h3 className="font-bold text-xl">References</h3>
            <ul className="space-y-2">{explanation.citations.map((cite, i) => <li key={i}><a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{cite.text}</a></li>)}</ul>
          </section>
        </article>
      )}

      {/* Related Content (Breadcrumb relation, other tools, related articles) */}
      <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Related Tools */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTools.map((t) => (
              <a
                key={t.id}
                href={`?tool=${t.id}`}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer select-none transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{t.name}</h4>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-1.5">{t.cat}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Related Articles */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Related Insights</h3>
          <div className="space-y-3">
            {relatedArticles.map((art) => (
              <a
                key={art.id}
                href={`?article=${art.id}`}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer select-none transition-all flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center text-[9px] font-bold">
                  <span className="text-blue-500 uppercase">{art.category}</span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight line-clamp-1">{art.title}</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold line-clamp-1 leading-relaxed">{art.excerpt}</p>
              </a>
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
