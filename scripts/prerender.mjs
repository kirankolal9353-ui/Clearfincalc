import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const tempDir = '.prerender-build';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
try {
  await build({ build: { ssr: 'src/entry-server.tsx', outDir: tempDir, sourcemap: false } });
  const { render, getPageSeo, getPageStructuredData } = await import(pathToFileURL(resolve(tempDir, 'entry-server.js')).href);
  const template = await readFile('dist/index.html', 'utf8');
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
  await mkdir('dist/__seo', { recursive: true });
  if (new Set(urls).size !== urls.length) throw new Error('Duplicate sitemap URLs');
  const redirects = ['# Generated from sitemap: retain existing public query URLs.'];
  for (const url of urls) {
    const parsed = new URL(url);
    const seo = getPageSeo(parsed.search);
    if (url !== seo.canonical) throw new Error(`Non-canonical or unknown sitemap URL: ${url}`);
    const markup = await render(parsed.search);
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(seo.title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(seo.description)}" />`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    for (const [property, value] of Object.entries({ 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical })) {
      html = html.replace(new RegExp(`<meta property="${property}"[^>]*>`), `<meta property="${property}" content="${escape(value)}" />`);
    }
    const schemas = getPageStructuredData(parsed.search).map(schema =>
      `<script type="application/ld+json" data-clearfincalc-jsonld="true">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`).join('\n');
    html = html.replace('</head>', `${schemas}\n</head>`);
    html = html.replace('</head>', `<link rel="canonical" data-clearfincalc-canonical="true" href="${escape(seo.canonical)}" />\n</head>`);
    if (!parsed.search) await writeFile('dist/index.html', html);
    else {
      const [key, value] = [...parsed.searchParams][0];
      const filename = `${key}-${value}.html`;
      await writeFile(`dist/__seo/${filename}`, html);
      redirects.push(`/ ${key}=${value} /__seo/${filename} 200!`);
    }
  }
  await writeFile('dist/_redirects', `${redirects.join('\n')}\n`);
  console.log(`Prerendered ${urls.length} sitemap pages and generated Netlify query rewrites.`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
