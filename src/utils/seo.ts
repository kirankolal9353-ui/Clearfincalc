import { ARTICLES } from '../data/articles';

export const HOME_TITLE = 'ClearFinCalc - Clear Calculations. Smarter Decisions.';
export const HOME_DESCRIPTION = 'Calculate EMI, SIP, taxes, salary, loans, TDS and customs duties with ClearFinCalc, a free formula-based financial calculator hub.';

export const CALCULATOR_SEO: Record<string, { title: string; description: string }> = {
  emi: {
    title: 'EMI Calculator | ClearFinCalc',
    description: 'Estimate monthly EMI, total interest and repayment for a loan using the principal, annual interest rate and tenure you enter.'
  },
  sip: {
    title: 'SIP Calculator | ClearFinCalc',
    description: 'Estimate the potential future value of monthly SIP investments based on your investment amount, duration and assumed return.'
  },
  tds: {
    title: 'TDS Calculator | ClearFinCalc',
    description: 'Estimate tax deducted at source for selected payment types and rates. Check the applicable section and current rules before filing.'
  },
  customs: {
    title: 'Customs Duty Calculator | ClearFinCalc',
    description: 'Estimate import duty components and landed cost from the customs values and rates you enter. Verify applicable tariff rules separately.'
  },
  eligibility: {
    title: 'Loan Eligibility Calculator | ClearFinCalc',
    description: 'Estimate loan eligibility from your income and existing EMIs using the assumptions shown in the calculator.'
  },
  'personal-loan': {
    title: 'Personal Loan EMI Calculator | ClearFinCalc',
    description: 'Estimate monthly repayment, total interest and repayment amount for a personal loan using your selected amount, rate and tenure.'
  },
  'home-loan': {
    title: 'Home Loan EMI Calculator | ClearFinCalc',
    description: 'Estimate monthly home loan EMI, total interest and repayment from the loan amount, interest rate and tenure you enter.'
  },
  tax: {
    title: 'Income Tax Estimator | ClearFinCalc',
    description: 'Estimate income tax under the selected regime using your entered income, deductions and the calculator’s stated assumptions.'
  },
  salary: {
    title: 'Salary Calculator | ClearFinCalc',
    description: 'Estimate take-home salary after selected deductions such as provident fund, professional tax and income tax.'
  },
  gst: {
    title: 'GST Calculator | ClearFinCalc',
    description: 'Calculate GST amounts for inclusive or exclusive prices using the rate you select, including CGST, SGST or IGST.'
  },
  fd: {
    title: 'Fixed Deposit Calculator | ClearFinCalc',
    description: 'Estimate fixed deposit maturity value and interest using your principal, interest rate, tenure and compounding frequency.'
  },
  retirement: {
    title: 'Retirement Calculator | ClearFinCalc',
    description: 'Estimate a retirement corpus and savings target from your timeline, expenses and assumed investment returns.'
  },
  'savings-goal': {
    title: 'Savings Goal Calculator | ClearFinCalc',
    description: 'Estimate the monthly savings needed to reach a target amount by your chosen date using your return assumption.'
  }
};

export function getRoute(search: string) {
  const params = new URLSearchParams(search);
  const article = ARTICLES.find(a => a.id === params.get('article'));
  const candidate = params.get('tool');
  const tool = !article && candidate && Object.hasOwn(CALCULATOR_SEO, candidate) ? candidate : null;
  const page = !article && !tool ? params.get('page') : null;
  const legal = page && ['privacy','terms','disclaimer','cookie','about','contact','sitemap','editorial','references'].includes(page) ? page : null;
  return { article, tool, page: legal };
}

export function getPageSeo(search: string) {
  const route = getRoute(search);
  const seo = route.article ? { title: `${route.article.title} | ClearFinCalc Insights`, description: route.article.excerpt }
    : route.tool ? CALCULATOR_SEO[route.tool]
    : route.page ? { title: `${route.page.charAt(0).toUpperCase() + route.page.slice(1)} | ClearFinCalc`, description: `Read ClearFinCalc ${route.page} information, policies and educational resources.` }
    : { title: HOME_TITLE, description: HOME_DESCRIPTION };
  const query = route.article ? `?article=${route.article.id}` : route.tool ? `?tool=${route.tool}` : route.page ? `?page=${route.page}` : '';
  return { ...seo, canonical: `https://clearfincalc.com/${query}` };
}
