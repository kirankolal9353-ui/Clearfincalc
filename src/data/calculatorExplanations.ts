export interface CalculatorExplanation {
  id: string;
  title: string;
  intro: string;
  howItWorks: string;
  formula: string;
  example: string;
  benefits: string[];
  limitations: string[];
  faqs: { q: string; a: string }[];
  takeaways: string[];
  citations: { text: string; url: string }[];
}

export const CALCULATOR_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  emi: {
    id: 'emi',
    title: 'Equated Monthly Installment (EMI) Calculator Guide',
    intro: 'An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, and over a specified number of years, the loan is fully paid off. It is the foundation of modern retail finance, allowing individuals to buy homes, cars, or personal assets by leveraging future income. Understanding how EMIs are structured helps you budget effectively and select the optimal loan tenure and interest rate.',
    howItWorks: 'To use the EMI Calculator, you need to input three primary variables: the principal loan amount (the total sum borrowed), the annual interest rate offered by the financial institution, and the loan tenure (the duration over which you intend to repay the loan, usually expressed in years). The calculator instantly computes the monthly installment, the total interest you will pay over the loan life, and the aggregate amount (principal + interest) repaid.',
    formula: `The mathematical formula used to calculate EMI is:
$$EMI = \\frac{P \\times R \\times (1 + R)^N}{(1 + R)^N - 1}$$
Where:
- **P** is the Principal Loan Amount (the initial sum borrowed).
- **R** is the Monthly Interest Rate (calculated as: Annual Interest Rate / 12 / 100). For example, if the annual rate is 8.5%, R = 8.5 / 12 / 100 = 0.007083.
- **N** is the Loan Tenure in Months (years multiplied by 12). For a 15-year loan, N = 15 * 12 = 180 months.
This compounding formula determines the amortized monthly payment required to reduce the loan balance to exactly zero by the end of the tenure, assuming equal monthly repayments.`,
    example: 'Suppose you take a Home Loan of ₹10,000,000 (₹10 Lakhs) at an annual interest rate of 8.5% for a tenure of 15 years (180 months).\n\nStep 1: Calculate the monthly interest rate (R):\nR = 8.5 / 12 / 100 = 0.0070833\n\nStep 2: Calculate the number of monthly installments (N):\nN = 15 * 12 = 180 months\n\nStep 3: Apply the EMI formula:\nEMI = [1,000,000 * 0.0070833 * (1 + 0.0070833)^180] / [(1 + 0.0070833)^180 - 1]\nEMI = [7,083.33 * 3.56586] / [3.56586 - 1]\nEMI = 25,258.46 / 2.56586 = ₹9,847 per month.\n\nOver 180 months, the total payment will be ₹9,847 * 180 = ₹1,772,525. The total interest component is ₹1,772,525 - ₹1,000,000 = ₹772,525.',
    benefits: [
      'Allows precise monthly budgeting by giving a fixed recurring liability.',
      'Helps in comparing loan offers from different banks based on the EMI and total interest payable.',
      'Enables optimization of loan tenure—longer tenures reduce the monthly EMI but significantly increase the total interest burden.',
      'Provides a transparent view of the principal vs. interest breakdown over the loan lifecycle.'
    ],
    limitations: [
      'Calculations assume a constant interest rate. Floating-rate loans will experience changing EMIs as market benchmark rates fluctuate.',
      'Does not account for additional fees such as processing charges, prepayment penalties, documentation fees, or loan insurance.',
      'Assumes no prepayments are made during the loan tenure, which would otherwise reduce the outstanding principal and tenure.'
    ],
    faqs: [
      {
        q: 'What is the difference between a fixed-rate loan and a floating-rate loan?',
        a: 'In a fixed-rate loan, the interest rate remains constant throughout the tenure, keeping your EMI unchanged. In a floating-rate loan, the rate is tied to a benchmark market rate (like repo rate or MCLR) and changes periodically, causing your EMI or loan tenure to fluctuate.'
      },
      {
        q: 'Can I reduce my loan EMI after a few years?',
        a: 'Yes, you can reduce your EMI by making a lump-sum principal prepayment and requesting the bank to recalculate the EMI while keeping the tenure same, or by refinancing the loan with another lender at a lower interest rate.'
      },
      {
        q: 'How does making prepayments affect my loan?',
        a: 'Prepayments go directly toward reducing the principal balance. This reduces the total interest payable and shortens the remaining loan tenure unless you explicitly ask the bank to lower the EMI instead.'
      },
      {
        q: 'What is a reducing balance method vs a flat rate method?',
        a: 'The reducing balance method calculates interest on the outstanding loan balance each month, meaning interest decreases as you pay off principal. The flat rate method calculates interest on the initial loan amount for the entire duration, making it significantly more expensive than reducing balance.'
      },
      {
        q: 'What happens if I miss an EMI payment?',
        a: 'Missing an EMI results in late payment charges, accumulates additional interest on the overdue amount, and negatively impacts your credit score (CIBIL), making it harder to secure loans in the future.'
      }
    ],
    takeaways: [
      'Always compare reducing balance rates rather than flat interest rates.',
      'Shorten your tenure as much as possible to save on total interest, provided the monthly EMI is within your comfortable repayment capacity.',
      'Plan periodic prepayments to accelerate debt payoff and save lakhs in interest costs.'
    ],
    citations: [
      { text: 'Reserve Bank of India (RBI) Consumer Education', url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx' },
      { text: 'National Housing Bank Loan Guidelines', url: 'https://nhb.org.in/' }
    ]
  },
  sip: {
    id: 'sip',
    title: 'Systematic Investment Plan (SIP) Calculator Guide',
    intro: 'A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest a fixed amount regularly (monthly, quarterly, etc.) rather than a lump sum. SIPs represent a disciplined approach to wealth creation, utilizing the concepts of rupee-cost averaging and compounding. By investing regularly, you buy more units when markets are low and fewer when markets are high, smoothing out volatility and accumulating substantial wealth over long horizons.',
    howItWorks: 'To use the SIP calculator, you enter the monthly investment amount, the expected annual return rate (historical averages for equity mutual funds range from 12-15%), and the investment period in years. The calculator projects the future value of your regular contributions, separating the principal invested from the compounded estimated capital gains.',
    formula: `The future value of a SIP is computed using the future value of an annuity formula:
$$FV = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)$$
Where:
- **FV** is the Future Value of the investment.
- **P** is the Monthly Investment Amount.
- **i** is the Periodic (Monthly) Rate of Return (Annual expected return / 12 / 100). E.g., for 12% annual return, i = 12 / 12 / 100 = 0.01.
- **n** is the Total Number of Payments (number of months). For 10 years, n = 10 * 12 = 120.
The final factor $(1 + i)$ accounts for payments being made at the beginning of each compounding period.`,
    example: 'Suppose you start a monthly SIP of ₹10,000 for 10 years (120 months) at an expected annual return rate of 12%.\n\nStep 1: Calculate the monthly rate (i):\ni = 12 / 12 / 100 = 0.01\n\nStep 2: Calculate the number of payments (n):\nn = 10 * 12 = 120 months\n\nStep 3: Apply the SIP formula:\nFV = 10,000 * [((1 + 0.01)^120 - 1) / 0.01] * (1 + 0.01)\nFV = 10,000 * [(3.30039 - 1) / 0.01] * 1.01\nFV = 10,000 * 230.0387 * 1.01 = ₹2,323,391.\n\nTotal Invested: ₹1,200,000 (₹10,000 * 120). Estimated Returns: ₹1,123,391. Total Value: ₹2,323,391.',
    benefits: [
      'Rupee-Cost Averaging eliminates the need to time volatile markets.',
      'Instills disciplined saving habits by automating monthly investments.',
      'Harnesses the power of compounding, where returns generate further returns over time.',
      'Low entry barrier—allows starting investments with as little as ₹500 per month.'
    ],
    limitations: [
      'Mutual fund investments are subject to market risks. Realized returns fluctuate and are never guaranteed.',
      'Expected returns are calculated as a flat rate, whereas actual market returns vary year-on-year (CAGR vs. annual volatility).',
      'Does not account for mutual fund expense ratios, exit loads, or capital gains tax (LTCG/STCG).'
    ],
    faqs: [
      {
        q: 'Is SIP better than investing a lump sum?',
        a: 'For most retail investors, SIP is better as it reduces market timing risk through rupee-cost averaging. Lump sum investing is ideal if you have a cash windfall and are comfortable with market volatility.'
      },
      {
        q: 'Can I stop, pause, or change my SIP amount?',
        a: 'Yes, SIPs are highly flexible. You can pause or stop your SIP at any time without penalties, or increase/decrease the amount using the step-up feature.'
      },
      {
        q: 'What is a Step-Up SIP?',
        a: 'A Step-Up SIP allows you to automatically increase your monthly investment by a fixed percentage or amount every year, aligning with salary increments and accelerating your wealth-building goals.'
      },
      {
        q: 'Are SIP returns tax-free?',
        a: 'No. Capital gains from equity mutual funds are taxed. Short-Term Capital Gains (STCG, held < 1 year) are taxed at 20%, and Long-Term Capital Gains (LTCG, held > 1 year) are taxed at 12.5% on gains exceeding ₹1.25 Lakhs per year (as per Budget 2024).'
      },
      {
        q: 'What happens if I miss a monthly SIP payment?',
        a: 'Missing an SIP payment does not attract bank loan penalties, but your bank may charge a mandate failure fee. The mutual fund house will not cancel your portfolio, though three consecutive misses might auto-deactivate the automated mandate.'
      }
    ],
    takeaways: [
      'Start as early as possible—compounding yields exponential growth in the final years.',
      'Use Step-Up SIPs to increase your savings rate in line with annual salary increases.',
      'Focus on long-term goals (7+ years) to smooth out short-term stock market volatility.'
    ],
    citations: [
      { text: 'Association of Mutual Funds in India (AMFI) SIP Portal', url: 'https://www.amfiindia.com/' },
      { text: 'Securities and Exchange Board of India (SEBI) Investor Education', url: 'https://investor.sebi.gov.in/' }
    ]
  },
  tds: {
    id: 'tds',
    title: 'Advanced TDS Calculator & Guide (FY 2025-26)',
    intro: 'Tax Deducted at Source (TDS) is a system introduced by the Income Tax Department of India to collect taxes at the very source of income. Under this mechanism, the person/entity (deductor) responsible for making specific payments to another person (deductee) must deduct a percentage of tax and deposit it with the Central Government. The deductee can claim credit for this deducted tax in their annual Income Tax Return (ITR) using Form 26AS or AIS. This ensures a steady flow of tax revenue and reduces tax evasion.',
    howItWorks: 'To calculate TDS, choose the applicable Section (e.g., 194C for contractors, 194J for professional fees), input the gross payment amount, select the entity type of the payee (Individual/HUF or Corporate), resident status, and PAN availability. The calculator determines the base tax rate, checks if the payment exceeds the statutory threshold, applies higher tax deductions (20%) if PAN is missing, and computes the net payable amount.',
    formula: `TDS is computed as:
1. **If Gross Payment > Section Threshold**:
   $$\\text{TDS Deducted} = \\text{Payment Amount} \\times \\frac{\\text{TDS Rate}}{100}$$
2. **If PAN is missing**: TDS Rate is replaced by the higher rate specified under Section 206AA (usually 20%, or 5% under specific sections).
3. **Net Payment to Payee**:
   $$\\text{Net Payment} = \\text{Payment Amount} - \\text{TDS Deducted}$$`,
    example: 'Suppose you pay ₹100,000 to an individual professional under Section 194J (Professional fees). The threshold for Section 194J is ₹30,000 per year, and the normal TDS rate is 10% (under Section 194J(1)(b) for professional fees).\n\nStep 1: Check threshold compliance:\n₹100,000 > ₹30,000. TDS is applicable.\n\nStep 2: Compute TDS amount (assuming PAN is provided):\nTDS = ₹100,000 * 10% = ₹10,000.\n\nStep 3: Compute Net Payment:\nNet Payable = ₹100,000 - ₹10,000 = ₹90,000.\n\nIf the professional fails to provide a PAN, Section 206AA applies a flat 20% rate. TDS would be ₹20,000 and net payment would be ₹80,000.',
    benefits: [
      'Ensures compliance with Indian tax laws, preventing expensive penal interest and default charges.',
      'Helps businesses budget payouts to contractors, professionals, and landlords precisely.',
      'Validates rates and thresholds dynamically aligned with the latest Finance Act/Budget revisions.',
      'Highlights the impact of non-compliance (missing PAN or non-filer status under 206AB).'
    ],
    limitations: [
      'Calculations are based on single-transaction thresholds, whereas some sections have aggregate annual thresholds (e.g., 194C has ₹30,000 single / ₹100,000 annual threshold).',
      'Does not verify whether the payee is a registered non-filer under Section 206AB, which requires checking the government portal.',
      'Excludes surcharge and health/education cess, which are only applicable to NRI payments under Section 195.'
    ],
    faqs: [
      {
        q: 'What is the due date for depositing TDS with the government?',
        a: 'TDS deducted must be deposited to the credit of the Central Government by the 7th of the following month. For the month of March, the due date is April 30th.'
      },
      {
        q: 'What is Form 16 and Form 16A?',
        a: 'Form 16 is a TDS certificate issued by employers to employees detailing tax deducted from salary. Form 16A is issued for non-salary payments (like interest, professional fees, or rent) on a quarterly basis.'
      },
      {
        q: 'Can I get a refund of TDS?',
        a: 'If your total annual tax liability is lower than the total TDS deducted, you can claim a refund of the excess TDS by filing your annual Income Tax Return (ITR).'
      },
      {
        q: 'What is the penalty for late filing of TDS returns?',
        a: 'Failure to file quarterly TDS returns (Form 24Q, 26Q, etc.) attracts a fee of ₹200 per day under Section 234E, capped at the total amount of TDS deducted.'
      },
      {
        q: 'What are Section 194IA, 194IB, and 194M?',
        a: 'These sections cover TDS deductions by individuals not liable to audit: 194IA for purchase of property (1% on >₹50L), 194IB for rent (5% on >₹50k/mo), and 194M for contractor/professional payments (5% on >₹50L/yr).'
      }
    ],
    takeaways: [
      'Always collect the payee\'s PAN card to avoid deducting tax at the high 20% penalty rate.',
      'Keep track of cumulative payments to a single vendor to capture aggregate threshold compliance (e.g. ₹1 Lakh limit for Section 194C).',
      'File TDS returns quarterly on time to avoid heavy daily late fees and interest charges.'
    ],
    citations: [
      { text: 'Income Tax Department of India - TDS Rates', url: 'https://www.incometaxindia.gov.in/' },
      { text: 'TIN-NSDL TDS Deposit Portal', url: 'https://www.tin-nsdl.com/' }
    ]
  },
  customs: {
    id: 'customs',
    title: 'Customs Duty & Landed Cost Calculator Guide',
    intro: 'Customs Duty is a tax collected on imports and exports of goods by the customs authorities of a country. For importers, calculating the total landed cost of cargo is vital to maintain profitable margins. In India, customs duty calculation involves multiple layers of duties, including Basic Customs Duty (BCD), Social Welfare Surcharge (SWS), and Integrated Goods and Services Tax (IGST). It is calculated on the Assessable Value, which is based on the CIF (Cost, Insurance, and Freight) value of the goods.',
    howItWorks: 'To calculate import costs, enter the product value (FOB), shipping/freight charges, and insurance. The calculator aggregates these to compute the Assessable Value (CIF). Next, enter the Basic Customs Duty rate (BCD, usually dependent on the HS Code), select if SWS is applicable (typically 10% of BCD), and input the IGST rate. The calculator determines the step-by-step duties and gives the final Landed Cost.',
    formula: `Customs duty calculations in India follow a sequential, cascading model:
1. **Assessable Value (AV)**:
   $$AV = \\text{FOB Value} + \\text{Freight} + \\text{Insurance}$$
2. **Basic Customs Duty (BCD)**:
   $$BCD = AV \\times \\frac{BCD\\%}{100}$$
3. **Social Welfare Surcharge (SWS)**:
   $$SWS = BCD \\times \\frac{SWS\\%}{100} \\quad (\\text{Usually } 10\\% \\text{ of BCD})$$
4. **Integrated GST (IGST) Base**:
   $$\\text{IGST Base} = AV + BCD + SWS$$
5. **IGST Amount**:
   $$IGST = \\text{IGST Base} \\times \\frac{IGST\\%}{100}$$
6. **Total Landed Cost**:
   $$\\text{Landed Cost} = AV + BCD + SWS + IGST + \\text{Other Surcharges}$$`,
    example: 'Suppose you import goods valued at FOB ₹1,000,000. Freight is ₹150,000 and Insurance is ₹10,000. The BCD rate is 10%, SWS is 10% of BCD, and IGST is 18%.\n\nStep 1: Calculate Assessable Value (AV):\nAV = 1,000,000 + 150,000 + 10,000 = ₹1,160,000.\n\nStep 2: Calculate BCD:\nBCD = 1,160,000 * 10% = ₹116,000.\n\nStep 3: Calculate SWS:\nSWS = 116,000 * 10% = ₹11,600.\n\nStep 4: Calculate IGST Base and IGST:\nIGST Base = 1,160,000 + 116,000 + 11,600 = ₹1,287,600.\nIGST = 1,287,600 * 18% = ₹231,768.\n\nStep 5: Calculate Total Landed Cost:\nLanded Cost = 1,160,000 + 116,000 + 11,600 + 231,768 = ₹1,519,368.\nTotal Duty payable is ₹359,368.',
    benefits: [
      'Enables importers to calculate exact cost of goods sold before placing purchase orders.',
      'Helps determine competitive pricing strategies in local markets by factoring in all import overheads.',
      'Prevents customs clearance clearance delay issues by preparing the exact fund requirements for custom duties.',
      'Identifies the tax-saving impact of Preferential Duty rates under Free Trade Agreements (FTAs).'
    ],
    limitations: [
      'Excludes local port handling charges, shipping line detention, warehousing fees, and customs broker charges.',
      'Does not automatically fetch HS codes or dynamic duty rates; user must enter the BCD and IGST rates manually.',
      'Assumes standard valuation rules, whereas customs authorities can reject invoice valuation and reassess goods values.'
    ],
    faqs: [
      {
        q: 'What is an HS Code and why is it important?',
        a: 'An HS Code (Harmonized System Code) is an internationally standardized system of names and numbers to classify traded products. It determines the tariff rates, regulatory compliance, and import restrictions on your goods.'
      },
      {
        q: 'Can GST registered businesses claim credit for IGST paid on imports?',
        a: 'Yes! Importers can claim Input Tax Credit (ITC) for the IGST paid at the time of customs clearance, which can be offset against their domestic sales GST liabilities. BCD and SWS are not claimable as ITC.'
      },
      {
        q: 'What is the ICEGATE portal?',
        a: 'ICEGATE (Indian Customs Electronic Gateway) is the national portal of Indian Customs that offers e-filing services, custom duty payments, track document status, and manifest filings.'
      },
      {
        q: 'What is a Bill of Entry?',
        a: 'A Bill of Entry is a legal document filed by importers or customs agents upon the arrival of goods, detailing the cargo nature, quantity, value, and origin, used by customs officers to assess and clear goods.'
      },
      {
        q: 'What are Preferential Duty Rates?',
        a: 'These are lower customs duty rates applicable to imports from countries with which India has signed a Free Trade Agreement (FTA) or Preferential Trade Agreement (PTA), subject to submitting a valid Certificate of Origin.'
      }
    ],
    takeaways: [
      'Always calculate landed cost on the CIF value (Assessable Value), not the FOB purchase price.',
      'Ensure your HS Code classification is accurate to avoid customs audit penalties and misclassifications.',
      'Verify if your import country qualifies for FTA duty exemptions to save significant capital.'
    ],
    citations: [
      { text: 'Central Board of Indirect Taxes and Customs (CBIC) Tariff', url: 'https://www.cbic.gov.in/' },
      { text: 'ICEGATE Custom Services', url: 'https://www.icegate.gov.in/' }
    ]
  },
  eligibility: {
    id: 'eligibility',
    title: 'Loan Eligibility Calculator & Guide',
    intro: 'Loan Eligibility determines the maximum amount of debt a financial institution is willing to lend to a borrower. Banks and housing finance companies assess a borrower\'s repayment capacity using metrics like monthly income, age, credit history, employment stability, and existing financial obligations. The core metric used is the Fixed Obligation to Income Ratio (FOIR), which represents the percentage of income that can safely go toward debt servicing, leaving the rest for lifestyle expenses.',
    howItWorks: 'To estimate your borrowing limit, enter your net monthly income (take-home salary), existing monthly EMIs (credit cards, personal loans, etc.), the interest rate you expect on the new loan, the loan tenure in years, and the bank\'s FOIR limit (typically ranges from 40% to 60%). The calculator computes your disposable EMI capacity and translates it into the maximum loan principal amount you can borrow.',
    formula: `The calculation proceeds in three stages:
1. **Maximum Allowable EMI Capacity**:
   $$\\text{Max EMI} = (\\text{Net Monthly Income} \\times \\text{FOIR\\%}) - \\text{Existing EMIs}$$
2. **Present Value / Loan Amount Calculation**:
   $$\\text{Loan Amount} = \\text{Max EMI} \\times \\frac{(1 + R)^N - 1}{R \\times (1 + R)^N}$$
   Where:
   - **R** is the monthly interest rate (Annual Rate / 12 / 100).
   - **N** is the tenure in months (years * 12).
   This is the standard financial amortization equation solved for the principal amount (P).`,
    example: 'Suppose you earn ₹100,000 net monthly salary, have ₹10,000 in existing EMIs, plan to take a loan at 9% interest for 20 years (240 months), and the bank applies a 50% FOIR limit.\n\nStep 1: Calculate monthly EMI budget:\nMax EMI = (₹100,000 * 50%) - ₹10,000 = ₹40,000.\n\nStep 2: Calculate monthly interest (R) and tenure (N):\nR = 9 / 12 / 100 = 0.0075\nN = 20 * 12 = 240 months\n\nStep 3: Solve for Loan Amount:\nLoan Amount = 40,000 * [((1+0.0075)^240 - 1) / (0.0075 * (1+0.0075)^240)]\nLoan Amount = 40,000 * [(6.009 - 1) / (0.0075 * 6.009)]\nLoan Amount = 40,000 * [5.009 / 0.04506] = 40,000 * 111.1449 = ₹4,445,798.\n\nYour estimated maximum eligible loan amount is approximately ₹44.45 Lakhs.',
    benefits: [
      'Prevents loan rejection by giving you a realistic picture of your borrowing capacity beforehand.',
      'Helps in matching property search budgets with actual bank credit limits.',
      'Allows testing how clearing existing small debts can instantly boost your eligibility for a larger loan.',
      'Provides a benchmark to negotiate interest rates and terms with lenders.'
    ],
    limitations: [
      'Credit score (CIBIL) is not factored in; a low credit score can reduce eligibility or lead to outright rejection regardless of high income.',
      'Property valuation is not considered; banks usually finance only 75-90% of the property value (LTV ratio), whichever is lower.',
      'Does not account for co-applicant income, which banks commonly aggregate to increase loan eligibility.'
    ],
    faqs: [
      {
        q: 'What is FOIR and how do banks set it?',
        a: 'Fixed Obligation to Income Ratio (FOIR) is the ratio of your total fixed monthly commitments (including the proposed loan EMI) to your net monthly income. Banks set it between 40-60% depending on your salary slab and employer category.'
      },
      {
        q: 'How can I increase my loan eligibility?',
        a: 'You can increase eligibility by adding a co-applicant (spouse/parents) with a clean income source, closing existing high-interest loans, choosing a longer repayment tenure, or declaring additional sources of income (rent, bonuses).'
      },
      {
        q: 'What is the LTV ratio?',
        a: 'Loan-to-Value (LTV) ratio is the percentage of the property value that the bank will finance. For home loans, it is capped at 75-90% depending on the loan size. You must pay the remaining amount as a down payment.'
      },
      {
        q: 'Does a low credit score impact eligibility?',
        a: 'Yes. A CIBIL score below 700 can lead to higher interest rates, reduced loan eligibility, or loan rejection because it indicates high default risk.'
      },
      {
        q: 'Can self-employed individuals calculate eligibility using this?',
        a: 'Yes, but self-employed individuals must calculate their Net Monthly Income by dividing their net annual business profit (after taxes) by 12, as reported in their latest Audited Income Tax Returns.'
      }
    ],
    takeaways: [
      'Keep your debt obligations (existing EMIs) low to unlock maximum home loan eligibility.',
      'Clear credit card dues and personal loans before applying for long-term home loans.',
      'Always aim for a credit score of 750+ to secure low-interest loans from top-tier lenders.'
    ],
    citations: [
      { text: 'Reserve Bank of India Master Circular on Loans', url: 'https://www.rbi.org.in/' },
      { text: 'CIBIL Score Information Portal', url: 'https://www.cibil.com/' }
    ]
  },
  'personal-loan': {
    id: 'personal-loan',
    title: 'Personal Loan EMI Calculator Guide',
    intro: 'A Personal Loan is an unsecured loan provided by banks and financial institutions without requiring collateral. Since personal loans carry higher default risk for lenders, interest rates are typically higher than home or car loans, ranging from 10% to 24%. Repayment is structured through monthly EMIs over a shorter tenure (1 to 5 years). Calculating personal loan EMIs helps you assess your repayment capacity, understand processing fees, and determine the actual net cash disbursed into your bank account.',
    howItWorks: 'Enter the personal loan amount, interest rate, repayment tenure in years (or months), and the bank\'s upfront processing fee percentage (usually 1-3% of loan amount). The calculator estimates the monthly payment, total interest cost, the processing fee amount deducted, and the net disburse amount.',
    formula: `Personal loan calculations involve interest amortization and upfront fee deductions:
1. **Monthly EMI**:
   $$\\text{EMI} = \\frac{P \\times R \\times (1 + R)^N}{(1 + R)^N - 1}$$
2. **Processing Fee (PF) Deduction**:
   $$\\text{PF Amount} = P \\times \\frac{\\text{Processing Fee Rate}}{100}$$
3. **Net Disbursed Cash**:
   $$\\text{Net Disbursal} = P - \\text{PF Amount}$$
   Where **P** is Principal, **R** is monthly interest rate, and **N** is tenure in months.`,
    example: 'Suppose you apply for a Personal Loan of ₹500,000 at an interest rate of 12% for a tenure of 3 years (36 months) with a processing fee of 2%.\n\nStep 1: Compute Monthly EMI:\nR = 12 / 12 / 100 = 0.01, N = 36.\nEMI = [500,000 * 0.01 * (1.01)^36] / [(1.01)^36 - 1] = ₹16,607 per month.\n\nStep 2: Compute Processing Fee:\nProcessing Fee = ₹500,000 * 2% = ₹10,000.\n\nStep 3: Compute Net Disbursal:\nNet Disbursed Amount = ₹500,000 - ₹10,000 = ₹490,000.\n\nStep 4: Compute Total Cost:\nTotal Payment = ₹16,607 * 36 = ₹597,858.\nTotal Interest component = ₹97,858. Actual total cost of credit = ₹97,858 (Interest) + ₹10,000 (Fee) = ₹107,858.',
    benefits: [
      'Helps determine the absolute cost of unsecured debt, including hidden processing fees.',
      'Allows comparing various personal loan offers on a common baseline (net cash received vs. total repaid).',
      'Provides a breakdown of the amortization schedule to track debt repayment milestones.',
      'Prevents borrowing beyond personal monthly cash flow limits.'
    ],
    limitations: [
      'Excludes additional charges such as stamp duty, loan documentation charges, insurance premium, and late fees.',
      'Assumes constant rate; some lenders offer floating personal loans or compound interest on defaults.',
      'Does not show pre-payment/foreclosure charges which can be high (up to 4-5% of principal) for unsecured loans.'
    ],
    faqs: [
      {
        q: 'Why are personal loan interest rates so high?',
        a: 'Because they are unsecured loans. Since there is no collateral (like property or gold) for the bank to seize in case of default, the bank charges a risk premium, resulting in higher interest rates.'
      },
      {
        q: 'Can I prepay or close my personal loan early?',
        a: 'Yes, but most banks have a lock-in period (usually 12 months) before prepayments are allowed, and they charge foreclosure fees ranging from 2% to 5% of the outstanding principal.'
      },
      {
        q: 'What credit score is needed for a personal loan?',
        a: 'Lenders prefer a CIBIL score of 720 or above. Higher scores also help you negotiate a lower interest rate and faster processing.'
      },
      {
        q: 'What is the processing fee and does it attract GST?',
        a: 'The processing fee is an upfront administrative charge deducted by the bank from the loan principal. In India, it is subject to an additional 18% GST, which is deducted along with the fee.'
      },
      {
        q: 'Can I use personal loans for tax deductions?',
        a: 'Generally, no. Personal loan interest is not tax-deductible unless you can prove the funds were used for home renovation (deductible under Section 24b) or business expansion.'
      }
    ],
    takeaways: [
      'Compare both the interest rate and the processing fee to find the cheapest personal loan.',
      'Unsecured debt should be kept to a minimum; personal loan EMIs should ideally not exceed 15-20% of your take-home pay.',
      'Negotiate with banks to waive or reduce processing fees, especially during festive seasons.'
    ],
    citations: [
      { text: 'RBI Fair Practices Code for Lenders', url: 'https://www.rbi.org.in/' },
      { text: 'National Consumer Helpline Portal', url: 'https://consumerhelpline.gov.in/' }
    ]
  },
  'home-loan': {
    id: 'home-loan',
    title: 'Home Loan EMI & Down Payment Guide',
    intro: 'A Home Loan is a secured loan used to purchase residential property. The property acts as collateral, which enables banks to offer competitive interest rates (typically between 8% and 10%) and extended repayment terms (up to 30 years). Calculating home loan EMIs, down payments, and total interest charges is crucial to ensure you buy a home that is financially sustainable over decades without straining your family budget.',
    howItWorks: 'To model your home loan, enter the total property purchase value, your planned down payment (usually a minimum of 10% to 20%), the expected annual interest rate, and the repayment tenure in years. The calculator calculates the loan amount required, the monthly EMI, total interest payable, and the total cost of the property (down payment + loan principal + loan interest).',
    formula: `Home loan calculation operates on the net principal after down payment:
1. **Loan Principal (P)**:
   $$P = \\text{Property Value} - \\text{Down Payment}$$
2. **Monthly EMI**:
   $$\\text{EMI} = \\frac{P \\times R \\times (1 + R)^N}{(1 + R)^N - 1}$$
3. **Total Property Cost**:
   $$\\text{Total Cost} = \\text{Down Payment} + P + \\text{Total Interest}$$
   Where **R** is monthly interest rate and **N** is tenure in months.`,
    example: 'Suppose you buy a flat worth ₹5,000,000 (₹50 Lakhs). You make a 20% down payment (₹1,000,000), leaving a loan principal of ₹4,000,000 (₹40 Lakhs). The interest rate is 8.5% for a 20-year tenure (240 months).\n\nStep 1: Calculate Loan Principal:\nPrincipal (P) = ₹50 Lakhs - ₹10 Lakhs = ₹40 Lakhs.\n\nStep 2: Compute Monthly EMI:\nR = 8.5 / 12 / 100 = 0.0070833, N = 240.\nEMI = [4,000,000 * 0.0070833 * (1.0070833)^240] / [(1.0070833)^240 - 1] = ₹34,713 per month.\n\nStep 3: Calculate Total Cost:\nTotal Repayment = ₹34,713 * 240 = ₹8,331,120.\nTotal Interest = ₹4,331,120.\nTotal Landed Property Cost = ₹1,000,000 (Down payment) + ₹8,331,120 = ₹9,331,120.',
    benefits: [
      'Estimates the exact down payment required to keep monthly EMIs affordable.',
      'Shows the immense impact of long-term compounding interest over 20-30 years.',
      'Helps plan early prepayments which can shave years off the tenure and save millions in interest.',
      'Models tax-saving strategies by balancing interest vs. principal repayment ratios.'
    ],
    limitations: [
      'Excludes auxiliary property costs such as registration charges, stamp duty (usually 5-7%), GST on under-construction flats, and maintenance deposits.',
      'Does not calculate the tax savings under Section 80C and Section 24(b) automatically.',
      'Assumes a flat interest rate, whereas almost all home loans in India are floating-rate (External Benchmark Linked Rates - EBLR).'
    ],
    faqs: [
      {
        q: 'What is EBLR and how does it impact home loans?',
        a: 'External Benchmark Linked Rate (EBLR) is an interest rate structure where loan rates are linked directly to external benchmarks (like the RBI Repo Rate). If the RBI changes repo rates, banks must change EBLR rates within 3 months, altering your EMI or tenure.'
      },
      {
        q: 'How much tax can I save on a Home Loan?',
        a: 'Under the Old Tax Regime, you can deduct up to ₹1.5 Lakhs of principal repayment under Section 80C, and up to ₹2 Lakhs of interest payment under Section 24(b) every financial year. Surcharge and exemptions do not apply under the New Tax Regime.'
      },
      {
        q: 'What is the Pre-EMI phase in home loans?',
        a: 'For under-construction properties, banks disburse loans in stages. During this time, the borrower pays only the interest accrued on the disbursed amount (called Pre-EMI) until the construction is complete, after which full EMIs start.'
      },
      {
        q: 'Should I choose a 15-year or a 30-year home loan?',
        a: 'A 15-year loan is far cheaper in terms of interest costs, but requires higher monthly EMIs. A 30-year loan keeps EMIs lower but costs more than double in interest. Opt for a 20-year loan and make prepayments to achieve the best balance.'
      },
      {
        q: 'Can banks charge prepayment penalties on home loans?',
        a: 'According to RBI guidelines, banks cannot levy prepayment or foreclosure charges on individual floating-rate home loans. Fixed-rate home loans, however, may still attract penalties.'
      }
    ],
    takeaways: [
      'Increase down payment to reduce loan principal and keep EMIs comfortable.',
      'Keep track of benchmark rates (Repo Rate) to forecast floating interest rate adjustments.',
      'Claim home loan interest and principal deductions under Section 24(b) and 80C if you file under the Old Regime.'
    ],
    citations: [
      { text: 'RBI Housing Loan Interest Rate Directives', url: 'https://www.rbi.org.in/' },
      { text: 'Pradhan Mantri Awas Yojana (PMAY) Guidelines', url: 'https://pmay-urban.gov.in/' }
    ]
  },
  tax: {
    id: 'tax',
    title: 'Income Tax Estimator & Slabs Guide (FY 2025-26)',
    intro: 'The Income Tax Estimator helps individual taxpayers compute their annual tax liabilities and compare the financial impact of the Old Tax Regime versus the New Tax Regime in India. Following the Union Budget 2025 updates, the New Tax Regime has been made more attractive with revised tax slabs, a higher standard deduction of ₹75,000, and a tax rebate under Section 87A for taxable incomes up to ₹12 Lakhs. The Old Tax Regime remains functional, allowing tax exemptions on investments made under Section 80C, 80D, and home loans under Section 24b.',
    howItWorks: 'To estimate your tax liability, enter your gross annual salary (including allowances), income from other sources (such as interest, rent, capital gains), and your total tax-saving deductions under Section 80C, 80D, 24b, or Section 80TTA. The calculator automatically applies the specific tax slab structures of both regimes, includes the standard deductions, checks for rebate eligibility under Section 87A, computes the 4% Health & Education Cess, and displays a side-by-side comparison of your net tax payable.',
    formula: `Tax computation is calculated using progressive slab rates:
1. **Taxable Income (Old Regime)**:
   $$\\text{Taxable Income} = \\text{Gross Income} - \\text{Deductions (80C, 80D, 24b, etc.)} - \\text{Standard Deduction (₹50,000)}$$
2. **Taxable Income (New Regime)**:
   $$\\text{Taxable Income} = \\text{Gross Income} - \\text{Standard Deduction (₹75,000)}$$
3. **Rebate Section 87A**:
   - Under Old Regime: Tax is zero if Taxable Income $\\le$ ₹5 Lakhs (max rebate ₹12,500).
   - Under New Regime (Budget 2025): Tax is zero if Taxable Income $\\le$ ₹12 Lakhs (with marginal relief calculations).
4. **Final Tax Payable**:
   $$\\text{Total Tax} = (\\text{Slab Tax} - \\text{Rebate 87A}) \\times 1.04 \\quad (\\text{includes 4\\% Cess})$$`,
    example: 'Suppose you have a gross annual income of ₹1,000,000 (₹10 Lakhs). You invest ₹1.5 Lakhs in Section 80C and ₹25,000 in Section 80D under the Old Regime.\n\n**New Regime Calculation**:\nGross Income = ₹1,000,000\nStandard Deduction = ₹75,000\nTaxable Income = ₹925,000\nSlabs (Budget 2025): up to 4L: 0%, 4-8L: 5% (20k), 8-12L: 10% (12.5k on 1.25L). Total Slab Tax = ₹32,500.\nRebate Sec 87A: Applicable since taxable income ₹9.25L is less than ₹12L. Rebate reduces tax to ₹0. Net tax = ₹0.\n\n**Old Regime Calculation**:\nGross Income = ₹1,000,000\nDeductions = 1.5L (80C) + 25k (80D) + 50k (Std Ded) = ₹2.25 Lakhs.\nTaxable Income = ₹775,000\nSlabs: up to 2.5L: 0%, 2.5-5L: 5% (12.5k), 5-10L: 20% (55k on 2.75L). Total Slab Tax = ₹67,500.\nRebate Sec 87A: Not applicable since taxable income ₹7.75L > ₹5L.\nCess = 67,500 * 4% = ₹2,700.\nTotal Tax = ₹70,200. You save ₹70,200 by choosing the New Regime.',
    benefits: [
      'Allows side-by-side comparison of the Old and New tax slabs to identify the optimal choice.',
      'Includes updated rebates (Section 87A up to ₹12L under New Regime) as per Budget 2025.',
      'Helps plan tax-saving investments (PPF, ELSS, Insurance) before the financial year ends.',
      'Provides a breakdown of tax slab slabs, cess, and rebates for audit trail clarity.'
    ],
    limitations: [
      'Excludes complex capital gains tax calculations (short-term/long-term capital gains on shares/property).',
      'Assumes the user is under 60 years of age (slabs for senior and super-senior citizens are not customized).',
      'Does not verify whether your employers have blocked certain exemptions in their payroll processing.'
    ],
    faqs: [
      {
        q: 'Which tax regime is better for salaried employees in FY 2025-26?',
        a: 'For most taxpayers with annual incomes up to ₹12-15 Lakhs who do not have substantial home loan interest deductions, the New Tax Regime is usually better due to the standard deduction increase to ₹75,000 and the tax rebate up to ₹12 Lakhs.'
      },
      {
        q: 'Can I switch between the Old and New tax regimes every year?',
        a: 'Salaried individuals who do not have business or professional income can switch between the Old and New regimes every year at the time of filing their ITR. Those with business income can only switch once in a lifetime.'
      },
      {
        q: 'What is the standard deduction in salary?',
        a: 'The standard deduction is a flat deduction allowed from salary income before tax calculations. In FY 2025-26, it is ₹75,000 under the New Tax Regime and ₹50,000 under the Old Tax Regime.'
      },
      {
        q: 'What is the marginal relief under Section 87A?',
        a: 'Marginal relief is a mechanism that prevents situations where an investor earning slightly above the tax rebate limit (e.g. ₹12,05,000) pays more in tax than the excess income earned. It caps the tax to the excess income amount.'
      },
      {
        q: 'What deductions are allowed under the New Tax Regime?',
        a: 'Very few. The New Tax Regime allows the standard deduction (₹75,000), family pension deduction, and employer contributions to NPS under Section 80CCD(2). Deductions like 80C, 80D, HRA exemption, and LTA are blocked.'
      }
    ],
    takeaways: [
      'Verify if your tax-saving deductions under Section 80C/80D exceed ₹2.5-3 Lakhs; if not, the New Regime is likely more beneficial.',
      'Make sure you declare your regime choice to your employer at the beginning of the financial year to avoid excess TDS deductions.',
      'File your tax returns before July 31st to avoid late fee penalties under Section 234F.'
    ],
    citations: [
      { text: 'Income Tax India e-Filing Portal', url: 'https://www.incometax.gov.in/' },
      { text: 'Ministry of Finance Union Budget 2025 Announcements', url: 'https://www.indiabudget.gov.in/' }
    ]
  },
  salary: {
    id: 'salary',
    title: 'Salary Calculator & Take-Home Estimator',
    intro: 'The Salary Calculator computes your monthly net take-home salary based on your Gross Cost to Company (CTC) structure. In India, a salary package is split into multiple allowances like Basic Salary, House Rent Allowance (HRA), Special Allowance, and Leave Travel Allowance (LTA). It also includes statutory deductions such as Employee Provident Fund (EPF), Professional Tax (PT), and Income Tax TDS. Understanding this split helps you negotiate job offers effectively and know the actual cash flow you will receive in your bank account.',
    howItWorks: 'Enter your gross annual CTC or monthly gross salary, along with allowances (Basic, HRA, etc.) and statutory deduction settings (EPF contribution rates). The calculator computes your annual and monthly breakdown, calculates employee EPF contributions, deducts Professional Tax, estimates income tax TDS, and calculates the final Net Monthly Take-Home Salary.',
    formula: `Salary and take-home calculations follow this flow:
1. **Gross Monthly Salary**: Sum of Basic, HRA, and allowances.
2. **Statutory EPF Contribution**:
   $$\\text{EPF} = \\text{Basic Salary} \\times 12\\% \\quad (\\text{capped at } 12\\% \\text{ of Basic, or statutory limits})$$
3. **Professional Tax (PT)**: Flat deduction dependent on state rules (typically ₹200 per month).
4. **Net Take-Home Salary**:
   $$\\text{Net Take-Home} = \\text{Gross Monthly Salary} - \\text{EPF (Employee)} - \\text{PT} - \\text{Monthly Income Tax TDS}$$`,
    example: 'Suppose you have a monthly gross salary of ₹80,000, where Basic Salary is ₹40,000, HRA is ₹20,000, and Special Allowance is ₹20,000. Your monthly TDS is calculated at ₹3,000, and PT is ₹200.\n\nStep 1: Calculate EPF Contribution:\nEPF = 12% of Basic = 12% of ₹40,000 = ₹4,800.\n\nStep 2: Total monthly deductions:\nDeductions = EPF (₹4,800) + PT (₹200) + TDS (₹3,000) = ₹8,000.\n\nStep 3: Calculate Net Take-Home Salary:\nTake-home = ₹80,000 - ₹8,000 = ₹72,000 per month.',
    benefits: [
      'Helps job seekers evaluate job offers by translating a high CTC into actual cash-in-hand.',
      'Ensures transparency by showing how much goes toward retirement savings (EPF) and government taxes.',
      'Helps plan rent payments based on HRA allocations and estimated HRA tax exemptions.',
      'Assists businesses in structuring compliant salary structures for employees.'
    ],
    limitations: [
      'Excludes non-cash CTC components like employer provident fund contributions, gratuity, medical insurance premium, and stock options (ESOPs).',
      'Professional Tax rates vary by state (ranging from ₹150 to ₹250), which the calculator uses as a standard ₹200 fee.',
      'Income Tax TDS is an estimate; actual tax deductions depend on tax regime choice and investment declarations.'
    ],
    faqs: [
      {
        q: 'What is the difference between CTC and take-home salary?',
        a: 'Cost to Company (CTC) is the total annual cost a company incurs on an employee, including salary, benefits, retirement funds, and perks. Take-home salary is the actual net cash you receive in your bank account after tax and statutory deductions.'
      },
      {
        q: 'Is EPF contribution mandatory?',
        a: 'Yes, for establishments with 20 or more employees, EPF is mandatory for employees earning a basic salary up to ₹15,000. For salaries above that, employees can opt-in or contribute based on actual basic salary.'
      },
      {
        q: 'How is HRA tax exemption calculated?',
        a: 'HRA tax exemption is the minimum of three values: (1) Actual HRA received, (2) 50% of basic salary for metro cities (40% for non-metros), or (3) Rent paid minus 10% of basic salary. This is only available under the Old Tax Regime.'
      },
      {
        q: 'What is Gratuity in a salary structure?',
        a: 'Gratuity is a statutory retirement benefit paid by an employer to an employee who has completed at least 5 years of continuous service in the organization, calculated as 15 days of basic salary for every year of service.'
      },
      {
        q: 'Why does my employer deduct Professional Tax?',
        a: 'Professional Tax is a state-level tax levied on individuals earning income through employment, trade, or profession. It is capped at a maximum of ₹2,500 per year per employee.'
      }
    ],
    takeaways: [
      'Always focus on the Net Take-Home component of your salary during salary negotiations, not just the gross CTC.',
      'Understand the retirement contribution (EPF) as it builds a tax-free retirement corpus for your future.',
      'Structure salary components (like HRA and food coupons) to maximize tax savings if you are under the Old Regime.'
    ],
    citations: [
      { text: 'Employees Provident Fund Organisation (EPFO) Rules', url: 'https://www.epfindia.gov.in/' },
      { text: 'Income Tax Rules for HRA Exemptions', url: 'https://www.incometaxindia.gov.in/' }
    ]
  },
  gst: {
    id: 'gst',
    title: 'Goods and Services Tax (GST) Calculator Guide',
    intro: 'The Goods and Services Tax (GST) is an indirect, multi-stage, destination-based tax levied on the supply of goods and services in India. Introduced in 2017, it replaced multiple state and federal taxes like VAT, Service Tax, and Excise Duty. GST is split into Central GST (CGST) and State GST (SGST) for transactions within a single state, and Integrated GST (IGST) for transactions between different states. Understanding GST calculations is critical for merchants to invoice correctly and for consumers to know the tax share in their purchases.',
    howItWorks: 'To use the GST calculator, enter the base transaction amount, select the applicable GST slab rate (standard slabs are 5%, 12%, 18%, and 28%), and choose whether the calculation is inclusive or exclusive of GST. The calculator instantly determines the net amount, GST amount (split into CGST and SGST, or IGST), and the gross total amount.',
    formula: `GST calculations depend on the tax type:
1. **GST Exclusive (Tax added to base)**:
   $$\\text{GST Amount} = \\text{Base Amount} \\times \\frac{\\text{GST Rate}}{100}$$
   $$\\text{Total Amount} = \\text{Base Amount} + \\text{GST Amount}$$
2. **GST Inclusive (Tax already in total)**:
   $$\\text{Base Amount} = \\frac{\\text{Total Amount}}{1 + (\\text{GST Rate} / 100)}$$
   $$\\text{GST Amount} = \\text{Total Amount} - \\text{Base Amount}$$
For local sales, CGST and SGST are each exactly 50% of the total GST amount. For interstate sales, IGST equals 100% of the GST amount.`,
    example: 'Suppose you buy an electronic item for a total price of ₹11,800, which includes 18% GST (GST Inclusive).\n\nStep 1: Calculate the base price (excluding GST):\nBase Amount = ₹11,800 / (1 + 0.18) = ₹11,800 / 1.18 = ₹10,000.\n\nStep 2: Calculate the GST amount:\nGST Amount = ₹11,800 - ₹10,000 = ₹1,800.\n\nStep 3: Split the GST (assuming local sale):\nCGST (9%) = ₹900. SGST (9%) = ₹900.\n\nIf the sale was GST Exclusive on a ₹10,000 base, the GST would be ₹10,000 * 18% = ₹1,800, making the total price ₹11,800.',
    benefits: [
      'Allows business owners to draft precise tax invoices for customers.',
      'Helps consumers verify if they are being overcharged on tax inclusive products.',
      'Saves time by providing instant split of CGST, SGST, and IGST components.',
      'Ensures compliance with standard Indian tax rate structures.'
    ],
    limitations: [
      'Does not calculate Input Tax Credit (ITC) offsets for tax filings.',
      'Excludes complex product classifications and compensation cess (applicable to luxury items like cars and aerated drinks).',
      'Does not generate standard JSON-LD e-invoice code or connect to the GST Common Portal.'
    ],
    faqs: [
      {
        q: 'What is the difference between CGST, SGST, and IGST?',
        a: 'CGST (Central GST) and SGST (State GST) are levied on sales within the same state, split equally. IGST (Integrated GST) is levied on interstate sales (between different states) and is collected by the Central Government.'
      },
      {
        q: 'What is Input Tax Credit (ITC) in GST?',
        a: 'Input Tax Credit allows a business to reduce the GST they owe on sales by the amount of GST they already paid on purchases. This prevents cascading taxation (tax on tax).'
      },
      {
        q: 'What is a GST composition scheme?',
        a: 'The Composition Scheme is a simple option for small businesses with turnover up to ₹1.5 Crore. They can pay GST at a flat rate (1% to 6%) on their turnover and file quarterly returns, but they cannot claim Input Tax Credit.'
      },
      {
        q: 'Is GST levied on all goods and services in India?',
        a: 'No. Certain goods like alcohol for human consumption, petroleum products (crude oil, petrol, diesel, aviation fuel, natural gas), and electricity are kept outside the scope of GST and are taxed under state levies.'
      },
      {
        q: 'What is the GST registration threshold for businesses?',
        a: 'Businesses supplying goods must register for GST if their annual turnover exceeds ₹40 Lakhs (₹20 Lakhs for hill and northeastern states). For service providers, the registration threshold is ₹20 Lakhs (₹10 Lakhs for special states).'
      }
    ],
    takeaways: [
      'Always confirm if a quoted price is GST inclusive or exclusive to avoid pricing surprises.',
      'GST-registered businesses can claim Input Tax Credit on business-related purchases, reducing their overall tax burden.',
      'Ensure proper invoice split of CGST and SGST for local transactions, or IGST for out-of-state deals.'
    ],
    citations: [
      { text: 'Goods and Services Tax Council (GSTN) Portal', url: 'https://www.gst.gov.in/' },
      { text: 'CBIC GST Law and Rates', url: 'https://www.cbic.gov.in/' }
    ]
  },
  fd: {
    id: 'fd',
    title: 'Fixed Deposit (FD) Calculator Guide',
    intro: 'A Fixed Deposit (FD) is a secure financial instrument offered by banks and non-banking financial companies (NBFCs), providing a guaranteed rate of interest higher than a regular savings account. FDs have a set maturity date, with tenures ranging from 7 days to 10 years. FDs are a cornerstone of conservative financial planning, offering safety of capital and fixed returns, compounded quarterly or monthly in accordance with bank guidelines.',
    howItWorks: 'To calculate FD maturity, enter the deposit amount, the annual interest rate offered by the bank, the tenure (in years, months, or days), and select the compounding frequency (compounded quarterly, monthly, half-yearly, or simple interest). The calculator determines the final maturity amount and the total interest earned over the tenure.',
    formula: `Fixed deposit compounding uses the standard compound interest formula:
$$A = P \\times \\left(1 + \\frac{r}{n}\\right)^{n \\times t}$$
Where:
- **A** is the Maturity Amount.
- **P** is the Principal Deposit Amount.
- **r** is the Annual Interest Rate (expressed as a decimal, e.g., 7% = 0.07).
- **n** is the Compounding Frequency per year (n = 4 for quarterly, n = 12 for monthly, n = 1 for yearly).
- **t** is the Time/Tenure in Years (e.g., 18 months = 1.5 years).
For simple interest FDs, the formula is: $A = P \\times (1 + r \\times t)$.`,
    example: 'Suppose you invest ₹100,000 in a Fixed Deposit for 2 years at an interest rate of 7.5%, compounded quarterly.\n\nStep 1: Identify parameters:\nP = ₹100,000, r = 0.075, n = 4 (quarterly), t = 2.\n\nStep 2: Apply the compound interest formula:\nA = 100,000 * (1 + 0.075 / 4)^(4 * 2)\nA = 100,000 * (1 + 0.01875)^8\nA = 100,000 * (1.01875)^8 = 100,000 * 1.16022 = ₹116,022.\n\nTotal interest earned over 2 years is ₹116,022 - ₹100,000 = ₹16,022.',
    benefits: [
      'Guarantees returns on investment, shielding capital from stock market volatility.',
      'Offers flexible tenures and payout options (monthly, quarterly, or on maturity).',
      'Provides high liquidity through premature withdrawals (subject to minor penalty fees).',
      'Allows saving tax through 5-year Tax-Saving FDs (eligible under Section 80C).'
    ],
    limitations: [
      'FD interest is fully taxable under your income tax slab, which reduces the real post-tax rate of return.',
      'FD returns may not beat inflation over the long term, resulting in negative real wealth growth.',
      'Premature withdrawal attracts a penalty of 0.5% to 1.0% reduction in the interest rate.'
    ],
    faqs: [
      {
        q: 'What is Tax Deducted at Source (TDS) on Fixed Deposits?',
        a: 'Banks deduct TDS at 10% on interest earned if it exceeds ₹40,000 in a financial year (₹50,000 for senior citizens). If you do not provide your PAN, TDS is deducted at 20%.'
      },
      {
        q: 'What are Form 15G and Form 15H?',
        a: 'These are self-declaration forms submitted to the bank to request no TDS deduction on FD interest. Form 15G is for individuals below 60 years whose taxable income is below the exemption limit, and Form 15H is for senior citizens.'
      },
      {
        q: 'Are bank FDs safe from defaults?',
        a: 'Yes, up to a limit. Under the Deposit Insurance and Credit Guarantee Corporation (DICGC), each depositor in a bank is insured up to a maximum of ₹5 Lakhs (covering both principal and interest) in case of bank default.'
      },
      {
        q: 'What is a Tax-Saving Fixed Deposit?',
        a: 'A Tax-Saving FD has a lock-in period of 5 years. Investments up to ₹1.5 Lakhs are eligible for deduction under Section 80C. Premature withdrawals or loans against these deposits are not allowed.'
      },
      {
        q: 'How does cumulative FD differ from non-cumulative FD?',
        a: 'In a cumulative FD, the interest is reinvested and paid along with the principal at maturity, maximizing compound interest. In a non-cumulative FD, interest is paid out periodically (monthly/quarterly) to provide regular income.'
      }
    ],
    takeaways: [
      'Choose cumulative FDs if you want to grow wealth, and non-cumulative FDs if you need monthly or quarterly cash flow.',
      'Submit Form 15G/15H to your bank at the beginning of the financial year if your total taxable income falls below exemption limits.',
      'Do not park your entire long-term portfolio in FDs, as inflation and high tax slabs will erode your purchasing power.'
    ],
    citations: [
      { text: 'Deposit Insurance and Credit Guarantee Corporation (DICGC) Portal', url: 'https://www.dicgc.org.in/' },
      { text: 'Reserve Bank of India Interest Rate Guidelines', url: 'https://www.rbi.org.in/' }
    ]
  },
  retirement: {
    id: 'retirement',
    title: 'Retirement Corpus Planner & Inflation Guide',
    intro: 'The Retirement Corpus Planner helps you calculate the total wealth nest egg required to maintain your current lifestyle post-retirement. As life expectancy increases and inflation continually erodes the purchasing power of money, planning for retirement early is essential. A monthly expense of ₹50,000 today will expand significantly in 30 years. This calculator helps you determine your target retirement corpus and the monthly savings required to build it.',
    howItWorks: 'To plan your retirement, enter your current age, your target retirement age, your current monthly lifestyle expenses, the expected inflation rate (typically 5-7% in India), and the expected rate of return on your investments before and after retirement. The calculator estimates your life expectancy, projects your expenses at retirement, computes the target corpus needed to sustain you, and estimates the monthly savings required to hit that goal.',
    formula: `Retirement planning uses multi-step inflation and annuity equations:
1. **Monthly Expenses at Retirement ($E_r$)**:
   $$E_r = E_{current} \\times (1 + f)^{t}$$
   Where **f** is the inflation rate, and **t** is the years to retirement (Retirement Age - Current Age).
2. **Inflation-Adjusted Return Rate ($r_a$) during retirement**:
   $$r_a = \\frac{1 + r_{post}}{1 + f} - 1$$
   Where $r_{post}$ is the post-retirement investment return rate.
3. **Target Retirement Corpus (C)**:
   $$C = E_r \\times 12 \\times \\frac{1 - (1 + r_a)^{-n}}{r_a}$$
   Where **n** is the retirement duration in years (Life Expectancy - Retirement Age).`,
    example: 'Suppose you are 30 years old, plan to retire at 60 (30 years to save), and live until 85 (25 years in retirement). Your monthly expense today is ₹30,000. Inflation is 6%, pre-retirement return is 12%, and post-retirement return is 8%.\n\nStep 1: Calculate monthly expenses at retirement:\n$E_r$ = 30,000 * (1 + 0.06)^30 = ₹172,305 per month.\n\nStep 2: Calculate inflation-adjusted return rate ($r_a$):\n$r_a$ = (1 + 0.08) / (1 + 0.06) - 1 = 1.886% per annum = 0.01886.\n\nStep 3: Calculate target corpus (C):\nC = 172,305 * 12 * [(1 - (1 + 0.01886)^-25) / 0.01886] = ₹40,845,900 (~₹4.08 Crore).\n\nStep 4: Compute monthly savings required:\nUsing the sinking fund formula at 12% pre-retirement return over 30 years, you need to invest approximately ₹11,300 per month to build this ₹4.08 Crore corpus.',
    benefits: [
      'Provides a realistic assessment of the future cost of living, avoiding underestimation due to inflation.',
      'Identifies the exact monthly saving rate required to achieve financial independence.',
      'Helps adjust asset allocation between equity (pre-retirement) and debt (post-retirement).',
      'Enables tracking retirement readiness as you accumulate assets over time.'
    ],
    limitations: [
      'Assumes a constant inflation rate and life expectancy; unexpected medical crises or hyperinflation can strain the corpus.',
      'Excludes taxes on retirement payouts (LTCG on mutual funds, taxation of NPS annuity/PF withdrawal).',
      'Assumes no inheritance or property liquidations, which can serve as buffer funds.'
    ],
    faqs: [
      {
        q: 'Why should I factor inflation into retirement planning?',
        a: 'Because inflation reduces the value of money. At 6% annual inflation, prices double every 12 years. If you need ₹50,000 a month today, you will need ₹2.87 Lakhs a month in 30 years to buy the exact same goods.'
      },
      {
        q: 'What is the 4% rule in retirement planning?',
        a: 'The 4% rule states that if you withdraw 4% of your total retirement corpus in the first year, and adjust the withdrawal for inflation every year after, your retirement nest egg should last at least 30 years.'
      },
      {
        q: 'How does National Pension System (NPS) help in retirement?',
        a: 'NPS is a government-backed voluntary pension scheme. It invests in equity, corporate debt, and government securities. At age 60, you can withdraw 60% tax-free lump sum, and the remaining 40% must be used to purchase an annuity to receive a monthly pension.'
      },
      {
        q: 'What is a safe asset class for post-retirement investments?',
        a: 'Post-retirement, capital preservation is primary. Safe options in India include the Senior Citizens Savings Scheme (SCSS), PM Vaya Vandana Yojana (PMVVY), RBI Floating Rate Bonds, and debt mutual funds.'
      },
      {
        q: 'Should I invest in equities for retirement if I am in my 40s?',
        a: 'Yes. Equity is the only asset class that reliably beats inflation over the long term. You should follow an asset allocation rule like "100 minus age" for equity allocation, shifting slowly to debt as retirement approaches.'
      }
    ],
    takeaways: [
      'Start planning in your 20s or 30s to take advantage of compounding returns; delaying by 10 years can triple the required savings rate.',
      'Review your retirement corpus requirements every 3-5 years to adjust for lifestyle changes and inflation trends.',
      'Focus on tax-efficient accumulation tools like EPF, PPF, NPS, and equity mutual funds.'
    ],
    citations: [
      { text: 'Pension Fund Regulatory and Development Authority (PFRDA) NPS Portal', url: 'https://www.pfrda.org.in/' },
      { text: 'RBI Retail Direct Scheme for Safe Debt Assets', url: 'https://rbiretaildirect.org.in/' }
    ]
  },
  'savings-goal': {
    id: 'savings-goal',
    title: 'Savings Goal Planner & Target Wealth Guide',
    intro: 'The Savings Goal Planner helps you calculate the monthly savings required to accumulate a specific target amount within a set time frame. Whether you are planning a down payment on a house, purchasing a car, funding child education, or planning a vacation, setting a target and identifying the monthly savings rate is key. By investing monthly and earning compound interest, you can achieve your goals much faster than saving in a non-interest savings account.',
    howItWorks: 'To plan your savings goal, enter the target amount you need, the time horizon (in years or months) over which you wish to accumulate the funds, and the expected annual interest rate of the investment asset class. The calculator computes the total amount you will invest, the interest earned, and the required monthly contribution.',
    formula: `The required monthly savings (S) is calculated using the sinking fund equation:
$$S = A \\times \\frac{i}{(1 + i)^n - 1} \\times \\frac{1}{1 + i}$$
Where:
- **A** is the Target Savings Goal.
- **i** is the Periodic (Monthly) Interest Rate (Annual Rate / 12 / 100).
- **n** is the Total Number of Months (years * 12).
This formula solves for the monthly annuity payment needed to compound into the target future value (A).`,
    example: 'Suppose you want to accumulate ₹1,500,000 (₹15 Lakhs) in 5 years (60 months) for a child\'s higher education. You expect to invest in a hybrid mutual fund earning 10% annual return.\n\nStep 1: Identify parameters:\nA = ₹1,500,000, i = 10 / 12 / 100 = 0.008333, n = 60.\n\nStep 2: Apply the sinking fund formula:\nS = 1,500,000 * [0.008333 / ((1 + 0.008333)^60 - 1)] * (1 / (1 + 0.008333))\nS = 1,500,000 * [0.008333 / (1.6453 - 1)] * (1 / 1.008333)\nS = 1,500,000 * [0.008333 / 0.6453] * 0.99173\nS = 1,500,000 * 0.012913 * 0.99173 = ₹19,209 per month.\n\nTotal Invested: ₹1,152,540. Interest Earned: ₹347,460. Total Value: ₹1,500,000.',
    benefits: [
      'Translates vague financial dreams into concrete, actionable monthly savings goals.',
      'Helps select the right investment assets based on target timelines (short-term vs. long-term).',
      'Avoids under-saving or over-saving by aligning contributions with expected compounding rates.',
      'Shows the proportion of your goal funded by interest versus your own contributions.'
    ],
    limitations: [
      'Assumes a constant interest rate; actual asset returns (especially equities) will fluctuate.',
      'Excludes taxes on gains (LTCG/STCG) and investment expenses (mutual fund expense ratios).',
      'Does not account for inflation, which may increase the cost of your goal by the time you reach it.'
    ],
    faqs: [
      {
        q: 'What is the best investment asset for a short-term goal (under 3 years)?',
        a: 'For short-term goals, capital safety is essential. Avoid equities. Choose fixed deposits, recurring deposits, or short-term debt/liquid mutual funds.'
      },
      {
        q: 'What is the best investment asset for a long-term goal (above 5 years)?',
        a: 'For long-term goals, choose equity-oriented investments like index mutual funds, diversified equity funds, or PPF. Equities offer higher returns that beat inflation over long durations.'
      },
      {
        q: 'What is a Sinking Fund?',
        a: 'A Sinking Fund is a strategic fund created by regularly setting aside money for a specific future expense or debt payoff, ensuring you do not experience a cash crunch when the liability occurs.'
      },
      {
        q: 'Should I prioritize emergency savings over long-term goals?',
        a: 'Yes, always. Build an emergency fund covering 3-6 months of expenses before dedicating cash to long-term goals, preventing you from disrupting your investments during crises.'
      },
      {
        q: 'Can I set up automated payments for my savings goals?',
        a: 'Yes, you can set up automated monthly transfers or recurring mandates (SIPs, RDs) with your bank to automatically route funds to your goal portfolios on paydays.'
      }
    ],
    takeaways: [
      'Write down each financial goal with a target value and timeline to build saving discipline.',
      'Automate your monthly contributions immediately after salary credit to avoid impulse spending.',
      'Review and rebalance your goal portfolios annually to keep them aligned with target dates.'
    ],
    citations: [
      { text: 'SEBI Investor Education on Goal Setting', url: 'https://investor.sebi.gov.in/' },
      { text: 'Association of Mutual Funds in India Goal Guides', url: 'https://www.amfiindia.com/' }
    ]
  }
};

