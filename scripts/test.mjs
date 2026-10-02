import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
const run = args => {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Check failed: ${args.join(' ')}`);
};
try {
  run(['--test', 'audit-tests/finance.test.mjs', 'audit-tests/prerender.test.mjs']);
  run(['node_modules/vite/bin/vite.js', 'build', '--ssr', 'src/App.tsx', '--outDir', 'audit-ssr']);
  run(['audit-tests/ui-smoke.mjs']);
} finally {
  rmSync('audit-ssr', { recursive: true, force: true });
}
