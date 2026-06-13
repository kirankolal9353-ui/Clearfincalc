import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand and Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <img 
                src="/logo.jpg" 
                alt="ClearFinCalc Logo" 
                className="h-10 w-auto object-contain rounded-lg bg-white p-1 border border-slate-200/40 shadow-sm" 
              />
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-sky-100 to-blue-400 bg-clip-text text-transparent">ClearFinCalc</span>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 font-medium">
              Clear Calculations. Smarter Decisions. ClearFinCalc is a premium fintech utility platform dedicated to providing fast, accurate, and completely free calculations. We simplify taxes, loans, EMI, SIP, salary, and customs duties for individuals and businesses worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#calculators" className="hover:text-blue-400 transition-colors">EMI Calculator</a></li>
              <li><a href="#calculators" className="hover:text-blue-400 transition-colors">SIP Calculator</a></li>
              <li><a href="#calculators" className="hover:text-blue-400 transition-colors">TDS Calculator</a></li>
              <li><a href="#calculators" className="hover:text-blue-400 transition-colors">GST Calculator</a></li>
              <li><a href="#calculators" className="hover:text-blue-400 transition-colors">Customs Duty</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Details</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:fcalchub@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                  fcalchub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+918861103390" className="hover:text-blue-400 transition-colors">
                  +91 8861103390
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Subscribe to get latest tax adjustments, interest rates updates, and finance insights direct to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-xl focus:outline-none text-xs font-semibold text-white placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-all shadow-md"
              >
                {subscribed ? <CheckCircle className="w-3.5 h-3.5 text-emerald-300 animate-scale" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>

        </div>

        {/* Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold">
          
          <div className="space-y-1 text-center md:text-left">
            <span>© 2026 ClearFinCalc Platform. All rights reserved.</span>
            <p className="text-slate-700 max-w-2xl font-medium leading-relaxed mt-1">
              Disclaimer: The calculations provided by ClearFinCalc are for informational and planning purposes only and should not be construed as professional tax, financial, or customs advice. We do not guarantee mathematical suitability for legal filings.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
