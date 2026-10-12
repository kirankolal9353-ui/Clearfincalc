// Exercise the production TypeScript functions, never the old scratch copy.
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
const source = readFileSync('src/utils/finance.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext } }).outputText;
const f = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

test('loan payments and amortization regression', () => {
  const result = f.calculateEMI(1000000, 8.5, 15);
  assert.equal(result.monthlyPayment, 9847);
  assert.equal(result.totalInterest, 772531);
  assert.equal(result.monthlyAmortization.length, 180);
  assert.equal(result.monthlyAmortization.at(-1).remainingBalance, 0);
  assert.equal(f.calculateEMI(120000, 0, 1).monthlyPayment, 10000);
  assert.throws(() => f.calculateEMI(100000, 8, 0), RangeError);
});
test('savings projection regression and zero-return boundaries', () => {
  assert.equal(f.calculateSIP(10000, 12, 10).totalValue, 2323391);
  assert.equal(f.calculateSIP(10000, 0, 10).totalValue, 1200000);
  assert.equal(f.calculateFD(100000, 7, 5, 'quarterly').maturityAmount, 141478);
  assert.equal(f.calculateSavingsGoal(1000000, 10, 12, 0).monthlySavingsRequired, 4347);
});
test('tax and GST defaults remain unchanged (historical illustrative scope)', () => {
  assert.equal(f.calculateTax(2200000, 75000, 'new').totalTaxLiability, 240500);
  assert.equal(f.calculateGST(10000, 18, 'exclusive').gstAmount, 1800);
  assert.equal(f.calculateGST(11800, 18, 'inclusive').gstAmount, 1800);
  assert.equal(f.calculateTDS('194C', 50000, true, false, false).tdsAmount, 500);
});
test('customs default values match the observed live calculator', () => {
  const result = f.calculateImportDuty(500000, 30000, 10000, 7.5, 18);
  assert.equal(result.assessableValue, 540000);
  assert.equal(result.bcdAmount, 40500);
  assert.equal(result.swsAmount, 4050);
  assert.equal(result.igstAmount, 105219);
  assert.equal(result.totalDuties, 149769);
  assert.equal(result.landedCost, 689769);
});
test('utility and eligibility regression', () => {
  assert.equal(f.calculateLoanEligibility(80000, 10000, 9.5, 20, 50).maxAffordableEMI, 30000);
  assert.equal(f.calculateSalary(100000, 12, 200).takeHomeMonthly, 98000);
  assert.equal(f.calculateNetWorth({ cash: 150000, property: 4500000 }, { homeloan: 2000000 }).netWorth, 2650000);
  assert.equal(f.calculateInflation(10000, 10, 6, 'future'), 17908);
});
