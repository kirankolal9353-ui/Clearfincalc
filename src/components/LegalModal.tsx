import React, { useEffect, useState } from 'react';
import { X, Shield, FileText, AlertTriangle, Info, Mail, Phone, MapPin, Clock, Calendar, CheckCircle, HelpCircle, Network } from 'lucide-react';
import { ARTICLES } from '../data/articles';

export type PolicyType = 'privacy' | 'terms' | 'disclaimer' | 'cookie' | 'about' | 'contact' | 'sitemap';

interface LegalModalProps {
  type: PolicyType;
  onClose: () => void;
  onSelectType?: (newType: PolicyType) => void;
}

export default function LegalModal({ type: initialType, onClose, onSelectType }: LegalModalProps) {
  const [type, setType] = useState<PolicyType>(initialType);

  // Sync state if initialType prop changes
  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  // Handle type changes locally and notify parent if callback exists
  const handleTypeChange = (newType: PolicyType) => {
    setType(newType);
    if (onSelectType) {
      onSelectType(newType);
    }
  };

  // Close on Escape key and lock scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const calculators = [
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

  const handleNavToTool = (id: string) => {
    onClose();
    window.location.search = `?tool=${id}`;
  };

  const handleNavToArticle = (id: string) => {
    onClose();
    window.location.search = `?article=${id}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative w-full sm:max-w-3xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-slide-up text-slate-800 dark:text-slate-250">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {type === 'privacy' && <Shield className="w-6 h-6 text-blue-500" />}
              {type === 'terms' && <FileText className="w-6 h-6 text-indigo-500" />}
              {type === 'disclaimer' && <AlertTriangle className="w-6 h-6 text-amber-500" />}
              {type === 'cookie' && <Shield className="w-6 h-6 text-emerald-500" />}
              {type === 'about' && <Info className="w-6 h-6 text-sky-500" />}
              {type === 'contact' && <Mail className="w-6 h-6 text-teal-500" />}
              {type === 'sitemap' && <Network className="w-6 h-6 text-indigo-500" />}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms of Service'}
                {type === 'disclaimer' && 'Disclaimers'}
                {type === 'cookie' && 'Cookie Policy'}
                {type === 'about' && 'About Us & Editorial Code'}
                {type === 'contact' && 'Contact Information'}
                {type === 'sitemap' && 'ClearFinCalc HTML Sitemap'}
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">ClearFinCalc v4.0 • Updated June 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 flex-1 space-y-6">

          {/* PRIVACY POLICY */}
          {type === 'privacy' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              <p className="text-slate-700 dark:text-slate-350">
                At ClearFinCalc, accessible from clearfincalc.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by ClearFinCalc and how we use it.
              </p>
              
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">1. Information We Collect</h3>
                <p>
                  ClearFinCalc is designed to run all financial calculations locally in your browser. We do not store, upload, or transmit any inputs you enter into the calculators (such as income, debt, and salary values). All calculations are client-side. We only collect name and email details if voluntarily submitted via newsletter signups or contact forms.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">2. Log Files & Analytics</h3>
                <p>
                  Like other websites, we follow a standard procedure of using log files and third-party analytics (Google Analytics). These services collect information such as IP addresses, browser types, Internet Service Providers (ISPs), date/time stamps, referring/exit pages, and clicks. This data is aggregated and anonymized, and is used solely to analyze usage trends and improve site performance.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">3. Google AdSense & Advertising Policy</h3>
                <p>
                  Google is one of the third-party vendors on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based on their visit to clearfincalc.com and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">4. GDPR and CCPA Data Protection Rights</h3>
                <p>
                  We comply with global privacy rules. You have the right to request access to your personal data, request corrections, request deletions, and opt-out of any data sales. To exercise these rights, please email us.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {type === 'terms' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">1. Agreement to Terms</h3>
                <p>
                  By accessing clearfincalc.com, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of this website.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">2. Use of the Calculators</h3>
                <p>
                  ClearFinCalc provides free online calculators for personal, educational, and informational use. You are prohibited from scraping, reverse engineering, framing, or reproducing any calculator logic or content for commercial applications without explicit written permission.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">3. Warranty Disclaimer</h3>
                <p>
                  The calculation tools are provided "as is" without warranties of accuracy, timeliness, completeness, or fitness for specific legal filings. Tax rates and policies (such as TDS, GST slabs, and income tax) fluctuate. Users should verify important financial decisions with qualified professionals.
                </p>
              </div>
            </div>
          )}

          {/* DISCLAIMER */}
          {type === 'disclaimer' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">1. Not Financial or Professional Advice</h3>
                <p>
                  The information and calculators on this website are provided for educational and informational purposes only and should not be considered financial, legal, tax, or professional advice. Users should verify important decisions with qualified professionals where appropriate.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">2. Accuracy & Policy Changes</h3>
                <p>
                  While we strive to align all calculations with the latest Union Budget announcements, finance regulations are subject to sudden government revisions. We cannot guarantee mathematical suitability for official filings, and any actions taken based on results are at your own discretion.
                </p>
              </div>
            </div>
          )}

          {/* COOKIE POLICY */}
          {type === 'cookie' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              <p className="text-slate-700 dark:text-slate-350">
                This Cookie Policy explains how ClearFinCalc uses cookies and tracking technologies to optimize website operations and deliver relevant advertising.
              </p>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">1. What are Cookies?</h3>
                <p>
                  Cookies are small text files placed on your device by websites you visit. They are widely used to remember preferences, analyze traffic patterns, and provide personalized ad content.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">2. Types of Cookies We Use</h3>
                <p>
                  - **Essential Cookies**: Necessary for page navigation, system security, and storing your dark mode/theme preferences.
                  - **Analytical Cookies**: Used by Google Analytics to help us understand visitor behavior, bounce rates, and popular tools.
                  - **Advertising Cookies**: Google AdSense uses these to show relevant ads and prevent you from seeing the same ad repeatedly.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">3. How to Manage Cookies</h3>
                <p>
                  You can configure your web browser settings to block or delete cookies. Please refer to your browser's Help menu for instructions. Disabling cookies may affect dark mode saves and navigation history.
                </p>
              </div>
            </div>
          )}

          {/* ABOUT US & EDITORIAL CODE */}
          {type === 'about' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-655 dark:text-slate-400 font-semibold">
              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">1. Our Mission</h3>
                <p className="text-slate-700 dark:text-slate-350">
                  ClearFinCalc was founded with a single mission: to make complex financial calculations simple, transparent, and accessible to everyone. We believe that financial literacy is the key to personal freedom. By providing secure, completely free, and beautifully designed calculators, we empower individuals to plan their loans, manage taxes, map retirement assets, and grow wealth.
                </p>
              </div>

              {/* Editorial Board (EEAT) */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">2. Editorial & Accuracy Code</h3>
                <p className="text-slate-700 dark:text-slate-350">
                  All financial tools and articles on ClearFinCalc are prepared for educational and informational purposes. Our editorial team works to ensure accuracy by referencing publicly available formulas and official government guidelines.
                </p>
                <div className="space-y-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Our Content Standards:
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-[12px] text-slate-500 dark:text-slate-400">
                    <li>**Formula Verification**: Every calculator formula (EMI, compound interest, tax slabs) is verified against publicly available formulas and official government notifications.</li>
                    <li>**Government Alignment**: All TDS sections, income tax rates, and customs surcharge splits are cross-referenced directly with official notifications from the RBI, CBIC, and Income Tax Department.</li>
                    <li>**Periodic Updates**: We monitor and update calculations immediately after new Union Budget notifications or central banking policy revisions.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT INFO */}
          {type === 'contact' && (
            <div className="space-y-6 text-[13px] leading-relaxed text-slate-550 dark:text-slate-400 font-semibold">
              <p className="text-slate-700 dark:text-slate-350">
                Have any questions, feedback, or custom calculation requests? Get in touch with our team directly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                  <Mail className="w-5 h-5 text-blue-550 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Digital Support</h4>
                    <a href="mailto:clearfincalc@gmail.com" className="text-blue-500 hover:underline block mt-1 text-xs">
                      clearfincalc@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                  <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Phone Hotline</h4>
                    <a href="tel:+918861103390" className="text-slate-600 dark:text-slate-300 block mt-1 text-xs">
                      +91 8861103390
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                  <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Office Address</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      ClearFinCalc Platform,<br />
                      1st floor, Byana compound,<br />
                      Immadihali Main Road, Whitefield,<br />
                      Bangalore - 560066
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Working Hours</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Monday to Friday<br />
                      9:00 AM – 6:00 PM IST<br />
                      (Excludes national public holidays)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HTML SITEMAP */}
          {type === 'sitemap' && (
            <div className="space-y-6 text-[13px] leading-relaxed font-semibold">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Structured overview of all modules, resources, and trust channels on the ClearFinCalc platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Slabs: Calculators */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    Calculators ({calculators.length})
                  </h4>
                  <div className="flex flex-col gap-2">
                    {calculators.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleNavToTool(c.id)}
                        className="text-left text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                      >
                        {c.name}
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-400 rounded px-1">{c.cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slabs: Blog Articles */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    Articles ({ARTICLES.length})
                  </h4>
                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                    {ARTICLES.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => handleNavToArticle(art.id)}
                        className="text-left text-[11px] text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline truncate"
                        title={art.title}
                      >
                        {art.title.split(': ')[1] || art.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slabs: Legal/Trust Pages */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    Legal & Support
                  </h4>
                  <div className="flex flex-col gap-2">
                    {(['about', 'contact', 'privacy', 'terms', 'cookie', 'disclaimer'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTypeChange(t)}
                        className="text-left text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline capitalize"
                      >
                        {t === 'about' && 'About Us & Editorial policy'}
                        {t === 'contact' && 'Contact Support'}
                        {t === 'privacy' && 'Privacy Policy'}
                        {t === 'terms' && 'Terms of Service'}
                        {t === 'cookie' && 'Cookie Policy'}
                        {t === 'disclaimer' && 'Disclaimers'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 rounded-b-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Quick switcher tabs inside modal */}
            <div className="flex gap-2 flex-wrap text-[10px] font-bold">
              <button
                onClick={() => handleTypeChange('about')}
                className={`hover:text-blue-500 transition-colors ${type === 'about' ? 'text-blue-500 underline' : 'text-slate-400'}`}
              >
                About
              </button>
              <button
                onClick={() => handleTypeChange('contact')}
                className={`hover:text-blue-500 transition-colors ${type === 'contact' ? 'text-blue-500 underline' : 'text-slate-400'}`}
              >
                Contact
              </button>
              <button
                onClick={() => handleTypeChange('privacy')}
                className={`hover:text-blue-500 transition-colors ${type === 'privacy' ? 'text-blue-500 underline' : 'text-slate-400'}`}
              >
                Privacy
              </button>
              <button
                onClick={() => handleTypeChange('cookie')}
                className={`hover:text-blue-500 transition-colors ${type === 'cookie' ? 'text-blue-500 underline' : 'text-slate-400'}`}
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleTypeChange('sitemap')}
                className={`hover:text-blue-500 transition-colors ${type === 'sitemap' ? 'text-blue-500 underline' : 'text-slate-400'}`}
              >
                Sitemap
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
