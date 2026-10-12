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

export const INFORMATION_SEO: Record<string, { title: string; description: string }> = {
  about: { title: 'About ClearFinCalc', description: 'Learn about ClearFinCalc, its free financial calculators, educational content and approach to transparent estimates.' },
  contact: { title: 'Contact ClearFinCalc', description: 'Contact ClearFinCalc with calculator questions, content corrections or feedback using the published support details.' },
  privacy: { title: 'Privacy Policy | ClearFinCalc', description: 'Read how ClearFinCalc handles browser calculations, usage analytics, advertising services and personal information.' },
  terms: { title: 'Terms of Service | ClearFinCalc', description: 'Review the terms for using ClearFinCalc calculators and educational resources, including limitations and user responsibilities.' },
  disclaimer: { title: 'Disclaimer | ClearFinCalc', description: 'Understand the educational scope of ClearFinCalc estimates and why financial, tax and customs decisions need independent verification.' },
  cookie: { title: 'Cookie Policy | ClearFinCalc', description: 'Read about cookies and similar technologies used for ClearFinCalc preferences, analytics and third-party advertising.' },
  sitemap: { title: 'HTML Sitemap | ClearFinCalc', description: 'Browse links to all ClearFinCalc calculators, financial articles, policies, contact details and methodology pages.' },
  editorial: { title: 'Editorial Policy | ClearFinCalc', description: 'Review ClearFinCalc editorial standards, source selection, content updates and the educational scope of its financial guides.' },
  references: { title: 'Methodology and References | ClearFinCalc', description: 'Explore ClearFinCalc calculation methodology, limitations and official source links for financial, tax and customs information.' }
};

export function getRoute(search: string) {
  const params = new URLSearchParams(search);
  const article = ARTICLES.find(a => a.id === params.get('article'));
  const candidate = params.get('tool');
  const tool = !article && candidate && Object.hasOwn(CALCULATOR_SEO, candidate) ? candidate : null;
  const page = !article && !tool ? params.get('page') : null;
  const legal = page && Object.hasOwn(INFORMATION_SEO, page) ? page : null;
  return { article, tool, page: legal };
}

export function getPageSeo(search: string) {
  const route = getRoute(search);
  const seo = route.article ? { title: `${route.article.title} | ClearFinCalc Insights`, description: route.article.excerpt }
    : route.tool ? CALCULATOR_SEO[route.tool]
    : route.page ? INFORMATION_SEO[route.page]
    : { title: HOME_TITLE, description: HOME_DESCRIPTION };
  const query = route.article ? `?article=${route.article.id}` : route.tool ? `?tool=${route.tool}` : route.page ? `?page=${route.page}` : '';
  return { ...seo, canonical: `https://clearfincalc.com/${query}` };
}

// Shared by prerendering, browser navigation and Netlify query routing.
export function getPageStructuredData(search: string) {
  const route = getRoute(search);
  const seo = getPageSeo(search);
  const base = 'https://clearfincalc.com/';
  const publisher = { '@type': 'Organization', name: 'ClearFinCalc', url: base };
  const page = route.article ? {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: route.article.title, description: seo.description, url: seo.canonical,
    mainEntityOfPage: seo.canonical,
    author: { '@type': 'Organization', name: route.article.author }, publisher
  } : {
    '@context': 'https://schema.org', '@type': route.page ? 'WebPage' : 'WebApplication',
    name: seo.title.split(' | ')[0], description: seo.description, url: seo.canonical,
    ...(route.page ? {} : { applicationCategory: 'FinanceApplication', operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }), publisher
  };
  const items = [{ name: 'Home', url: base }];
  if (seo.canonical !== base) items.push({ name: route.article?.title ?? seo.title.split(' | ')[0], url: seo.canonical });
  return [page, ...(items.length > 1 ? [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url }))
  }] : [])];
}
