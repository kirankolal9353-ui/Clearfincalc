import React, { useState, useMemo } from 'react';
import { Landmark, PiggyBank, Percent, Globe, ArrowRight, Star } from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  category: 'Loans' | 'Taxes' | 'Savings' | 'Customs';
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface ToolGridProps {
  onSelectTool: (id: string) => void;
  activeToolId: string | null;
  searchQuery: string;
}

export default function ToolGrid({ onSelectTool, activeToolId, searchQuery }: ToolGridProps) {
  const [selectedCat, setSelectedCat] = useState<'All' | 'Loans' | 'Taxes' | 'Savings' | 'Customs'>('All');

  const tools: ToolItem[] = useMemo(() => [
    {
      id: 'emi',
      name: 'EMI Calculator',
      category: 'Loans',
      description: 'Calculate monthly payments and total interest on home, personal, or car loans.',
      icon: <Landmark className="w-5 h-5 text-sky-500" />,
      popular: true
    },
    {
      id: 'sip',
      name: 'SIP Calculator',
      category: 'Savings',
      description: 'Estimate maturity wealth of systematic mutual fund investments.',
      icon: <PiggyBank className="w-5 h-5 text-emerald-500" />,
      popular: true
    },
    {
      id: 'tds',
      name: 'Advanced TDS Calculator',
      category: 'Taxes',
      description: 'Indian Income Tax TDS sections, rate charts, and PAN deduction check.',
      icon: <Percent className="w-5 h-5 text-indigo-500" />,
      popular: true
    },
    {
      id: 'customs',
      name: 'Customs Duty Calculator',
      category: 'Customs',
      description: 'Assess import-export landed costs, HS codes, BCD, and country agreements.',
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      popular: true
    },
    {
      id: 'eligibility',
      name: 'Loan Eligibility',
      category: 'Loans',
      description: 'Check maximum loan capacity based on income and existing EMIs.',
      icon: <Landmark className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'personal-loan',
      name: 'Personal Loan EMI',
      category: 'Loans',
      description: 'Unsecured loan repayments estimator including processing fee deductions.',
      icon: <Landmark className="w-5 h-5 text-rose-500" />
    },
    {
      id: 'home-loan',
      name: 'Home Loan EMI',
      category: 'Loans',
      description: 'Home acquisition planner with down payment and tenure amortization.',
      icon: <Landmark className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'tax',
      name: 'Income Tax Estimator',
      category: 'Taxes',
      description: 'Annual tax liability calculator comparing Old and New regimes.',
      icon: <Percent className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'salary',
      name: 'Salary Calculator',
      category: 'Taxes',
      description: 'Gross-to-net income calculator with PF, PT, and tax deduction splits.',
      icon: <Percent className="w-5 h-5 text-sky-500" />
    },
    {
      id: 'gst',
      name: 'GST Calculator',
      category: 'Taxes',
      description: 'CGST, SGST, IGST tax calculator for inclusive or exclusive values.',
      icon: <Percent className="w-5 h-5 text-rose-500" />
    },
    {
      id: 'fd',
      name: 'FD Calculator',
      category: 'Savings',
      description: 'Fixed deposit maturity values compounding quarterly or monthly.',
      icon: <PiggyBank className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'retirement',
      name: 'Retirement Corpus Planner',
      category: 'Savings',
      description: 'Find nest egg corpus required adjusted for working inflation.',
      icon: <PiggyBank className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'savings-goal',
      name: 'Savings Goal Planner',
      category: 'Savings',
      description: 'Calculate monthly savings needed to reach target wealth goals.',
      icon: <PiggyBank className="w-5 h-5 text-sky-500" />
    }
  ], []);

  const categories: ('All' | 'Loans' | 'Taxes' | 'Savings' | 'Customs')[] = ['All', 'Loans', 'Taxes', 'Savings', 'Customs'];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCat = selectedCat === 'All' || tool.category === selectedCat;
      const matchSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [tools, selectedCat, searchQuery]);

  return (
    <section id="calculators" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-10">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-xs rounded-full uppercase tracking-wider">
            Calculator Hub
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Popular Financial Calculators
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-semibold">
            Choose a calculator below to get instant results, interactive charts, and CA verified outputs.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${selectedCat === cat ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const isActive = activeToolId === tool.id;
            return (
              <div 
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none relative group ${isActive ? 'ring-2 ring-blue-600 border-transparent shadow-xl' : 'border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl hover:-translate-y-1'}`}
              >
                {tool.popular && (
                  <div className="absolute top-3 right-3 text-amber-500 flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{tool.name}</h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed line-clamp-3">{tool.description}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{tool.category}</span>
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Open Tool
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
