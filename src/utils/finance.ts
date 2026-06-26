/**
 * Finance Utility Functions for ClearFinCalc
 */

// 1. EMI Calculator
export interface EmiResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  amortization: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
  monthlyAmortization: {
    month: number;
    emi: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
}

export function calculateEMI(principal: number, annualRate: number, tenureYears: number): EmiResult {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = tenureYears * 12;

  const monthlyPayment = monthlyRate === 0
    ? principal / numberOfPayments
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  // Generate simple annual amortization schedule
  const amortization: EmiResult['amortization'] = [];
  // Generate monthly amortization schedule
  const monthlyAmortization: EmiResult['monthlyAmortization'] = [];
  let balance = principal;
  let monthCount = 0;
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let month = 1; month <= 12; month++) {
      monthCount++;
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      
      yearlyInterest += interest;
      yearlyPrincipal += principalPaid;
      balance -= principalPaid;
      if (balance < 0) balance = 0;

      monthlyAmortization.push({
        month: monthCount,
        emi: Math.round(monthlyPayment),
        principalPaid: Math.round(principalPaid),
        interestPaid: Math.round(interest),
        remainingBalance: Math.round(balance)
      });
    }

    amortization.push({
      year,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      remainingBalance: Math.round(balance)
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    amortization,
    monthlyAmortization
  };
}

// 2. SIP Calculator
export interface SipResult {
  investedAmount: number;
  wealthGained: number;
  totalValue: number;
  breakdown: {
    year: number;
    invested: number;
    value: number;
  }[];
}

export function calculateSIP(monthlyInvestment: number, expectedReturn: number, tenureYears: number): SipResult {
  const monthlyRate = expectedReturn / 12 / 100;
  const totalMonths = tenureYears * 12;

  // Formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
  const totalValue = monthlyRate === 0
    ? monthlyInvestment * totalMonths
    : monthlyInvestment * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

  const investedAmount = monthlyInvestment * totalMonths;
  const wealthGained = totalValue - investedAmount;

  const breakdown: SipResult['breakdown'] = [];
  for (let year = 1; year <= tenureYears; year++) {
    const months = year * 12;
    const val = monthlyRate === 0
      ? monthlyInvestment * months
      : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    breakdown.push({
      year,
      invested: Math.round(monthlyInvestment * months),
      value: Math.round(val)
    });
  }

  return {
    investedAmount: Math.round(investedAmount),
    wealthGained: Math.round(wealthGained),
    totalValue: Math.round(totalValue),
    breakdown
  };
}

// 3. Loan Eligibility Calculator
export interface LoanEligibilityResult {
  eligibleAmount: number;
  monthlyEMI: number;
  maxAffordableEMI: number;
  isEligible: boolean;
}

