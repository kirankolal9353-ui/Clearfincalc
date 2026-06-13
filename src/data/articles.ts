export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Savings' | 'Investment' | 'Taxation' | 'Loans' | 'Customs';
  readTime: string;
  date: string;
  author: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'smart-saving-hacks-2026',
    title: '5 Smart Saving Hacks to Boost Your Net Worth in 2026',
    excerpt: 'Discover the power of micro-investing, cash-back stacks, and automated high-yield savings to accelerate your wealth building.',
    category: 'Savings',
    readTime: '5 min read',
    date: 'May 12, 2026',
    author: 'Aarav Sharma, Financial Advisor',
    content: `Building wealth doesn't require a six-figure salary. Small, systematic adjustments can compound into significant financial freedom. Here are five practical saving hacks to optimize your budget in 2026:
    
    1. Automated High-Yield Stacking: Redirect 15% of your paycheck to high-yield savings accounts (HYSAs) automatically before you can spend it.
    2. Leverage Cash-Back and Rewards: Stack rewards credit cards with shopping portals to save an extra 2-5% on daily necessities.
    3. Audit Subscription Leaks: Cancel dormant SaaS subscriptions and gym memberships using budgeting apps.
    4. The 48-Hour Purchase Rule: Wait 48 hours before purchasing non-essential items to curb impulse buys.
    5. Compound Small Change: Use round-up features to micro-invest your spare change directly into mutual funds or index funds.`
  },
  {
    id: 'tax-saving-strategies-india',
    title: 'Top Tax-Saving Strategies Under the New & Old Income Tax Regimes',
    excerpt: 'Uncover tax exemptions, deductions under Section 80C, 80D, and how the rebate under Section 87A saves taxes up to ₹12 Lakhs.',
    category: 'Taxation',
    readTime: '8 min read',
    date: 'Apr 28, 2026',
    author: 'Neha Goel, Chartered Accountant',
    content: `Navigating the Indian tax system requires planning. In FY 2025-26, the New Tax Regime offers higher rebate limits up to ₹12 Lakhs under Section 87A, making it highly attractive for salaried professionals.
    
    - Under the Old Regime: Maximize Section 80C (up to ₹1.5 Lakhs in EPF, PPF, ELSS), Section 80D (health insurance up to ₹25k-50k), and Section 24(b) (home loan interest up to ₹2 Lakhs).
    - Under the New Regime: Standard Deduction has increased to ₹75,000. For incomes up to ₹12 Lakhs, rebate Sec 87A reduces tax to zero.
    - Evaluate your income structure using ClearFinCalc's Tax Estimator to choose the optimal regime before the financial year ends.`
  },
  {
    id: 'guide-to-sip-investing',
    title: 'SIP Investing: The Ultimate Wealth Creator for Beginners',
    excerpt: 'Understand how Systematic Investment Plans (SIPs) use rupee-cost averaging and compounding to turn small monthly savings into crores.',
    category: 'Investment',
    readTime: '6 min read',
    date: 'May 05, 2026',
    author: 'Karan Malhotra, Portfolio Manager',
    content: `Systematic Investment Plans (SIPs) are a disciplined way of investing in mutual funds. By investing a fixed amount regularly (monthly or quarterly), you purchase more units when prices are low and fewer units when prices are high.
    
    - Benefits of SIPs: Instills saving discipline, eliminates the need to time the market, and leverages compounding returns.
    - Power of Compounding: A monthly SIP of ₹10,000 for 25 years at an expected annual return of 12% compiles into ₹1.7 Crore, with a total investment of just ₹30 Lakhs.
    - Use our SIP Calculator to adjust investment amounts, rates, and duration to model your financial goals.`
  },
  {
    id: 'understanding-tds-rules',
    title: 'A Comprehensive Guide to TDS Rates and Section Thresholds',
    excerpt: 'Learn the critical rules of Tax Deducted at Source (TDS), when higher TDS is applicable under 206AB, and PAN requirements.',
    category: 'Taxation',
    readTime: '7 min read',
    date: 'May 18, 2026',
    author: 'Vikram Mehta, Tax Consultant',
    content: `Tax Deducted at Source (TDS) is a system introduced by the Income Tax Department to collect tax at the source of income itself.
    
    - Major Sections: Section 194J (Professional fees at 10% with ₹30k threshold), Section 194I (Rent on property at 10% with ₹2.4L threshold), and Section 194C (Contractor payments at 1% for individuals and 2% for companies).
    - PAN Importance: If the payee fails to furnish their PAN, TDS is deducted at a higher rate (usually 20%) under Section 206AA.
    - Section 206AB: Non-filers of income tax returns face double TDS rates if their tax deducted exceeded ₹50,000 in the prior year.`
  },
  {
    id: 'customs-duty-compliance-landed-cost',
    title: 'Mastering Landed Cost: Customs Duty, IGST, and Import surcharges',
    excerpt: 'A complete breakdown of international trade duties. How to calculate BCD, SWS, and IGST for importing cargo into India.',
    category: 'Customs',
    readTime: '9 min read',
    date: 'May 22, 2026',
    author: 'Sophia Chen, Global Trade Analyst',
    content: `Understanding landed cost is crucial for importers to maintain profitable margins. The landed cost includes the purchase price of the product, freight, insurance, customs duties, port handling fees, and inland logistics.
    
    - CIF Value: Cost + Insurance + Freight. This forms the basis for assessable value.
    - Basic Customs Duty (BCD): Calculated on the Assessable Value. Rates vary from 0% to 150% depending on HS Codes.
    - Social Welfare Surcharge (SWS): Usually 10% calculated on the BCD itself.
    - Integrated GST (IGST): Calculated on (Assessable Value + BCD + SWS + other duties).
    - Learn how trade agreements (FTAs) can offer zero-duty exemptions on specific country imports using ClearFinCalc's Customs Duty Calculator.`
  }
];
