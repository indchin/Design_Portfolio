# AI UX Leader Portfolio

A premium, deployment-ready personal portfolio platform for a Lead UX/UI Designer working across AI products, research, design systems, accessibility, EdTech, SaaS, enterprise tools, and learning experience platforms.

## What Is Included

- Next.js App Router with TypeScript and Tailwind CSS
- Premium dark/light visual language with glass surfaces, motion, command palette, and cursor-reactive effects
- Framer Motion and Lenis smooth scrolling
- Dynamic case study system with search, filters, tags, grid/list views, and dedicated detail pages
- Internal CMS-style admin at `/admin`
- Draft/publish workflow, autosave, duplicate templates, live preview, reorderable sections, SEO panel, analytics preview, theme controls, and asset upload hooks
- Cloudinary signed upload endpoint scaffold
- Supabase schema for portfolio settings, case studies, sections, assets, and contact messages
- SEO: dynamic metadata, Open Graph image route, structured data, sitemap, and robots
- Responsive, keyboard-accessible components
- Deployment config for Vercel and Netlify

## Local Setup

Prerequisite: Node.js LTS with npm installed.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The admin dashboard runs at `http://localhost:3000/admin`. The preview login accepts any email/password locally. For production, connect Supabase Auth and protect `/admin` with middleware or server-side session checks.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-name/intro
NEXT_PUBLIC_ADMIN_EMAIL=you@example.com
```

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Enable email authentication.
5. Replace the local admin gate with Supabase session checks before launch.

## Cloudinary Setup

1. Create a Cloudinary account.
2. Add the Cloudinary env vars.
3. Use `/api/assets/signature` to request a signed upload payload.
4. Upload files directly from the admin dashboard to Cloudinary, then persist returned asset metadata in Supabase.

## Content Editing

Current source content lives in:

- `src/content/portfolio.ts`
- `content/case-study-template.mdx`

The admin dashboard uses local autosave for preview editing. The Supabase schema is ready for replacing local storage with persistent CMS data.

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
vercel --prod
```

Add all env vars in Vercel Project Settings. Connect your custom domain under Domains.

### Netlify

```bash
npm install
npm run build
```

Use the included `netlify.toml`, install `@netlify/plugin-nextjs`, and add env vars in Site Configuration.

### Custom Domain

1. Deploy to Vercel or Netlify.
2. Add your domain in the hosting dashboard.
3. Point DNS records to the host.
4. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
5. Rebuild so sitemap, Open Graph, and structured data use the final domain.

## Production Hardening Checklist

- Replace preview admin login with Supabase Auth and route protection.
- Persist admin edits to Supabase tables.
- Wire contact form to Resend, Postmark, or Supabase Edge Functions.
- Connect Cloudinary direct uploads from the asset panel.
- Add real resume at `public/resume.pdf`.
- Replace placeholder social URLs and owner details.
- Run Lighthouse and tune image choices, analytics scripts, and motion budget.

## Useful Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```