export function calculateLoanEligibility(
  grossIncome: number,
  existingEmi: number,
  annualRate: number,
  tenureYears: number,
  foirPercent: number = 50 // Fixed Obligation to Income Ratio
): LoanEligibilityResult {
  const maxAffordableEMI = (grossIncome * (foirPercent / 100)) - existingEmi;
  
  if (maxAffordableEMI <= 0) {
    return {
      eligibleAmount: 0,
      monthlyEMI: 0,
      maxAffordableEMI: Math.max(0, maxAffordableEMI),
      isEligible: false
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = tenureYears * 12;

  const eligibleAmount = monthlyRate === 0
    ? maxAffordableEMI * numberOfPayments
    : maxAffordableEMI / ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                      (Math.pow(1 + monthlyRate, numberOfPayments) - 1));

  return {
    eligibleAmount: Math.round(eligibleAmount),
    monthlyEMI: Math.round(maxAffordableEMI),
    maxAffordableEMI: Math.round(maxAffordableEMI),
    isEligible: eligibleAmount > 100000
  };
}

// 4. FD Calculator
export interface FdResult {
  investedAmount: number;
  interestEarned: number;
  maturityAmount: number;
}

export function calculateFD(principal: number, ratePercent: number, tenureYears: number, compounding: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'): FdResult {
  let n = 4; // default quarterly
  if (compounding === 'monthly') n = 12;
  else if (compounding === 'quarterly') n = 4;
  else if (compounding === 'half-yearly') n = 2;
  else if (compounding === 'yearly') n = 1;

  const r = ratePercent / 100;
  const maturityAmount = principal * Math.pow(1 + r / n, n * tenureYears);
  const interestEarned = maturityAmount - principal;

  return {
    investedAmount: principal,
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
}

// 5. Income Tax Estimator (FY 2025-26/New Regime default)
export interface TaxResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxAmount: number;
  cess: number;
  totalTaxLiability: number;
  effectiveTaxRate: number;
  breakdown: { bracket: string; rate: number; tax: number }[];
}

export function calculateTax(grossIncome: number, deductions: number, regime: 'new' | 'old' = 'new'): TaxResult {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  let taxAmount = 0;
  const breakdown: TaxResult['breakdown'] = [];

  if (regime === 'new') {
    // New Tax Regime (FY 2025-26 proposed slabs)
    // 0 - 4L: Nil
    // 4L - 8L: 5%
    // 8L - 12L: 10%
    // 12L - 16L: 15%
    // 16L - 20L: 20%
    // Above 20L: 30%
    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 5 },
      { limit: 1200000, rate: 10 },
      { limit: 1600000, rate: 15 },
      { limit: 2000000, rate: 20 },
      { limit: Infinity, rate: 30 }
    ];

    let prevLimit = 0;
    let tempIncome = taxableIncome;

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      const slabRange = slab.limit - prevLimit;
      if (tempIncome > 0) {
        const taxableInSlab = Math.min(tempIncome, slabRange);
        const taxInSlab = (taxableInSlab * slab.rate) / 100;
        taxAmount += taxInSlab;
        
        breakdown.push({
          bracket: `₹${prevLimit / 100000}L - ${slab.limit === Infinity ? 'Above' : '₹' + slab.limit / 100000 + 'L'}`,
          rate: slab.rate,
          tax: taxInSlab
        });
        
        tempIncome -= taxableInSlab;
      }
      prevLimit = slab.limit;
    }

    // Tax rebate under Sec 87A: If taxable income <= 12,000,000 (12L) in new regime, rebate up to tax amount
    if (taxableIncome <= 1200000) {
      taxAmount = 0;
      breakdown.forEach(b => b.tax = 0);
    }
  } else {
    // Old Tax Regime (Standard slabs)
    // 0 - 2.5L: Nil
    // 2.5L - 5L: 5%
    // 5L - 10L: 20%
    // Above 10L: 30%
    const slabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 5 },
      { limit: 1000000, rate: 20 },
      { limit: Infinity, rate: 30 }
    ];

    let prevLimit = 0;
    let tempIncome = taxableIncome;

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      const slabRange = slab.limit - prevLimit;
      if (tempIncome > 0) {
        const taxableInSlab = Math.min(tempIncome, slabRange);
        const taxInSlab = (taxableInSlab * slab.rate) / 100;
        taxAmount += taxInSlab;

        breakdown.push({
          bracket: `₹${prevLimit / 100000}L - ${slab.limit === Infinity ? 'Above' : '₹' + slab.limit / 100000 + 'L'}`,
          rate: slab.rate,
          tax: taxInSlab
        });

        tempIncome -= taxableInSlab;
      }
      prevLimit = slab.limit;
    }

    // Sec 87A rebate: If taxable income <= 5,000,000 (5L), rebate up to ₹12,500
    if (taxableIncome <= 500000) {
      taxAmount = Math.max(0, taxAmount - 12500);
      // Recalculate breakdown taxes proportionally or clear it
      breakdown.forEach(b => {
        if (b.rate === 5) b.tax = Math.max(0, b.tax - 12500);
      });
    }
  }

  const cess = taxAmount * 0.04; // 4% Health and Education Cess
  const totalTaxLiability = taxAmount + cess;
  const effectiveTaxRate = grossIncome > 0 ? (totalTaxLiability / grossIncome) * 100 : 0;

  return {
    grossIncome,
    totalDeductions: deductions,
    taxableIncome,
    taxAmount: Math.round(taxAmount),
    cess: Math.round(cess),
    totalTaxLiability: Math.round(totalTaxLiability),
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    breakdown
  };
}

