import React, { useEffect } from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';

type PolicyType = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  type: PolicyType;
  onClose: () => void;
}

const content: Record<PolicyType, { icon: React.ReactNode; title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'ClearFinCalc is designed to minimize the collection of personal information. Most financial calculations are processed locally in your browser. However, certain information such as email addresses (if voluntarily submitted), analytics data, cookies, or technical identifiers may be processed by trusted third-party services such as Google Analytics and Google AdSense in accordance with their respective privacy policies.',
      },
      {
        heading: 'Cookies & Tracking Technologies',
        body: 'ClearFinCalc may use cookies, local storage, and similar tracking technologies to improve user experience, remember preferences, analyze website traffic, and support advertising services. These technologies may be used by Google Analytics, Google AdSense, and other trusted third-party providers. Users can manage or disable cookies through their browser settings, although doing so may affect certain site features.',
      },
      {
        heading: 'Third-Party Services',
        body: 'ClearFinCalc uses third-party services, including Google Analytics, Google AdSense, and external APIs (such as exchange rate providers), to provide functionality, analyze usage, and display advertisements where applicable. These third-party providers may collect anonymized or aggregated information in accordance with their own privacy policies. ClearFinCalc does not sell users\u2019 personal information. For more details, refer to the Google Privacy Policy at https://policies.google.com/privacy.',
      },
      {
        heading: 'Data Security',
        body: 'ClearFinCalc implements reasonable measures to protect any information processed through the website. While most financial calculations are performed locally in the user\'s browser, certain data such as cookies, analytics information, or voluntarily submitted contact details may be processed by trusted third-party services. No method of transmission or storage is completely secure, and users access the website at their own risk.',
      },
      {
        heading: 'Children\'s Privacy',
        body: 'ClearFinCalc is not directed toward children under the age of 13 and does not knowingly collect personal information from them. If such information is identified, reasonable steps will be taken to remove it.',
      },
      {
        heading: 'Changes to This Policy',
        body: 'We reserve the right to update this Privacy Policy at any time. Continued use of ClearFinCalc after changes are posted constitutes acceptance of the updated policy.',
      },
      {
        heading: 'Contact',
        body: 'If you have questions about this Privacy Policy, please contact us at fcalchub@gmail.com.',
      },
    ],
  },
  terms: {
    icon: <FileText className="w-6 h-6 text-indigo-500" />,
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing and using ClearFinCalc, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this platform.',
      },
      {
        heading: 'Use of the Platform',
        body: 'ClearFinCalc is provided as a free financial utility tool for informational and educational purposes only. You may use this platform for personal, non-commercial purposes. Any commercial reproduction or redistribution of the calculation tools or outputs requires prior written permission.',
      },
      {
        heading: 'Accuracy of Calculations',
        body: 'While we strive to provide accurate calculations, ClearFinCalc does not warrant the completeness, accuracy, or fitness for a particular purpose of any calculations. Tax rates, interest rates, and regulatory thresholds are subject to change. Always verify results with a qualified financial or tax professional before making important financial decisions.',
      },
      {
        heading: 'No Professional Advice',
        body: 'Nothing on ClearFinCalc constitutes professional financial, tax, legal, or investment advice. The tools provided are for estimation and planning only. ClearFinCalc is not a registered financial advisor, CA firm, or legal entity offering advisory services.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content, branding, design, and code on ClearFinCalc are the intellectual property of ClearFinCalc. You may not copy, reproduce, or create derivative works without our express written consent.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'ClearFinCalc and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform or reliance on any calculation results. Your use of this platform is entirely at your own risk.',
      },
      {
        heading: 'Governing Law',
        body: 'These Terms of Service shall be governed by the laws of India. Any disputes arising from use of ClearFinCalc shall be subject to the exclusive jurisdiction of courts in India.',
      },
    ],
  },
  disclaimer: {
    icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    title: 'Disclaimer',
    sections: [
      {
        heading: 'Informational Purpose Only',
        body: 'All tools, calculators, and outputs provided by ClearFinCalc are intended solely for informational and planning purposes. They do not constitute professional financial, tax, legal, or investment advice.',
      },
      {
        heading: 'Estimation Basis',
        body: 'Calculations are based on the inputs provided by the user and standard formulas or rate structures. Results are estimates only. Actual tax liabilities, EMI amounts, or investment returns may differ based on applicable regulations, lender policies, and market conditions.',
      },
      {
        heading: 'Tax & Regulatory Compliance',
        body: 'Tax slabs, TDS rates, GST rates, customs duty structures, and other regulatory figures used in calculations reflect commonly published information. These figures are subject to change per government notifications. ClearFinCalc is not responsible for changes in law or regulatory rates that affect calculation outcomes.',
      },
      {
        heading: 'Currency & Market Data',
        body: 'Live currency exchange rates are sourced from a third-party API and are provided for indicative purposes only. These should not be used for actual forex transactions, remittances, or commercial purposes.',
      },
      {
        heading: 'No Guarantee of Accuracy',
        body: 'ClearFinCalc makes no guarantees regarding the mathematical accuracy, completeness, or suitability of any calculation for specific legal or financial filings. Users should consult a qualified chartered accountant, financial planner, or legal advisor before taking action based on any results.',
      },
      {
        heading: 'External Links',
        body: 'ClearFinCalc may contain links to third-party websites or financial product offers. We do not endorse, control, or take responsibility for the content, privacy practices, or terms of those external sites. Visiting them is at your own discretion.',
      },
    ],
  },
};

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { icon, title, sections } = content[type];

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    // Prevent page scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
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
      <div className="relative w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {icon}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-lg font-black text-slate-900 dark:text-white">{title}</h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">ClearFinCalc — Last updated June 2026</p>
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
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">
          {sections.map((section, i) => (
            <div key={i} className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                {i + 1}. {section.heading}
              </h3>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-400 font-semibold">
              © 2026 ClearFinCalc. All rights reserved.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
