export interface AffiliateOffer {
  id: string;
  name: string;
  provider: string;
  category: 'Credit Cards' | 'Loans' | 'Insurance' | 'Investments';
  rating: number;
  benefits: string[];
  features: string;
  terms: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    id: 'infinity-cashback-card',
    name: 'ClearFinCalc Platinum Cash-back Card',
    provider: 'Apex Trust Bank',
    category: 'Credit Cards',
    rating: 4.8,
    benefits: ['5% Unlimited cashback on utilities & calculations', '1.5% Flat cashback on all online shopping', 'Zero annual fee for the first year'],
    features: 'Best Cash-back Card of 2026',
    terms: 'Min income: ₹30,000/month',
    ctaText: 'Apply Now',
    ctaLink: '#apply-card',
    badge: 'Best Value'
  },
  {
    id: 'instant-personal-loan',
    name: 'Express Personal Loan',
    provider: 'FastCredit Finance',
    category: 'Loans',
    rating: 4.6,
    benefits: ['Interest rates starting at 10.49% p.a.', '100% Digital paperless application', 'Disbursal in 2 hours'],
    features: 'Flexible repayment tenure up to 72 months',
    terms: 'Credit score 720+ preferred',
    ctaText: 'Check Offer',
    ctaLink: '#apply-loan',
    badge: 'Instant Approval'
  },
  {
    id: 'term-life-shield',
    name: 'SecureLife Term Shield',
    provider: 'Global Safe Insurance',
    category: 'Insurance',
    rating: 4.9,
    benefits: ['₹1 Crore life cover from ₹450/month', 'Accidental death benefit rider included', '99.7% Claim settlement ratio'],
    features: 'Complete financial safety for your family',
    terms: 'Non-smoker discount applicable',
    ctaText: 'Get Quote',
    ctaLink: '#apply-insurance',
    badge: 'Highly Rated'
  },
  {
    id: 'smart-wealth-app',
    name: 'GrowWealth Mutual Funds App',
    provider: 'GrowWealth Securities',
    category: 'Investments',
    rating: 4.7,
    benefits: ['Invest in Direct Mutual Funds at 0% Commission', 'Start SIP with as low as ₹100', 'Automated tax-harvesting tools'],
    features: 'Simplest investment dashboard and SIP planner',
    terms: 'KYC verified in 5 minutes',
    ctaText: 'Start Investing',
    ctaLink: '#apply-invest',
    badge: 'Free Account'
  }
];
