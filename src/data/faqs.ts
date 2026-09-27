export interface FaqItem {
  id: string;
  category: 'General' | 'EMI' | 'SIP' | 'TDS' | 'Customs';
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'gen-1',
    category: 'General',
    question: 'Are the tools on ClearFinCalc completely free to use?',
    answer: 'Yes! All calculators, trackers, estimators, and financial comparison tools on ClearFinCalc are 100% free with no registration or subscriptions required. Our revenue comes from advertisement spaces and select affiliate partnerships.'
  },
  {
    id: 'emi-1',
    category: 'EMI',
    question: 'How is a loan EMI calculated?',
    answer: 'An Equated Monthly Installment (EMI) is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the principal loan amount, R is the monthly interest rate (annual interest rate/12/100), and N is the loan tenure in months.'
  },
  {
    id: 'sip-1',
    category: 'SIP',
    question: 'What is the power of compounding in a SIP?',
    answer: 'Compounding allows you to earn returns on both your principal investment and the returns already generated. Over long periods, the returns start earning more than the original contributions, resulting in exponential wealth growth.'
  },
  {
    id: 'tds-1',
    category: 'TDS',
    question: 'Does Section 206AB apply from 1 April 2025?',
    answer: 'Section 206AB was omitted by the Finance Act, 2025 with effect from 1 April 2025. Separate PAN-related rules may still apply. Verify the applicable period and section.'
  },
  {
    id: 'tds-2',
    category: 'TDS',
    question: 'Is a PAN card mandatory for TDS deductions?',
    answer: 'Yes. If a payee does not provide their PAN card details, the deductor is required to deduct TDS at a flat higher rate of 20% (or 5% under specific sections like 194Q) under Section 206AA.'
  },
  {
    id: 'cust-1',
    category: 'Customs',
    question: 'What components make up the total import duty?',
    answer: 'In India, the total import duty is computed as: Basic Customs Duty (BCD) + Social Welfare Surcharge (SWS, usually 10% of BCD) + Integrated GST (IGST, computed on CIF + BCD + SWS). Certain products also attract Anti-Dumping Duty, Safeguard Duty, or Compensation Cess.'
  },
  {
    id: 'cust-2',
    category: 'Customs',
    question: 'How does an HS Code impact customs calculation?',
    answer: 'An HS Code (Harmonized System Code) is an internationally standardized numerical method of classifying traded products. It determines the basic customs duty (BCD) rates, import restrictions, compliance mandates, and eligibility for Free Trade Agreement (FTA) concessions.'
  }
];
