# Daba Choice — The Real Taste of Punjab

Website for Daba Choice, a Punjabi cafe in International City, Dubai.

## Tech

- React 19 + Vite 7
- Tailwind CSS v4
- Supabase (Plattr)
- Wouter (routing)

## Setup

```bash
pnpm install
pnpm dev
```

## Environment

Copy `.env.example` to `.env` and add your Plattr Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Deploy (Vercel)

1. Connect this repo to Vercel
2. Add env vars in Vercel dashboard
3. Build command: `pnpm build`
4. Output directory: `dist`
