import React, { useState } from 'react';
import { Sun, Moon, Search, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function Navbar({ darkMode, setDarkMode, searchQuery, setSearchQuery }: NavbarProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    // Auto-scroll to calculators section when user starts searching
    if (val.trim()) {
      const section = document.getElementById('calculators');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const section = document.getElementById('calculators');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileSearchOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-800/50 shadow-sm shadow-blue-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="ClearFinCalc Logo" 
              className="h-10 md:h-12 w-auto object-contain rounded-lg bg-white p-1 border border-slate-200/40 shadow-sm" 
            />
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 dark:from-white dark:via-sky-250 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              ClearFinCalc
            </span>
          </div>

          {/* Desktop Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search finance calculators (e.g. EMI, TDS)..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-xs md:text-sm bg-blue-50 hover:bg-blue-100/70 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-blue-100 focus:border-blue-300 dark:border-slate-700 dark:focus:border-slate-600 rounded-xl focus:outline-none transition-all text-slate-800 dark:text-slate-200 font-semibold placeholder:text-blue-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Right section: Links & Theme toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile search icon button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="sm:hidden p-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 text-blue-600 dark:text-slate-300 rounded-xl transition-all"
              aria-label="Toggle Search"
            >
              {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

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

        {/* Mobile Search Dropdown */}
        {mobileSearchOpen && (
          <div className="sm:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search calculators (e.g. EMI, SIP, TDS)..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-16 py-2.5 text-sm bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-400 text-slate-800 dark:text-slate-200 font-semibold placeholder:text-blue-300"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
