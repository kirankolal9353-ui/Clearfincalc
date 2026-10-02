import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replaceAll('&amp;', '&'));
const rules = readFileSync('dist/_redirects', 'utf8');

test('all 51 sitemap URLs have usable HTML and matching metadata without JavaScript', () => {
  assert.equal(urls.length, 51);
  const titles = [];
  for (const url of urls) {
    const parsed = new URL(url);
    const entry = [...parsed.searchParams][0];
    const filename = entry ? `dist/__seo/${entry[0]}-${entry[1]}.html` : 'dist/index.html';
    const dom = new JSDOM(readFileSync(filename, 'utf8'));
    const doc = dom.window.document;
    assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, url);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
    assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
    assert.ok(doc.querySelector('meta[name="description"]').content.length > 40);
    assert.ok(doc.querySelector('#root').textContent.length > 500);
    titles.push(doc.title);
    if (entry) assert.ok(rules.includes(`/ ${entry[0]}=${entry[1]} /__seo/${entry[0]}-${entry[1]}.html 200!`));
    if (entry?.[0] === 'tool') {
      assert.equal(doc.querySelectorAll('h1').length, 1);
      assert.ok(doc.querySelector('#calculator-math').textContent.length > 50);
      assert.ok(doc.querySelector('#calculator-faqs').textContent.length > 50);
      assert.ok(doc.querySelector('input'), 'calculator inputs rendered on server');
      assert.ok(!doc.body.textContent.includes('Loading calculator...'));
      assert.ok(!doc.querySelector('#calculator-guide').textContent.includes('###'));
      assert.equal(doc.querySelectorAll('.katex-error').length,0,`valid math for ${url}`);
      if (entry[1] === 'sip') assert.ok(doc.querySelector('#calculator-math math'), 'formula rendered as accessible MathML');
    }
    if (entry?.[0] === 'article') {
      assert.equal(doc.querySelectorAll('h1').length, 1);
      assert.match(doc.title, /ClearFinCalc Insights$/);
      assert.ok(doc.querySelector('[role="dialog"]').textContent.length > 500);
    }
    dom.window.close();
  }
  assert.equal(new Set(titles).size, 51, 'no duplicate page titles');
});

test('TDS article no longer states obsolete rates or non-filer uplift as current', () => {
  const doc = new JSDOM(readFileSync('dist/__seo/article-tds-explained.html', 'utf8')).window.document;
  const article = doc.querySelector('[role="dialog"]').textContent;
  assert.match(article, /omitted with effect from 1 April 2025/);
  assert.match(article, /not a filing tool for Tax Year 2026-27/);
  assert.ok(!article.includes('₹240,000'));
  assert.ok(doc.querySelector('a[href="https://www.incometaxindia.gov.in/w/section-206ab-5"]'));
});
