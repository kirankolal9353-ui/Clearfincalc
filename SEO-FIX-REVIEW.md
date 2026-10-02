# ClearFinCalc SEO and content fixes — review before publishing

Prepared on 2 October 2026. Local safety checkpoint: b84aa6e.
No GitHub push, Netlify upload or production deployment was performed for this change.

## Changes

- One metadata owner prevents article titles/descriptions from being overwritten by homepage or calculator effects. Calculator and article metadata, canonical and Open Graph tags share the same route definition.
- All 51 sitemap URLs receive build-time HTML: homepage, 13 calculators, 30 articles and 7 information pages. Calculator inputs/default results, guide content and article text are available before JavaScript runs.
- Netlify query rewrites retain existing public URLs such as /?tool=sip. No URL migration or external service is required.
- Calculator pages have a tool-specific main heading. Formula/examples, limitations, FAQs and references are in the document without tab interaction; section navigation still works.
- Educational text renders headings, lists, emphasis and mathematical expressions. Math uses server-renderable MathML via KaTeX with trusted commands disabled.
- Related calculator/article cards are real crawlable links.
- Corrected the obsolete Section 206AB statement and removed stale threshold claims from the TDS article. Added specific official sources and the 2026 Act-transition explanation.
- Rewrote the inconsistent TDS handbook to match its illustrative FY 2025-26 scope. Tax-period notices distinguish historical calculator assumptions from current filing requirements.
- Removed unsupported SIP return/last-four-years assertions, the unverified testimonials section and a claim of comprehensive validation against official examples.
- Sitemap lastmod dates reflect these substantive metadata/rendering changes.

## Verification

- Clean dependency install with the committed lockfile: passed.
- npm run build: passed; generated 51 HTML pages and 50 query rewrite rules.
- npm test: passed; 18 finance tests and 2 prerender tests, plus UI regression checks covering 13 calculators and 30 articles.
- Prerender checks verify content, calculator inputs, a single canonical, unique titles, matching Open Graph titles, and accessible math without JavaScript.
- UI checks cover metadata on navigation, article close/route changes, guide availability, invalid EMI input and tax defaults.
- git diff --check: passed.

## Review limits

- Generated rewrite rules are checked locally against Netlify's documented syntax. Actual Netlify routing must be checked in a deploy preview before merging.
- Netlify query rules match the exact parameter set. URLs with extra tracking or mixed parameters retain the existing client-side route fallback; the 51 sitemap URLs receive prerendered content.
- Charts remain browser-rendered. Non-browser checks emit chart container-size warnings; calculator inputs/results and text are present in HTML.
- Vite still warns about the main bundle size (about 761 kB before gzip, 225 kB gzip). No field performance measurement or ranking improvement is claimed.
- Other financial articles have not received a complete legal/content audit. Tax calculators remain explicitly illustrative FY 2025-26 tools; this work does not certify current-period filing accuracy.
- Indexing requests and these fixes do not guarantee Google rankings or traffic.

## Publish workflow — approval required

1. Extract the changed-files archive. Keep its folder structure.
2. Open the GitHub repository ROOT (where package.json is located).
3. Upload every included source/configuration/test file to its matching path. Do not upload this review document unless wanted. Do not upload node_modules or dist.
4. Commit to a NEW branch and create a pull request. Do not commit directly to main.
5. Netlify will run the unchanged build command, npm run build, and use dist as the publish directory.
6. Open the deploy preview. Check /?tool=sip, /?tool=tds and /?article=tds-explained; view source to confirm content and canonical metadata are in HTML.
7. Check a second calculator, navigation, guide anchors, formulas on mobile and sitemap.xml.
8. Merge only after approving the preview. Merging main triggers the site's existing automatic production publishing.

## Official references used

- Netlify redirects and query rules: https://docs.netlify.com/manage/routing/redirects/redirect-options/
- Income Tax Department TDS transition guidance: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tds-compliance
- Income Tax Department omission of Section 206AB: https://www.incometaxindia.gov.in/w/section-206ab-5
- KaTeX API/security options: https://katex.org/docs/api and https://katex.org/docs/options
