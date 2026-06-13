import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function Navbar({ darkMode, setDarkMode, searchQuery, setSearchQuery }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-800/50 shadow-sm shadow-blue-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <img 
              src="/logo.jpg" 
              alt="ClearFinCalc Logo" 
              className="h-10 md:h-12 w-auto object-contain rounded-lg bg-white p-1 border border-slate-200/40 shadow-sm" 
            />
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 dark:from-white dark:via-sky-250 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              ClearFinCalc
            </span>

          </div>




          {/* Search bar */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search finance calculators (e.g. EMI, TDS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-blue-50 hover:bg-blue-100/70 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-blue-100 focus:border-blue-300 dark:border-slate-700 dark:focus:border-slate-600 rounded-xl focus:outline-none transition-all text-slate-800 dark:text-slate-200 font-semibold placeholder:text-blue-300"
            />
          </div>

          {/* Right section: Links & Theme toggle */}
          <div className="flex items-center gap-4">
            <a href="#calculators" className="text-xs md:text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-all hidden md:block">
              Calculators
            </a>
            <a href="#advisor" className="text-xs md:text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-all hidden md:block">
              AI Advisor
            </a>
            <a href="#insights" className="text-xs md:text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-all hidden md:block">
              Insights
            </a>
            <a href="#offers" className="text-xs md:text-sm font-bold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition-all hidden lg:block">
              Affiliate Offers
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 text-blue-600 dark:text-slate-300 rounded-xl transition-all shadow-sm flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-500 animate-scale" /> : <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