// 6. GST Calculator
export interface GstResult {
  originalAmount: number;
  gstAmount: number;
  netAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export function calculateGST(amount: number, ratePercent: number, type: 'inclusive' | 'exclusive'): GstResult {
  const originalAmount = type === 'exclusive' ? amount : amount / (1 + ratePercent / 100);
  const gstAmount = type === 'exclusive' ? (amount * ratePercent) / 100 : amount - originalAmount;
  const netAmount = type === 'exclusive' ? amount + gstAmount : amount;

  const halfGst = gstAmount / 2;

  return {
    originalAmount: Math.round(originalAmount),
    gstAmount: Math.round(gstAmount),
    netAmount: Math.round(netAmount),
    cgst: Math.round(halfGst),
    sgst: Math.round(halfGst),
    igst: Math.round(gstAmount)
  };
}

// 7. Retirement Calculator
export interface RetirementResult {
  corpusRequired: number;
  futureMonthlyExpenses: number;
  currentSavingsFutureValue: number;
  netCorpusGap: number;
  suggestedMonthlySavings: number;
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentMonthlyExpenses: number,
  currentSavings: number,
  inflationRate: number,
  preRetirementReturn: number,
  postRetirementReturn: number,
  lifeExpectancy: number
): RetirementResult {
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

  // Future value of current monthly expenses adjusted for inflation at retirement
  const futureMonthlyExpenses = currentMonthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
  
  // Future value of current savings at retirement
  const currentSavingsFutureValue = currentSavings * Math.pow(1 + preRetirementReturn / 100, yearsToRetire);

  // Post-retirement inflation-adjusted return (Real Rate of Return)
  // Formula: Real Rate = ((1 + postReturn) / (1 + inflation) - 1)
  const postReturnDec = postRetirementReturn / 100;
  const inflationDec = inflationRate / 100;
  const realRate = ((1 + postReturnDec) / (1 + inflationDec)) - 1;
  const monthlyRealRate = realRate / 12;

  // Monthly annuity needed during retirement (using real rate of return)
  // Corpus = PMT * [1 - (1+r)^-n] / r
  const totalRetirementMonths = yearsInRetirement * 12;
  const corpusRequired = monthlyRealRate === 0
    ? futureMonthlyExpenses * totalRetirementMonths
    : futureMonthlyExpenses * ((1 - Math.pow(1 + monthlyRealRate, -totalRetirementMonths)) / monthlyRealRate);

  const netCorpusGap = Math.max(0, corpusRequired - currentSavingsFutureValue);

  // Monthly savings needed during working years to fill the gap (Sinking Fund)
  // PMT = FutureValue * r / [ (1+r)^n - 1 ]
  const workingMonths = yearsToRetire * 12;
  const monthlyPreRate = (preRetirementReturn / 12) / 100;
  let suggestedMonthlySavings = 0;

  if (workingMonths > 0) {
    if (monthlyPreRate === 0) {
      suggestedMonthlySavings = netCorpusGap / workingMonths;
    } else {
      suggestedMonthlySavings = netCorpusGap * monthlyPreRate / (Math.pow(1 + monthlyPreRate, workingMonths) - 1);
    }
  }

  return {
    corpusRequired: Math.round(corpusRequired),
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses),
    currentSavingsFutureValue: Math.round(currentSavingsFutureValue),
    netCorpusGap: Math.round(netCorpusGap),
    suggestedMonthlySavings: Math.round(suggestedMonthlySavings)
  };
}

// 8. Savings Goal Planner
export interface SavingsGoalResult {
  totalTarget: number;
  monthlySavingsRequired: number;
  totalInterestEarned: number;
}

