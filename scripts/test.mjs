import { spawnSync } from 'node:child_process';
import { rmSync, existsSync } from 'node:fs';
const run = args => {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Check failed: ${args.join(' ')}`);
};
for (const file of ['audit-tests/finance.test.mjs', 'audit-tests/prerender.test.mjs', 'audit-tests/seo-query.test.mjs', 'audit-tests/ui-smoke.mjs']) {
  if (!existsSync(file)) throw new Error(`Missing required regression test: ${file}`);
}
try {
  run(['--test', 'audit-tests/finance.test.mjs', 'audit-tests/prerender.test.mjs']);
  run(['node_modules/vite/bin/vite.js', 'build', '--ssr', 'netlify/edge-functions/seo-query.js', '--outDir', 'audit-edge']);
  run(['--test', 'audit-tests/seo-query.test.mjs']);
  run(['node_modules/vite/bin/vite.js', 'build', '--ssr', 'src/App.tsx', '--outDir', 'audit-ssr']);
  run(['audit-tests/ui-smoke.mjs']);
} finally {
  rmSync('audit-edge', { recursive: true, force: true });
  rmSync('audit-ssr', { recursive: true, force: true });
}
