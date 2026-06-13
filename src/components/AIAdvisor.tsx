import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIAdvisor() {
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am your ClearFinCalc AI Advisor. How can I help you optimize your wealth today? Choose a topic below or type your question.' }
  ]);
  const [input, setInput] = useState('');
  const [healthScore, setHealthScore] = useState<number | null>(null);
  
  // Health Score Inputs
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [monthlySavings, setMonthlySavings] = useState(20000);
  const [hasEmergencyFund, setHasEmergencyFund] = useState(true);
  const [debtRatio, setDebtRatio] = useState(25); // debt as % of income

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate responsive bot advice
    setTimeout(() => {
      let botResponse = '';
      const t = text.toLowerCase();

      if (t.includes('save') || t.includes('saving')) {
        botResponse = '💡 Savings Recommendation: Aim to save at least 20% of your net income. Consider the 50/30/20 budget rule: 50% for Needs, 30% for Wants, and 20% for Savings. Automating your savings to transfer on payday prevents impulse spends!';
      } else if (t.includes('invest') || t.includes('investment')) {
        botResponse = '📈 Investment Strategy: For long term wealth, set up regular monthly Mutual Fund SIPs in diversified Index Funds. If you are under 35, allocate 70-80% to equity and the rest to debt/fixed income.';
      } else if (t.includes('emi') || t.includes('loan') || t.includes('afford')) {
        botResponse = '🏦 Loan Affordability Rule: Keep your total EMIs below 40% of your gross monthly income. A higher EMI to Income ratio (FOIR) leaves you vulnerable in emergencies.';
      } else if (t.includes('budget') || t.includes('budgeting')) {
        botResponse = '📊 Budgeting Guidance: Audit your last 3 months of statements. Divide expenses into fixed (rent, bills) and variable (dining, shopping). Automating transfers to HYSAs helps enforce savings targets.';
      } else {
        botResponse = '✨ Advisor Suggestion: Small additions compound heavily. E.g., boosting a ₹5,000 monthly SIP by just 10% each year can increase your final maturity corpus by over 45% in 20 years!';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const calculateHealthScore = () => {
    // Basic calculation for financial health
    // savings rate: 20%+ = 30 pts, 10-20% = 15 pts, 0-10% = 5 pts
    // emergency fund: Yes = 30 pts, No = 0 pts
    // debt ratio: <30% = 40 pts, 30-50% = 20 pts, >50% = 5 pts
    let score = 0;
    const savingsRate = (monthlySavings / monthlyIncome) * 100;
    
    if (savingsRate >= 20) score += 30;
    else if (savingsRate >= 10) score += 15;
    else score += 5;

    if (hasEmergencyFund) score += 30;

    if (debtRatio <= 30) score += 40;
    else if (debtRatio <= 50) score += 20;
    else score += 5;

    setHealthScore(score);
  };

  return (
    <section id="advisor" className="py-12 md:py-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 font-bold text-xs rounded-full uppercase tracking-wider">
            AI Helper Widget
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            AI Financial Advisor & Health Score
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs md:text-sm font-medium">
            Analyze your savings, calculate your financial health score, and get personalized budget suggestions interactively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Chatbot Interface */}
          <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col h-[500px]">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl text-white shadow flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  ClearFinCalc SmartAdvisor
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">Online • Fast Response</span>
              </div>
            </div>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 scrollbar-thin">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`p-2 h-8 w-8 rounded-full flex items-center justify-center text-white ${m.sender === 'user' ? 'bg-sky-500' : 'bg-slate-700'}`}>
                    {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs md:text-sm font-semibold leading-relaxed ${m.sender === 'user' ? 'bg-sky-500 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion tags */}
            <div className="flex flex-wrap gap-2 pb-3 pt-2 text-[10px] md:text-xs">
              <button onClick={() => handleSend('Tell me about 50/30/20 saving rule')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-lg transition-all border border-slate-200 dark:border-slate-700">
                Saving Suggestions 💡
              </button>
              <button onClick={() => handleSend('What is the best investment method?')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-lg transition-all border border-slate-200 dark:border-slate-700">
                Investment Tips 📈
              </button>
              <button onClick={() => handleSend('How much EMI is affordable?')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-lg transition-all border border-slate-200 dark:border-slate-700">
                EMI Affordability 🏦
              </button>
            </div>

            {/* Input field */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Type your wealth or tax query..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold rounded-xl focus:outline-none border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500"
              />
              <button type="submit" className="p-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl flex items-center justify-center hover:from-blue-700 hover:to-sky-600 shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Health Score Calculator */}
          <div className="lg:col-span-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Calculate Financial Health Score</h3>
              <p className="text-xs text-slate-500 mt-1">Answer 4 quick questions to see your wealth health rating.</p>
            </div>

            <div className="space-y-4">
              {/* Income */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Monthly Net Income</span>
                  <span className="font-bold">₹{monthlyIncome.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" min="10000" max="500000" step="5000" value={monthlyIncome} 
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Savings */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Monthly Savings</span>
                  <span className="font-bold">₹{monthlySavings.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" min="0" max={monthlyIncome} step="2000" value={monthlySavings} 
                  onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Emergency Fund */}
              <div className="flex items-center justify-between p-2.5 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Emergency Fund (3-6 mo expenses)?</span>
                <button 
                  onClick={() => setHasEmergencyFund(!hasEmergencyFund)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${hasEmergencyFund ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 font-extrabold' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                >
                  {hasEmergencyFund ? 'YES' : 'NO'}
                </button>
              </div>

              {/* Debt Ratio */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Total EMIs as % of Income</span>
                  <span className="font-bold text-rose-500">{debtRatio}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="5" value={debtRatio} 
                  onChange={(e) => setDebtRatio(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>

            <button 
              onClick={calculateHealthScore}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-extrabold rounded-xl text-xs md:text-sm hover:from-blue-700 hover:to-sky-600 shadow transition-all"
            >
              Analyze Financial Health
            </button>

            {healthScore !== null && (
              <div className="p-4 border border-dashed border-sky-300 bg-sky-500/5 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                  Your Financial Health Score
                </span>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {healthScore} <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <span className={`text-xs font-bold ${healthScore >= 80 ? 'text-emerald-500' : (healthScore >= 50 ? 'text-amber-500' : 'text-rose-500')}`}>
                  {healthScore >= 80 ? 'Excellent Health! Keep it up!' : (healthScore >= 50 ? 'Moderate Health. Some updates suggested.' : 'Warning: Build emergency reserves!')}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