export function calculateSavingsGoal(targetAmount: number, years: number, expectedReturn: number, initialSavings: number = 0): SavingsGoalResult {
  const months = years * 12;
  const monthlyRate = expectedReturn / 12 / 100;

  // Future value of initial savings
  const initialSavingsFutureValue = initialSavings * Math.pow(1 + monthlyRate, months);
  const remainingTarget = Math.max(0, targetAmount - initialSavingsFutureValue);

  let monthlySavingsRequired = 0;
  if (months > 0) {
    if (monthlyRate === 0) {
      monthlySavingsRequired = remainingTarget / months;
    } else {
      // Monthly Payment = FV * r / [ (1 + r)^n - 1 ]
      monthlySavingsRequired = remainingTarget * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    }
  }

  const totalInvested = initialSavings + (monthlySavingsRequired * months);
  const totalInterestEarned = Math.max(0, targetAmount - totalInvested);

  return {
    totalTarget: targetAmount,
    monthlySavingsRequired: Math.round(monthlySavingsRequired),
    totalInterestEarned: Math.round(totalInterestEarned)
  };
}

// 9. TDS Calculator
export interface TdsResult {
  sectionName: string;
  tdsRate: number;
  thresholdLimit: number;
  panMandatory: boolean;
  tdsAmount: number;
  netPayable: number;
  isThresholdExceeded: boolean;
  higherTdsRateApplied: boolean;
  yearlyDeductionEstimate: number;
}

export interface TdsSectionInfo {
  code: string;
  name: string;
  rateResidentIndiv: number;
  rateResidentCompany: number;
  rateNri: number;
  threshold: number;
  description: string;
  panMandatory: boolean;
  higherTdsRate: number;
}

