import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES } from '../data/articles';
import type { Article } from '../data/articles';
import { User, Calendar, Clock, Search, BookOpen, ChevronRight, X, ExternalLink, Calculator, Share2, Check } from 'lucide-react';

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'All' | 'Savings' | 'Investment' | 'Taxation' | 'Loans' | 'Customs'>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Update dynamic titles/meta for SEO when article opens
  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | ClearFinCalc Insights`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${activeArticle.excerpt.slice(0, 150)}... Read this comprehensive, CA-reviewed guide.`);
      }
    } else {
      // Don't reset if a calculator is active, but if no calculator is active we can reset.
      // Wait, let's keep it simple: if closed, let's return default unless tool is in URL
      const params = new URLSearchParams(window.location.search);
      const toolId = params.get('tool');
      if (!toolId) {
        document.title = 'ClearFinCalc - Clear Calculations. Smarter Decisions.';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Clear Calculations. Smarter Decisions. Calculate EMI, SIP, Taxes, Salary, Loans, TDS, and Customs duties instantly.');
        }
      }
    }
  }, [activeArticle]);

  // Track scroll position in modal for reading progress bar
  const handleModalScroll = () => {
    if (modalBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  // Check URL query parameters on load to support direct bookmark link like `/?article=what-is-emi`
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artId = params.get('article');
    if (artId) {
      const art = ARTICLES.find(a => a.id === artId);
      if (art) {
        setActiveArticle(art);
        // Scroll to insights section to make it user-friendly
        const insightsSec = document.getElementById('insights');
        if (insightsSec) {
          insightsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, []);

  const handleShare = (art: Article) => {
    const url = `${window.location.origin}${window.location.pathname}?article=${art.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    setScrollProgress(0);
    // Update URL history to reflect the current article without reloading page
    const newUrl = `${window.location.origin}${window.location.pathname}?article=${art.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    // Reset URL to default home page structure
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const categories: ('All' | 'Savings' | 'Investment' | 'Taxation' | 'Loans' | 'Customs')[] = [
    'All', 'Savings', 'Investment', 'Taxation', 'Loans', 'Customs'
  ];

  // Filter articles based on search query and category
  const filteredArticles = ARTICLES.filter((art) => {
    const matchCat = selectedCat === 'All' || art.category === selectedCat;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Blog Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 animate-fade-in" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseArticle} />

          {/* Modal Container */}
          <div className="relative w-full sm:max-w-3xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-slide-up">
            
            {/* Scroll Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400 z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 z-10 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-slate-450 uppercase tracking-widest">
                <span className="text-blue-500">{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 text-xs font-bold"
                  title="Copy share link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <button
                  onClick={handleCloseArticle}
                  className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-slate-850 dark:hover:text-white"
                  aria-label="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              ref={modalBodyRef}
              onScroll={handleModalScroll}
              className="overflow-y-auto px-6 py-6 space-y-6 flex-1 text-slate-850 dark:text-slate-200"
            >
              {/* Breadcrumb inside Modal */}
              <nav className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 select-none">
                <span className="hover:text-blue-500 transition-colors cursor-pointer" onClick={handleCloseArticle}>Insights</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-650 dark:text-slate-300 line-clamp-1">{activeArticle.title}</span>
              </nav>

              {/* Title & Metadata */}
              <div className="space-y-4">
                <h1 className="text-xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white">
                  {activeArticle.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-[10px] md:text-xs font-bold text-slate-450 border-y border-slate-100 dark:border-slate-800/60 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-extrabold text-[10px]">
                      {activeArticle.author.charAt(0)}
                    </div>
                    <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                  </div>
                  <div>Published: {activeArticle.date}</div>
                  <div>Last Updated: {activeArticle.lastUpdated}</div>
                </div>
              </div>

              {/* Article Content Rendered beautifully */}
              <div className="text-[13px] md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Authoritative Citations / References Section */}
              {activeArticle.citations && activeArticle.citations.length > 0 && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 space-y-2">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Citations & Official References</h3>
                  <div className="flex flex-col gap-2">
                    {activeArticle.citations.map((cite, i) => (
                      <a
                        key={i}
                        href={cite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-bold transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        {cite.text}
                        <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 ml-1">({new URL(cite.url).hostname})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Section (EEAT) */}
              <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center font-black text-base shadow-sm">
                  {activeArticle.author.charAt(0)}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">About the Author: {activeArticle.author}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                    {activeArticle.authorBio}
                  </p>
                </div>
              </div>

              {/* Related Calculators */}
              {activeArticle.relatedCalculators && activeArticle.relatedCalculators.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Related Calculator Utilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeArticle.relatedCalculators.map((cId) => {
                      const names: Record<string, string> = {
                        emi: 'EMI Calculator',
                        sip: 'SIP Calculator',
                        tds: 'Advanced TDS Calculator',
                        customs: 'Customs Duty Calculator',
                        eligibility: 'Loan Eligibility',
                        'personal-loan': 'Personal Loan EMI',
                        'home-loan': 'Home Loan EMI',
                        tax: 'Income Tax Estimator',
                        salary: 'Salary Calculator',
                        gst: 'GST Calculator',
                        fd: 'FD Calculator',
                        retirement: 'Retirement Corpus Planner',
                        'savings-goal': 'Savings Goal Planner'
                      };
                      return (
                        <div
                          key={cId}
                          onClick={() => {
                            window.location.search = `?tool=${cId}`;
                          }}
                          className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 hover:shadow-md cursor-pointer select-none transition-all flex items-center justify-between"
                        >
                          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{names[cId] || 'Calculator'}</span>
                          <Calculator className="w-4 h-4 text-blue-500" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
              <span className="text-[9px] text-slate-400 font-bold">ClearFinCalc Editorial Quality Guidelines • Verified Financial Content</span>
              <button
                onClick={handleCloseArticle}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Blog / Insights Section View */}
      <section id="insights" className="py-12 md:py-16 border-t border-slate-100 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-full uppercase tracking-wider">
              Finance Insights
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Wealth & Tax Strategy Library
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
              Search and filter our database of 30+ comprehensive, CA-reviewed educational guides on compounding, tax cuts, loans, and business audits.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div className="max-w-3xl mx-auto space-y-4 mb-10">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by keyword (e.g. EMI, TDS, PPF, GST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-2xl focus:outline-none text-xs md:text-sm font-semibold text-slate-905 placeholder:text-slate-400 shadow-sm"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1 text-[11px] font-extrabold rounded-full border transition-all ${
                    selectedCat === cat
                      ? 'bg-emerald-555 border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-405'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => handleOpenArticle(article)}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-6 space-y-4">
                  {/* Category & Read Time */}
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 uppercase rounded-full">
                      {article.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Author Footer */}
                <div className="p-6 bg-slate-50/50 dark:bg-slate-850/20 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-300" />
                    {article.date}
                  </span>
                </div>
              </article>
            ))}

            {filteredArticles.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-405 font-bold italic text-xs md:text-sm">
                No articles matching your search criteria were found. Try another search.
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
