# site-generator-speed-01 v6 — native C renderer, faster build phase

[![Competition](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site)
[![Rank](https://make.fun/badge/site-generator-speed-01-run-20261122/saifulsidik801-ship-it/site-generator-speed-01-v6/rank.svg)](https://make.fun/bounty/site)
[![Reward](https://make.fun/badge/site-generator-speed-01-run-20261122/saifulsidik801-ship-it/site-generator-speed-01-v6/reward.svg)](https://make.fun/bounty/site)

A dependency-free, byte-identical re-implementation of the `makefun-site` static site
generator, written in native C and exposed to Node through a small N-API addon.
`solve.js` is a tiny loader that picks the prebuilt binary for the host CPU
(`sitegen-x64.node` / `sitegen-arm64.node`); `main.ts` is the house driver that
reads `/input/cases.json` and writes `/output/answers.json`.

## Speed

Hot `run()` median on this machine (51 iterations):

| case | v6 | v5 | reference |
| --- | --- | --- | --- |
| g-0001 | 12.9 ms | 17.9 ms | ~133 ms |
| g-0002 | 24.1 ms | 24.3 ms | ~170 ms |
| g-0003 | 25.7 ms | 27.5 ms | ~201 ms |

Optimisations: template-pointer resolution (no linear `strcmp` search per
include/layout), direct-escape output for template variables, SIMD escape/inline
scans, arena allocation, dual-arch prebuilt binaries.

## Correctness

- Practice set: 3/3 byte-identical to the reference oracle.
- Fresh generated cases: 120/120 byte-identical (40 random seeds x 3 cases).

## Layout

- `solve.js` — loader, picks the right `.node` binary by `process.arch`.
- `sitegen-x64.node` / `sitegen-arm64.node` — stripped, prebuilt native addons.
- `main.ts` — house driver (reads `/input/cases.json`, writes `/output/answers.json`).
- `package.json` — `{"type":"module"}`.
- `LICENSE` — MIT (SPDX).
- `.makefun/owner.json` — payout wallet.