export const TDS_SECTIONS: TdsSectionInfo[] = [

  // ─── Salary & Wages ───────────────────────────────────────────────────────
  {
    code: '192',
    name: 'Section 192 - Salary',
    rateResidentIndiv: 15, // Slab-based; 15% is an average estimate shown here
    rateResidentCompany: 15,
    rateNri: 30,
    threshold: 300000, // Basic exemption limit ₹3L (new regime, FY 2025-26)
    description: 'TDS on salary deducted by employer at applicable income tax slab rates. New regime is default from FY 2023-24. Threshold is the basic exemption limit (₹3L under new regime). Actual rate varies per individual income.',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '192A',
    name: 'Section 192A - Premature EPF Withdrawal',
    rateResidentIndiv: 10,
    rateResidentCompany: 10,
    rateNri: 30,
    threshold: 50000, // TDS applies if withdrawal > ₹50,000
    description: 'TDS at 10% on premature withdrawal from EPF (Employee Provident Fund) before 5 years of continuous service. Threshold: ₹50,000. No TDS if Form 15G/15H (new: Form 121) submitted.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Interest ─────────────────────────────────────────────────────────────
  {
    code: '193',
    name: 'Section 193 - Interest on Securities',
    rateResidentIndiv: 10,
    rateResidentCompany: 10,
    rateNri: 20,
    threshold: 10000, // NEW: Budget 2025 introduced ₹10,000 threshold (was NIL)
    description: 'TDS on interest on debentures, government securities. Budget 2025 introduced ₹10,000 threshold (effective 1 Apr 2025). Previously no threshold existed.',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194A',
    name: 'Section 194A - Interest on Bank / Post Office Deposits',
    rateResidentIndiv: 10,
    rateResidentCompany: 10,
    rateNri: 30,
    threshold: 50000, // UPDATED: Budget 2025 raised from ₹40,000 → ₹50,000 (effective 1 Apr 2025)
    description: 'TDS on interest from banks, cooperative societies, post offices. Budget 2025: threshold raised to ₹50,000 (others) and ₹1,00,000 (senior citizens) from 1 Apr 2025.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Dividends ────────────────────────────────────────────────────────────
  {
    code: '194',
    name: 'Section 194 - Dividend from Indian Companies',
    rateResidentIndiv: 10,
    rateResidentCompany: 10,
    rateNri: 20,
    threshold: 10000, // UPDATED: Budget 2025 raised from ₹5,000 → ₹10,000 (effective 1 Apr 2025)
    description: 'TDS on dividends paid by domestic companies. Budget 2025 raised threshold from ₹5,000 to ₹10,000 effective 1 Apr 2025.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Lottery / Gambling ───────────────────────────────────────────────────
  {
    code: '194B',
    name: 'Section 194B - Lottery / Crossword / Card Game Winnings',
    rateResidentIndiv: 30,
    rateResidentCompany: 30,
    rateNri: 30,
    threshold: 10000, // ₹10,000 per transaction (aggregate in a financial year)
    description: 'TDS at 30% on winnings from lotteries, crossword puzzles, card games or any game. Threshold: ₹10,000 per transaction. No deductions allowed against such winnings.',
    panMandatory: true,
    higherTdsRate: 30
  },
  {
    code: '194BB',
    name: 'Section 194BB - Horse Race Winnings',
    rateResidentIndiv: 30,
    rateResidentCompany: 30,
    rateNri: 30,
    threshold: 10000, // ₹10,000 per race event
    description: 'TDS at 30% on winnings from horse races. Threshold: ₹10,000 per race event. Applies to bookmakers, racecourse owners or licensees paying horse race winnings.',
    panMandatory: true,
    higherTdsRate: 30
  },
  {
    code: '194BA',
    name: 'Section 194BA - Online Gaming Winnings',
    rateResidentIndiv: 30,
    rateResidentCompany: 30,
    rateNri: 30,
    threshold: 0, // No threshold — TDS on every rupee of net winnings
    description: 'TDS at 30% on net winnings from online games (fantasy sports, poker, rummy, etc.). Effective 1 Apr 2023. No threshold exemption — TDS applies on net winnings at year-end or at time of withdrawal.',
    panMandatory: true,
    higherTdsRate: 30
  },
  // ─── Contractors & Professionals ──────────────────────────────────────────
  {
    code: '194C',
    name: 'Section 194C - Contractor / Sub-Contractor Payments',
    rateResidentIndiv: 1,
    rateResidentCompany: 2,
    rateNri: 30,
    threshold: 30000, // Single payment; ₹1,00,000 aggregate in a year
    description: 'TDS on payments to contractors/sub-contractors. Rate: 1% (Individual/HUF), 2% (Company). Threshold: ₹30,000 per payment or ₹1,00,000 aggregate per year.',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194D',
    name: 'Section 194D - Insurance Commission',
    rateResidentIndiv: 2,   // CORRECTED FY 2025-26: 2% for Individual/HUF
    rateResidentCompany: 10, // 10% for Domestic Companies
    rateNri: 20,
    threshold: 20000, // CORRECTED FY 2025-26: ₹20,000 (not ₹15,000)
    description: 'TDS on commission paid to insurance agents/surveyors. Rate: 2% (Individual/HUF), 10% (Domestic Company). Threshold: ₹20,000 per annum (FY 2025-26 verified rate).',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194H',
    name: 'Section 194H - Commission or Brokerage',
    rateResidentIndiv: 2,   // CORRECTED FY 2025-26: 2% (not 5%)
    rateResidentCompany: 2,
    rateNri: 30,
    threshold: 20000, // CORRECTED FY 2025-26: ₹20,000 (not ₹15,000)
    description: 'TDS at 2% on commission or brokerage payments (excluding insurance commission under 194D). Threshold: ₹20,000 per annum (FY 2025-26 verified rate).',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194J',
    name: 'Section 194J - Professional & Technical Services Fees',
    rateResidentIndiv: 10, // 2% for purely technical services / call centres
    rateResidentCompany: 10,
    rateNri: 30,
    threshold: 50000, // UPDATED: Budget 2025 raised from ₹30,000 → ₹50,000 (effective 1 Apr 2025)
    description: 'TDS on professional fees, technical services, royalties, non-compete fees, director remuneration. Budget 2025: threshold raised from ₹30,000 to ₹50,000 effective 1 Apr 2025. Note: 2% rate applies for technical services/call centres.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Rent ─────────────────────────────────────────────────────────────────
  {
    code: '194I',
    name: 'Section 194-I - Rent (Land / Building / Furniture)',
    rateResidentIndiv: 10, // 2% for plant & machinery
    rateResidentCompany: 10,
    rateNri: 30,
    threshold: 600000, // UPDATED: Budget 2025 changed to ₹50,000/month = ₹6,00,000 p.a. (was ₹2,40,000 p.a.)
    description: 'TDS on rent for land, building, furniture, fittings. Budget 2025: threshold changed from ₹2,40,000 p.a. to ₹50,000 per month (effective 1 Apr 2025). Rate 2% for plant & machinery.',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194T',
    name: 'Section 194T - Remuneration / Interest to Partners',
    rateResidentIndiv: 10,
    rateResidentCompany: 10,
    rateNri: 30,
    threshold: 20000, // ₹20,000 per annum
    description: 'TDS at 10% on remuneration, salary, bonus, commission or interest paid by a partnership firm to its partners. Threshold: ₹20,000 per annum. Effective from 1 Apr 2025 (introduced Budget 2024).',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194M',
    name: 'Section 194M - Contractual/Professional Payments by Individuals',
    rateResidentIndiv: 5,
    rateResidentCompany: 5,
    rateNri: 30,
    threshold: 5000000, // ₹50 Lakh per annum
    description: 'TDS at 5% on payments by individuals/HUFs (not liable for tax audit) to contractors or professionals exceeding ₹50 Lakh aggregate per year. Applicable from 1 Sep 2019.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Cash Withdrawals ─────────────────────────────────────────────────────
  {
    code: '194N',
    name: 'Section 194N - Cash Withdrawal from Banks',
    rateResidentIndiv: 2, // 2% above ₹1Cr; 2% above ₹20L for non-ITR filers
    rateResidentCompany: 2,
    rateNri: 2,
    threshold: 10000000, // ₹1 Crore (₹20L for non-filers of ITR)
    description: 'TDS on cash withdrawals exceeding ₹1 Crore from banks/co-ops/post offices. Rate: 2% above ₹1 Cr. For non-ITR filers: 2% above ₹20L and 5% above ₹1 Cr.',
    panMandatory: true,
    higherTdsRate: 5
  },
  // ─── Goods ────────────────────────────────────────────────────────────────
  {
    code: '194Q',
    name: 'Section 194Q - Purchase of Goods (Buyer)',
    rateResidentIndiv: 0.1,
    rateResidentCompany: 0.1,
    rateNri: 5,
    threshold: 5000000, // ₹50 Lakh per seller
    description: 'TDS at 0.1% on purchase of goods from a resident seller if turnover of buyer > ₹10 Cr. Applicable on amount exceeding ₹50 Lakh per seller per year.',
    panMandatory: true,
    higherTdsRate: 5
  },
  // ─── Digital / E-Commerce ─────────────────────────────────────────────────
  {
    code: '194O',
    name: 'Section 194O - E-Commerce Participant Payments',
    rateResidentIndiv: 1,
    rateResidentCompany: 1,
    rateNri: 5,
    threshold: 500000, // ₹5 Lakh for individual/HUF participants
    description: 'TDS at 1% by e-commerce operators on gross amount of sales facilitated through their digital platform. Threshold ₹5 Lakh applies only for individual/HUF participants.',
    panMandatory: true,
    higherTdsRate: 20
  },
  {
    code: '194S',
    name: 'Section 194S - Virtual Digital Assets / Crypto / NFT',
    rateResidentIndiv: 1,
    rateResidentCompany: 1,
    rateNri: 1,
    threshold: 10000, // CORRECTED: ₹10,000 for specified persons (exchanges); ₹50,000 for others
    description: 'TDS at 1% on transfer of Virtual Digital Assets (VDA) including crypto, NFTs. Threshold: ₹10,000 (specified persons — exchanges/brokers) or ₹50,000 (others). Effective 1 Jul 2022. No netting of losses allowed.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── NRI / Non-Resident ───────────────────────────────────────────────────
  {
    code: '195',
    name: 'Section 195 - Payments to Non-Residents (NRI)',
    rateResidentIndiv: 30,
    rateResidentCompany: 40,
    rateNri: 30,
    threshold: 0, // No threshold; TDS applies on all payments
    description: 'TDS on interest, royalties, technical fees, capital gains or any other income paid to Non-Residents. No threshold applies. Rate depends on nature of income and applicable DTAA treaty.',
    panMandatory: true,
    higherTdsRate: 20
  },
  // ─── Compliance / Penalty ─────────────────────────────────────────────────
  {
    code: '206AB',
    name: 'Section 206AB - Higher TDS for ITR Non-Filers',
    rateResidentIndiv: 20, // Higher of: double normal rate OR 5%
    rateResidentCompany: 20,
    rateNri: 30,
    threshold: 50000, // Triggered when TDS/TCS in each of last 2 years > ₹50,000 & ITR not filed
    description: 'Higher TDS (double the applicable rate or 5%, whichever is higher) for persons who did not file ITR for the previous 2 years AND TDS/TCS exceeded ₹50,000 in each such year. Effective from 1 Jul 2021.',
    panMandatory: true,
    higherTdsRate: 20
  }
];

export function calculateTDS(
  sectionCode: string,
  paymentAmount: number,
  panAvailable: boolean,
  isCompany: boolean,
  isNri: boolean
): TdsResult {
  const section = TDS_SECTIONS.find(s => s.code === sectionCode)
    || TDS_SECTIONS.find(s => s.code === '194A')
    || TDS_SECTIONS[0]; // fallback to 194A or first section
  
  const higherTdsRateApplied = !panAvailable;
  const tdsRate = !panAvailable
    ? section.higherTdsRate
    : (isNri ? section.rateNri : (isCompany ? section.rateResidentCompany : section.rateResidentIndiv));

  const isThresholdExceeded = paymentAmount > section.threshold;
  
  // Under standard Indian TDS, TDS is 0 if total payments do not exceed threshold
  // However, section 195 (NRI) has no threshold (threshold = 0)
  const tdsAmount = isThresholdExceeded || section.threshold === 0 ? (paymentAmount * tdsRate) / 100 : 0;
  const netPayable = paymentAmount - tdsAmount;

  return {
    sectionName: section.name,
    tdsRate,
    thresholdLimit: section.threshold,
    panMandatory: section.panMandatory,
    tdsAmount: Math.round(tdsAmount),
    netPayable: Math.round(netPayable),
    isThresholdExceeded,
    higherTdsRateApplied,
    yearlyDeductionEstimate: Math.round(tdsAmount * 12)
  };
}

// 10. Import & Export Duty Calculator
export interface CustomsDutyResult {
  assessableValue: number;
  bcdAmount: number;
  swsAmount: number; // Social Welfare Surcharge (usually 10% of BCD)
  igstAmount: number;
  antiDumpingAmount: number;
  safeguardAmount: number;
  compensationCessAmount: number;
  totalDuties: number;
  landedCost: number;
  effectiveDutyPercent: number;
}

export function calculateImportDuty(
  cifValue: number,
  freight: number,
  insurance: number,
  bcdRate: number,
  igstRate: number,
  swsRate: number = 10, // Social Welfare Surcharge (10% standard)
  antiDumpingRate: number = 0,
  safeguardRate: number = 0,
  compensationCessRate: number = 0
): CustomsDutyResult {
  // Assessable Value = CIF Value + 1% Landing Charges (In India, landing charges were 1% historically, now mostly CIF is assessable value, but we can model it as cifValue + freight + insurance)
  const assessableValue = cifValue + freight + insurance;
  
  // Basic Customs Duty (BCD)
  const bcdAmount = (assessableValue * bcdRate) / 100;
  
  // Social Welfare Surcharge (SWS) - 10% of BCD
  const swsAmount = (bcdAmount * swsRate) / 100;
  
  // Anti-Dumping & Safeguard Duties
  const antiDumpingAmount = (assessableValue * antiDumpingRate) / 100;
  const safeguardAmount = (assessableValue * safeguardRate) / 100;
  
  // Value for IGST = Assessable Value + BCD + SWS + Anti-Dumping + Safeguard
  const baseForIgst = assessableValue + bcdAmount + swsAmount + antiDumpingAmount + safeguardAmount;
  const igstAmount = (baseForIgst * igstRate) / 100;

  // Compensation Cess
  const compensationCessAmount = (baseForIgst * compensationCessRate) / 100;

  const totalDuties = bcdAmount + swsAmount + igstAmount + antiDumpingAmount + safeguardAmount + compensationCessAmount;
  const landedCost = assessableValue + totalDuties;
  const effectiveDutyPercent = assessableValue > 0 ? (totalDuties / assessableValue) * 100 : 0;

  return {
    assessableValue: Math.round(assessableValue),
    bcdAmount: Math.round(bcdAmount),
    swsAmount: Math.round(swsAmount),
    igstAmount: Math.round(igstAmount),
    antiDumpingAmount: Math.round(antiDumpingAmount),
    safeguardAmount: Math.round(safeguardAmount),
    compensationCessAmount: Math.round(compensationCessAmount),
    totalDuties: Math.round(totalDuties),
    landedCost: Math.round(landedCost),
    effectiveDutyPercent: Math.round(effectiveDutyPercent * 100) / 100
  };
}

export interface ExportDutyResult {
  fobValue: number;
  exportDuty: number;
  exportTax: number;
  incentivesEarned: number;
  netRevenue: number;
  profitMargin: number;
}

export function calculateExportDuty(
  productValue: number,
  shippingCost: number,
  insuranceCost: number,
  dutyRate: number,
  taxRate: number,
  incentiveRate: number, // Government incentives like RoDTEP/MEIS
  costOfProduction: number
): ExportDutyResult {
  const fobValue = productValue + shippingCost + insuranceCost;
  
  const exportDuty = (fobValue * dutyRate) / 100;
  const exportTax = (fobValue * taxRate) / 100;
  const incentivesEarned = (fobValue * incentiveRate) / 100;

  // Net Revenue = FOB Value - Export Duty - Export Tax + Incentives
  const netRevenue = fobValue - exportDuty - exportTax + incentivesEarned;
  
  // Profit Margin = (Net Revenue - Cost of Production) / Net Revenue * 100
  const profitAmount = netRevenue - costOfProduction;
  const profitMargin = netRevenue > 0 ? (profitAmount / netRevenue) * 100 : 0;

  return {
    fobValue: Math.round(fobValue),
    exportDuty: Math.round(exportDuty),
    exportTax: Math.round(exportTax),
    incentivesEarned: Math.round(incentivesEarned),
    netRevenue: Math.round(netRevenue),
    profitMargin: Math.round(profitMargin * 100) / 100
  };
}

// 11. Salary Calculator
export interface SalaryResult {
  grossMonthly: number;
  providentFund: number;
  professionalTax: number;
  takeHomeMonthly: number;
  takeHomeYearly: number;
  tdsDeduction: number;
}

export function calculateSalary(grossMonthly: number, pfEmployeeRate: number = 12, ptAmount: number = 200): SalaryResult {
  // Monthly PF calculation (cap at 15000 basic if needed, standard is basic = 50% of gross)
  const basicSalary = grossMonthly * 0.5;
  const providentFund = Math.min(basicSalary * (pfEmployeeRate / 100), 1800); // cap standard PF at 1800 (12% of 15000)

  // Estimated TDS (crude monthly estimation based on new regime)
  const yearlyGross = grossMonthly * 12;
  const standardDeduction = 75000;
  const taxResult = calculateTax(yearlyGross, standardDeduction, 'new');
  const tdsDeduction = taxResult.totalTaxLiability / 12;

  const takeHomeMonthly = grossMonthly - providentFund - ptAmount - tdsDeduction;
  const takeHomeYearly = takeHomeMonthly * 12;

  return {
    grossMonthly,
    providentFund: Math.round(providentFund),
    professionalTax: ptAmount,
    takeHomeMonthly: Math.round(Math.max(0, takeHomeMonthly)),
    takeHomeYearly: Math.round(Math.max(0, takeHomeYearly)),
    tdsDeduction: Math.round(tdsDeduction)
  };
}

// 12. Net Worth Tracker
export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export function calculateNetWorth(assets: { [key: string]: number }, liabilities: { [key: string]: number }): NetWorthResult {
  const totalAssets = Object.values(assets).reduce((sum, val) => sum + (val || 0), 0);
  const totalLiabilities = Object.values(liabilities).reduce((sum, val) => sum + (val || 0), 0);
  const netWorth = totalAssets - totalLiabilities;
  return {
    totalAssets,
    totalLiabilities,
    netWorth
  };
}

// 13. Inflation Calculator
export function calculateInflation(amount: number, years: number, inflationRate: number, direction: 'future' | 'past'): number {
  const r = inflationRate / 100;
  if (direction === 'future') {
    return Math.round(amount * Math.pow(1 + r, years));
  } else {
    return Math.round(amount / Math.pow(1 + r, years));
  }
}
