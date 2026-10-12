import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { config } from '../audit-edge/seo-query.js';
const rewrite = (search, method = 'GET') => handler(new Request(`https://clearfincalc.com/${search}`, { method }));
test('exact public routes retain static routing', () => {
  assert.equal(config.path, '/');
  for (const search of ['', '?tool=customs', '?article=income-tax-basics', '?page=references', '?tool=unknown']) assert.equal(rewrite(search), undefined);
});
test('tracking, mixed and reordered queries agree with browser route priority', () => {
  assert.equal(rewrite('?tool=customs&utm_source=whatsapp').pathname, '/__seo/tool-customs.html');
  assert.equal(rewrite('?utm_source=whatsapp&tool=customs', 'HEAD').pathname, '/__seo/tool-customs.html');
  assert.equal(rewrite('?tool=emi&article=income-tax-basics').pathname, '/__seo/article-income-tax-basics.html');
  assert.equal(rewrite('?article=unknown&tool=emi').pathname, '/__seo/tool-emi.html');
  assert.equal(rewrite('?tool=unknown&page=references').pathname, '/__seo/page-references.html');
  assert.equal(rewrite('?tool=emi&utm_source=test').search, '');
  assert.equal(rewrite('?tool=emi&utm_source=test', 'POST'), undefined);
});
