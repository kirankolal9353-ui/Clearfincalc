/// <reference types="node" />
import type { ComponentType } from 'react';
import { getRoute } from './utils/seo';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import App from './App';
import EmiCalculator from './calculators/EmiCalculator';
import SipCalculator from './calculators/SipCalculator';
import TdsCalculator from './calculators/TdsCalculator';
import CustomsDuty from './calculators/CustomsDuty';
import LoanEligibility from './calculators/LoanEligibility';
import PersonalLoan from './calculators/PersonalLoan';
import HomeLoan from './calculators/HomeLoan';
import TaxEstimator from './calculators/TaxEstimator';
import SalaryCalculator from './calculators/SalaryCalculator';
import GstCalculator from './calculators/GstCalculator';
import FdCalculator from './calculators/FdCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';
import SavingsPlanner from './calculators/SavingsPlanner';
const calculators: Record<string, ComponentType> = { 'emi': EmiCalculator, 'sip': SipCalculator, 'tds': TdsCalculator, 'customs': CustomsDuty, 'eligibility': LoanEligibility, 'personal-loan': PersonalLoan, 'home-loan': HomeLoan, 'tax': TaxEstimator, 'salary': SalaryCalculator, 'gst': GstCalculator, 'fd': FdCalculator, 'retirement': RetirementCalculator, 'savings-goal': SavingsPlanner };
export { getPageSeo } from './utils/seo';

export function render(search: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on('data', chunk => chunks.push(Buffer.from(chunk)));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);
    const stream = renderToPipeableStream(<App initialSearch={search} prerenderCalculator={calculators[getRoute(search).tool ?? '']} />, {
      onAllReady() { stream.pipe(output); },
      onShellError: reject,
      onError(error) { reject(error); stream.abort(); }
    });
  });
}
