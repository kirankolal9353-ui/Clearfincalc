import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, Info, Network, ShieldCheck, MapPin } from 'lucide-react';
import LegalModal from './LegalModal';
import type { PolicyType } from './LegalModal';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState<PolicyType | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleOpenLegal = (type: PolicyType) => {
    setOpenModal(type);
  };

  return (
    <>
      {/* Legal Modals */}
      {openModal && (
        <LegalModal type={openModal} onClose={() => setOpenModal(null)} onSelectType={setOpenModal} />
      )}

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
            
            {/* Brand and Description */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <img 
                  src="/logo.jpg" 
                  alt="ClearFinCalc Logo" 
                  className="h-10 w-auto object-contain rounded-lg bg-white p-1 border border-slate-205/40 shadow-sm" 
                />
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-sky-100 to-blue-400 bg-clip-text text-transparent">ClearFinCalc</span>
              </div>

              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                Clear Calculations. Smarter Decisions. ClearFinCalc is a premium, CA-reviewed financial utility platform. We simplify tax estimations, loan EMIs, retirement corpus planning, and import customs duties. 100% free and run completely in the browser for user data safety.
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleOpenLegal('about')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                >
                  <Info className="w-3.5 h-3.5" />
                  Editorial Board
                </button>
                <button
                  onClick={() => handleOpenLegal('sitemap')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                >
                  <Network className="w-3.5 h-3.5" />
                  HTML Sitemap
                </button>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Calculators</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="?tool=emi" className="hover:text-blue-400 transition-colors">EMI Calculator</a></li>
                <li><a href="?tool=sip" className="hover:text-blue-400 transition-colors">SIP Calculator</a></li>
                <li><a href="?tool=tds" className="hover:text-blue-400 transition-colors">TDS Calculator</a></li>
                <li><a href="?tool=gst" className="hover:text-blue-400 transition-colors">GST Calculator</a></li>
                <li><a href="?tool=customs" className="hover:text-blue-400 transition-colors">Customs Duty</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Support</h4>
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
                <li className="flex items-start gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-rose-450 flex-shrink-0 mt-0.5" />
                  <span> 1st floor, Byanna Compond, Whitefield, Bengaluru, KA, India</span>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenLegal('contact')}
                    className="text-[10px] text-blue-500 hover:text-blue-400 font-bold hover:underline"
                  >
                    Open Contact Helpdesk
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Newsletter</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Subscribe to receive updates on tax slabs adjustments, loan interest fluctuations, and financial strategies directly to your inbox.
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
                  {subscribed ? <CheckCircle className="w-3.5 h-3.5 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            </div>

          </div>

          {/* Disclaimers & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold">
            
            <div className="space-y-1 text-center md:text-left">
              <span>© 2026 ClearFinCalc Platform. All rights reserved.</span>
              <p className="text-slate-700 max-w-2xl font-medium leading-relaxed mt-1">
                Disclaimer: The calculations provided by ClearFinCalc are for planning and informational purposes only. We do not guarantee mathematical accuracy for legal, tax, or customs filings. Consult a certified financial planner or CA before executing transactions.
              </p>
            </div>

            <div className="flex gap-3.5 flex-wrap justify-center font-bold text-[10px] text-slate-500">
              <button
                onClick={() => handleOpenLegal('about')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleOpenLegal('contact')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
              <button
                onClick={() => handleOpenLegal('privacy')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleOpenLegal('cookie')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleOpenLegal('terms')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Terms
              </button>
              <button
                onClick={() => handleOpenLegal('disclaimer')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Disclaimer
              </button>
              <button
                onClick={() => handleOpenLegal('sitemap')}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Sitemap
              </button>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
}
