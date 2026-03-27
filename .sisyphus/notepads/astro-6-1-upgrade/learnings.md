# Learnings - Astro 6.1 Upgrade

## Project Context
- Astro version: ^5.16.16 → upgrading to 6.1
- Integrations: MDX, React, Sitemap, TinaCMS (^3.3.2), @tanstack/react-virtual
- Content collections: Blog, Page, GlobalConfig (MDX + JSON)
- Custom Tina directive: `astro-tina-directive`
- TypeScript: Strict mode

## Key Breaking Changes in Astro 6.x
- Node.js: Must be 22.12.0+
- Vite: Upgraded to 7.0
- Zod: Upgraded to 4.0 (`z.email()` replaces `z.string().email()`)
- Shiki: Upgraded to 4.0
- ViewTransitions: Use `<ClientRouter />` instead
- Content collections: Legacy `src/content/config.ts` → Content Layer API
- Cloudflare: Pages support removed, use Workers instead

## Timeline
- 2026-03-27: Session started