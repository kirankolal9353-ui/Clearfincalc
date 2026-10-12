import { getPageSeo } from '../../src/utils/seo.ts';

// Exact sitemap URLs still use static _redirects. Normalize variants with extra
// or mixed parameters using the same precedence as the browser, without losing
// the visitor's original URL or analytics query parameters.
export default function handler(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/' || !['GET', 'HEAD'].includes(request.method)) return;
  const canonical = new URL(getPageSeo(url.search).canonical);
  if (!canonical.search || url.search === canonical.search) return;
  const [key, value] = [...canonical.searchParams][0];
  const target = new URL(`/__seo/${key}-${value}.html`, url);
  return target;
}

export const config = { path: '/' };
