# Learnings - Astro 6.1 Upgrade

## Project Context
- Astro version: ^5.16.16 → ^6.1.1 (upgraded)
- Integrations: MDX (^5.0.3), React (^5.0.2), RSS (^4.0.18), Sitemap (^3.7.2), TinaCMS (^3.3.2)
- Content collections: Blog, Page, GlobalConfig (MDX + JSON)
- Custom Tina directive: `astro-tina-directive`
- TypeScript: Strict mode

## Key Breaking Changes in Astro 6.x
- Node.js: Must be 22.12.0+ ✅ (current: v22.20.0)
- Vite: Upgraded to 7.0 (handled by Astro)
- Zod: Upgraded to 4.0 - No changes needed (no `z.string().email()` usage)
- Shiki: Upgraded to 4.0 (handled by Astro)
- ViewTransitions: Use `<ClientRouter />` - No changes needed (not used)
- Content collections: Already using Content Layer API (`src/content.config.ts`)
- Cloudflare: Pages support removed, use Workers ✅ (configured)

## Upgrade Summary
- ✅ Node.js version: v22.20.0 (meets requirement)
- ✅ Astro upgraded: ^5.16.16 → ^6.1.1
- ✅ @astrojs/mdx upgraded: ^4.3.13 → ^5.0.3
- ✅ @astrojs/react upgraded: ^4.4.2 → ^5.0.2
- ✅ @astrojs/rss upgraded: ^4.0.15 → ^4.0.18
- ✅ @astrojs/sitemap upgraded: ^3.7.0 → ^3.7.2
- ✅ @astrojs/cloudflare added: for Workers deployment
- ✅ wrangler.jsonc created: Cloudflare Workers configuration
- ✅ .dev.vars.example created: Environment variables template

## Blocker
- TinaCMS credentials required for build verification
- Need PUBLIC_TINA_CLIENT_ID and TINA_TOKEN from app.tina.io

## Timeline
- 2026-03-27: Session started
- 2026-03-27: Wave 1-4 completed (Node.js, Backup, Upgrade, Cloudflare config)
- 2026-03-27: Blocked on TinaCMS credentials for build/deploy verification