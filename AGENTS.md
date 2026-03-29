# Agent Configuration

## Global Memory

- **Always reply to user in zh-TW (繁體中文)**
- **Reasoning/思考過程使用 English**

## Project: Gee Hair Beauty Salon

Astro + TinaCMS blog website.

## Package Manager

**pnpm** (do NOT use npm or yarn)

```bash
pnpm install          # Install dependencies
pnpm run dev         # Start dev server (tinacms dev -c "astro dev")
pnpm run build       # Build for production
pnpm add <package>   # Add dependency
```

## Build Command

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build",
    "preview": "astro preview"
  }
}
```

## Environment Variables

Required for TinaCMS build:
- `PUBLIC_TINA_CLIENT_ID` - From app.tina.io
- `TINA_TOKEN` - From app.tina.io
- `SITE_URL` - Production URL

Local development: Copy `.dev.vars.example` to `.dev.vars`

## Deployment

Cloudflare Workers (via wrangler)

```bash
pnpm run build
npx wrangler deploy
```

## Key Dependencies

- Astro 6.1.x
- TinaCMS 3.x
- React 18.x
- @astrojs/cloudflare
