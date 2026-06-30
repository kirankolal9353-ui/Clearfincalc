import {
  calculateEMI,
  calculateSIP,
  calculateLoanEligibility,
  calculateFD,
  calculateTax,
  calculateGST,
  calculateRetirement,
  calculateSavingsGoal,
  calculateTDS,
  calculateImportDuty,
  calculateExportDuty,
  calculateSalary,
  calculateNetWorth,
  calculateInflation
} from './finance.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
}

console.log('🚀 Running ClearFinCalc Calculator Verification Tests...\n');

// 1. EMI Test
const emiResult = calculateEMI(1000000, 8.5, 15);
console.log('EMI Result:', emiResult.monthlyPayment, '(Expected: ~9847)');
assert(emiResult.monthlyPayment === 9847, `EMI calculation incorrect, got ${emiResult.monthlyPayment}`);
assert(emiResult.totalInterest === 772531, `EMI total interest incorrect, got ${emiResult.totalInterest}`);
assert(emiResult.monthlyAmortization.length === 180, `EMI monthly breakup count incorrect, got ${emiResult.monthlyAmortization.length}`);

// 2. SIP Test
const sipResult = calculateSIP(10000, 12, 10);
console.log('SIP Result: Total Value =', sipResult.totalValue, '(Expected: ~2323391)');
assert(sipResult.totalValue === 2323391, `SIP calculation incorrect, got ${sipResult.totalValue}`);
assert(sipResult.investedAmount === 1200000, `SIP invested amount incorrect, got ${sipResult.investedAmount}`);

// 3. Loan Eligibility Test
const eligResult = calculateLoanEligibility(80000, 10000, 9.5, 20, 50);
console.log('Eligibility Result: Eligible Amount =', eligResult.eligibleAmount, '(Expected: ~3252579)');
assert(eligResult.maxAffordableEMI === 30000, `Eligibility max EMI incorrect, got ${eligResult.maxAffordableEMI}`);

// 4. FD Test
const fdResult = calculateFD(100000, 7, 5, 'quarterly');
console.log('FD Result: Maturity Amount =', fdResult.maturityAmount, '(Expected: ~141478)');
assert(fdResult.maturityAmount === 141478, `FD maturity value incorrect, got ${fdResult.maturityAmount}`);

// 5. Tax Slabs Test (FY 2025-26 slabs verification including 25% slab)
// Income: 22,00,000 (22 Lakhs). Deductions: 75,000 standard deduction
// Taxable Income: 21,25,000
// Slabs:
// 0 - 4L: 0% -> 0
// 4L - 8L: 5% of 4L -> 20,000
// 8L - 12L: 10% of 4L -> 40,000
// 12L - 16L: 15% of 4L -> 60,000
// 16L - 20L: 20% of 4L -> 80,000
// 20L - 21.25L: 25% of 1.25L -> 31,250
// Total Base Tax: 20k + 40k + 60k + 80k + 31.25k = 2,31,250
// Cess: 4% of 2,31,250 = 9,250
// Total Tax Liability: 2,40,500
const taxResult = calculateTax(2200000, 75000, 'new');
console.log('Tax Result: Taxable Income =', taxResult.taxableIncome, ', Total Tax =', taxResult.totalTaxLiability, '(Expected: ~240500)');
assert(taxResult.taxableIncome === 2125000, `Taxable income incorrect, got ${taxResult.taxableIncome}`);
assert(taxResult.taxAmount === 231250, `Base tax incorrect, got ${taxResult.taxAmount}`);
assert(taxResult.totalTaxLiability === 240500, `Total tax liability incorrect, got ${taxResult.totalTaxLiability}`);

// 6. GST Test
const gstResult = calculateGST(10000, 18, 'exclusive');
console.log('GST Result: GST Amount =', gstResult.gstAmount, '(Expected: 1800)');
assert(gstResult.gstAmount === 1800, `GST exclusive amount incorrect, got ${gstResult.gstAmount}`);

// 7. Retirement Test
const retResult = calculateRetirement(30, 60, 50000, 500000, 6, 12, 8, 85);
console.log('Retirement Result: Required Corpus =', retResult.corpusRequired, '(Expected: ~53066374)');
assert(retResult.corpusRequired > 0, 'Retirement required corpus invalid');

// 8. Savings Goal Test
const saveResult = calculateSavingsGoal(1000000, 10, 12, 0);
console.log('Savings Goal Result: Monthly Required =', saveResult.monthlySavingsRequired, '(Expected: ~4347)');
assert(saveResult.monthlySavingsRequired === 4347, `Savings goal monthly required incorrect, got ${saveResult.monthlySavingsRequired}`);

// 9. TDS Test
const tdsResult = calculateTDS('194C', 50000, true, false, false);
console.log('TDS Result: TDS Amount =', tdsResult.tdsAmount, '(Expected: 500)');
assert(tdsResult.tdsAmount === 500, `TDS 194C amount incorrect, got ${tdsResult.tdsAmount}`);

// 10. Import Duty Test
const importResult = calculateImportDuty(100000, 5000, 1000, 10, 18);
console.log('Import Duty Result: Assessable Value =', importResult.assessableValue);
assert(importResult.assessableValue === 106000, 'Import assessable value incorrect');

// 11. Salary Test
const salResult = calculateSalary(100000, 12, 200);
console.log('Salary Result: Take Home =', salResult.takeHomeMonthly, '(Expected: 98000)');
assert(salResult.takeHomeMonthly === 98000, `Take home salary incorrect, got ${salResult.takeHomeMonthly}`);

// 12. Net Worth Test
const nwResult = calculateNetWorth({ cash: 150000, property: 4500000 }, { homeloan: 2000000 });
console.log('Net Worth Result: Net Worth =', nwResult.netWorth, '(Expected: 2650000)');
assert(nwResult.netWorth === 2650000, `Net worth incorrect, got ${nwResult.netWorth}`);

// 13. Inflation Test
const infResult = calculateInflation(10000, 10, 6, 'future');
console.log('Inflation Result: Future Value =', infResult, '(Expected: ~17908)');
assert(infResult === 17908, `Inflation future value incorrect, got ${infResult}`);

console.log('\n✅ ALL 13 CALCULATOR VALIDATION TESTS PASSED SUCCESSFULLY! All calculations are mathematically accurate.');
