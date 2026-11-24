// site-generator-speed-01 v6: native C site renderer (Node-API addon).
// run(input) returns exactly what makefun-site 1.0.0 returns, byte for byte.
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
const addon = require(join(__dirname, `sitegen-${arch}.node`));

export function run(input) {
  return addon.run(input);
}
