# Additional Agent Instructions — Existing Local Repository

Read `edmealem-dev-agent-blueprint-updated.md` first, followed by the content-pack instructions.

**Context:** The owner has already cloned `edmealem-k/edmealem.dev` and copied the upstream `victoreke.com` files into that clone. Do not clone another repository, initialize Git, remove `.git`, or replace `origin`. GitHub may still show an empty remote until the owner pushes local files.

## First tasks

1. Confirm working directory, root `.git`, `git remote -v`, Git status, current files and lockfile. Do not push or deploy without authorization.
2. Preserve the *original* MIT `LICENSE` (Victor Eke 2023), plus any third-party notices. If absent, restore the exact original LICENSE from upstream. Do not substitute Edmealem's name inside the original notice.
3. Honor the original author's README attribution request with a discreet footer link to `https://victoreke.com`. Keep Edmealem's own copyright separate.
4. Replace upstream user-specific content, metadata, comments configuration, analytics IDs and support links with owner-specific config. Audit images and fonts for redistribution rights; do not copy Victor's personal photos or logo as user-owned assets.
5. Set site identity and canonical URL configuration to `Edmealem Kassahun` and `https://edmealem.dev` (DNS/deployment not presumed completed).
6. Proceed with the architecture blueprint (Sanity to MDX, compatible dependency upgrades) and integrate provided content pack. Preserve the original UI exactly; no redesign, including compact projects listing.
7. Set up Giscus for the public `edmealem-k/edmealem.dev` repository only once GitHub Discussions and Giscus IDs are available. Disable gracefully otherwise.
8. Use `README-edmealem-dev.md` as the draft repository README; rename to `README.md` only after correcting script names, directories, and migration status to match real code.
9. Run actual lint, typecheck, tests and production build; report verified outputs and remaining blockers. No fabricated passing status.

## Licensing reminder

MIT requires preserving the copyright and license text in copies/substantial portions. A visible footer credit is separately requested in upstream's README; it is good to honor it, but do not confuse it with the default MIT license text. Edmealem may separately copyright original additions. Never claim to have authored Victor's copied code.
