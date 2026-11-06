# GetNorth Media & AI Solutions — Official Website

Corporate website for **GetNorth Media & AI Solutions**, Bengaluru.
Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

> **Editing the site yourself?** See [EDITING.md](EDITING.md) — step-by-step guide for text, images, portfolio items and settings.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, overview, four divisions, industries, why GetNorth, approach, featured services |
| `/about` | Introduction, mission and vision, philosophy, approach, capabilities |
| `/services` | Detailed sections per division: services, deliverables, benefits (`#media-creative`, `#digital-marketing`, `#ai-automation`, `#web-technology`) |
| `/ai-solutions` | AI agents, automation, chatbots, WhatsApp, CRM, integrations, process, FAQ |
| `/industries` | One section per target industry |
| `/work` | Portfolio structure with **clearly marked placeholders** |
| `/contact` | Contact details, validated enquiry form, WhatsApp, click-to-call, map |
| `/privacy` | Plain-language privacy notice (have it legally reviewed) |

Also generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, favicons, and Open Graph images per page.

## Editing content

All copy and company facts live in typed data files. You don't need to touch the layouts:

- `src/lib/site.ts`: company name, phone, location, social links, navigation
- `src/data/divisions.ts`: divisions, services, deliverables, benefits
- `src/data/industries.ts`: industries
- `src/data/ai.ts`: AI solutions, problems, process, principles
- `src/data/work.ts`: portfolio entries (**replace the placeholders with real, client-approved case studies and set `placeholder: false`**)

## Design system

The full design system (direction, colour/type/spacing/motion tokens, accessibility and mobile rules, component inventory) is documented in [`design-system/getnorth/MASTER.md`](design-system/getnorth/MASTER.md), built with the ui-ux-pro-max skill's guidance. Tokens live in `src/app/globals.css`.

### shadcn / 21st.dev component structure

The project follows the shadcn/ui conventions so components from shadcn or [21st.dev](https://21st.dev) drop straight in:

- `components.json` — shadcn CLI config (Tailwind v4, CSS in `src/app/globals.css`, aliases below)
- `src/components/ui/` — UI primitives and third-party components (`@/components/ui/...`)
- `src/lib/utils.ts` — the standard `cn()` helper (`clsx` + `tailwind-merge`)

Add a shadcn component with `npx shadcn@latest add <name>`. Third-party components note their source, licence and any changes at the top of the file.

**Preview pages:** `/preview/perspective-tunnel` shows the Perspective Tunnel Hero (not linked from the site, `noindex`, and disallowed in robots.txt).

## Brand assets

The official logo lives in `src/assets/brand/` (used by the site via `next/image`) and `public/brand/` (direct URLs, structured data, OG images), in green (`#0A3E23`) and light versions with transparent backgrounds: `mark-*`, `wordmark-*`, `logo-*` (stacked). Favicons are `src/app/icon.png` and `src/app/apple-icon.png`. To swap in a vector (SVG) version of the logo later, replace these files and keep the same names.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Enquiry form

The form is validated in the browser and again on the server (Server Action in `src/app/contact/actions.ts`), with honeypot and minimum-fill-time spam protection.

**It needs a delivery channel.** Set at least one of:

- **Email (Resend):** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verify the sending domain in Resend)
- **Webhook:** `CONTACT_WEBHOOK_URL`, which receives a JSON POST per enquiry (Zapier, Make, n8n, Google Apps Script, CRM)

If neither is set, visitors are told the form isn't connected yet and are offered a one-tap WhatsApp message pre-filled with their enquiry. Nothing is silently lost or faked.

## Deploying to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Vercel: **Add New → Project**, import the repo. The framework is auto-detected (Next.js), so no build settings need changing.
3. Add the environment variables from `.env.example` (Production and Preview).
4. Deploy.
5. Connect the domain: **Project → Settings → Domains**, add `getnorthmedia.com` and `www.getnorthmedia.com`.
   At your domain registrar, create the DNS records Vercel shows. Typically:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`

   (Always use the exact values displayed in the Vercel dashboard.) Choose one as primary; Vercel redirects the other.
6. After the domain is live, submit `https://getnorthmedia.com/sitemap.xml` in Google Search Console.

## Before launch: checklist

- [ ] Configure the enquiry delivery channel (Resend or webhook) and send a test enquiry
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` once the business email is finalised
- [ ] Confirm the LinkedIn URL in `src/lib/site.ts` (currently assumes a company page at `linkedin.com/company/getnorthmedia`) and the Instagram handle
- [ ] Replace portfolio placeholders in `src/data/work.ts` with real, approved projects
- [ ] Have the privacy notice reviewed
- [ ] Optionally add analytics (e.g. Vercel Analytics) and update the privacy notice accordingly
