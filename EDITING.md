# How to edit the GetNorth website

You can change text, add images and update details yourself. **Every change saved to the `main` branch on GitHub goes live automatically** — Vercel rebuilds the site in about 1–2 minutes.

> **Safety net:** if a change has a mistake, Vercel's build fails and **the live site keeps showing the previous working version**. Nothing breaks for visitors. Fix the mistake and save again.

---

## Option A — Edit on the GitHub website (easiest, nothing to install)

1. Go to **https://github.com/Axser6/getnorth-website** and sign in.
2. Click through the folders to the file you want (see *Where things are* below).
3. Click the **pencil icon ✏️** (top right of the file) to edit.
4. Make your change. Only change the text **inside the quotes** `"…"` — keep the quotes, commas and brackets as they are.
5. Click **Commit changes…** → write a short note (e.g. "Update services text") → **Commit changes**.
6. Wait 1–2 minutes, then refresh **https://getnorthmedia.com**.

**Check it went live:** on the repository's front page, next to the latest commit, a **green ✓** means it's live; a **yellow ●** means it's still building; a **red ✗** means the build failed (click it → *Details* to see why; the live site is unchanged).

### Uploading images on GitHub

1. Open the folder **`public/images/`** (or a sub-folder like `public/images/work/`).
2. Click **Add file → Upload files**, drag your images in, then **Commit changes**.
3. Use the image in a page by writing its path **without `public`**, e.g. `"/images/work/my-photo.jpg"`.

---

## Option B — Edit on your computer (for bigger changes)

One-time setup:

1. Install **Node.js 20 or newer** (https://nodejs.org) and **VS Code** (https://code.visualstudio.com).
2. In a terminal:

```bash
git clone https://github.com/Axser6/getnorth-website.git
```

```bash
cd getnorth-website && npm install
```

Every time you edit:

```bash
npm run dev
```

Open **http://localhost:3000** — the page updates instantly as you save files. When happy, publish:

```bash
git add -A && git commit -m "Describe your change" && git push
```

Before pushing big changes you can check nothing is broken with `npm run build` (it must finish without errors).

---

## Where things are

| What you want to change | File |
|---|---|
| Phone number, location, social links, menu items | `src/lib/site.ts` |
| Services: division names, descriptions, service lists, deliverables, benefits, "What we measure" | `src/data/divisions.ts` |
| Industries page content | `src/data/industries.ts` |
| AI Solutions page: solutions, problems, process, principles | `src/data/ai.ts` |
| Our Work portfolio items (and their images) | `src/data/work.ts` |
| Home page headings and sections | `src/app/page.tsx` |
| About page | `src/app/about/page.tsx` |
| AI Solutions page headings and FAQs | `src/app/ai-solutions/page.tsx` |
| Contact page text | `src/app/contact/page.tsx` |
| Contact form options (budget ranges, timelines) | `src/lib/enquiry.ts` |
| Privacy notice | `src/app/privacy/page.tsx` |
| Footer | `src/components/site-footer.tsx` |
| Colours, fonts, spacing (design tokens) | `src/app/globals.css` — see `design-system/getnorth/MASTER.md` |
| Logo files | `src/assets/brand/` and `public/brand/` |
| Images | `public/images/` |

Tip: on GitHub, press **`t`** on the repository page and type part of a file name to find it quickly. To find where a sentence lives, use the search box at the top of GitHub and type a few words from it.

---

## Common tasks

### 1. Change any text
Find the text in the file listed above, edit the words between the quotes, commit. Example in `src/data/divisions.ts`:

```ts
summary:
  "Brand identity, content and video that make your business recognisable and worth paying attention to.",
```

If your text contains a double quote `"`, write it as `\"`. Apostrophes `'` are fine.

### 2. Add a real project to "Our Work" (with an image)
1. Upload the image to **`public/images/work/`** (see *Uploading images*).
2. Open **`src/data/work.ts`**. Each project is a block between `{` and `},`. Edit a sample block (or copy one), and fill it in:

```ts
{
  id: "acme-corporate-website",          // unique, lowercase, hyphens
  placeholder: false,                    // false = real project (removes the "Sample placeholder" badge)
  title: "Corporate website for Acme Ltd",
  division: "web-technology",            // media-creative | digital-marketing | ai-automation | web-technology
  industry: "Manufacturing & Industrial",
  summary: "One-sentence description shown on the card.",
  challenge: "What the client needed.",
  approach: "What we did.",
  deliverables: ["UX & visual design", "Responsive build", "SEO foundations"],
  outcome: "Measured result, approved by the client.",
  image: "/images/work/acme-website.jpg",
  imageAlt: "Acme Ltd homepage shown on a laptop",
},
```

3. **Sample photos:** the six sample projects currently show illustrative Unsplash photos (with an "Illustrative photo" label). Replace each sample's `image` with your real photo when you add a real project.
4. **3D showcase on the Our Work page:** it shows illustrative stock photos (with an "Illustrative imagery" note) until **5 or more** real projects have an `image`. From then on it automatically uses your project photos and titles, and the note disappears.
5. As soon as **one** project has `placeholder: false`, the "Portfolio in preparation" notice on the Our Work page disappears automatically. Delete the sample blocks you no longer need, so placeholders don't sit beside real work.

> Only add client names and results the client has approved.

### 3. Add an image anywhere else on a page
Upload it to `public/images/`, then in the page file add (the `Image` import goes at the top of the file once):

```tsx
import Image from "next/image";

<Image
  src="/images/team-photo.jpg"
  alt="The GetNorth team in our Bengaluru office"
  width={1600}
  height={1000}
  className="h-auto w-full rounded-(--radius-card)"
/>
```

`width`/`height` are the image's real pixel size (they set the shape, not the display size). The site automatically serves smaller, faster versions to phones.

### 4. Update phone number or social links
Edit `src/lib/site.ts` → `phone` and `social`. The WhatsApp and call buttons everywhere update automatically.

### 5. Add the business email or connect the contact form
These are **settings, not code** — set them in **Vercel → your project → Settings → Environment Variables**, then **Deployments → ⋯ → Redeploy**:

| Setting | What it does |
|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shows your business email on the site |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Sends form enquiries to your inbox via Resend |
| `CONTACT_WEBHOOK_URL` | Sends enquiries to Zapier / Make / Google Sheets / a CRM instead |

### 6. Replace the logo
Replace the files in **both** `src/assets/brand/` and `public/brand/`, keeping the **same file names** (`logo-green.png`, `logo-light.png`, `mark-green.png`, `mark-light.png`, `wordmark-green.png`, `wordmark-light.png`). Use transparent PNGs. The browser-tab icons are `src/app/icon.png` (512×512) and `src/app/apple-icon.png` (180×180).

### 7. Undo a change
- **Vercel:** *Deployments* → find the last good version → **⋯ → Promote to Production** (instant).
- **GitHub:** open the file's **History** (top right of the file), view the earlier version, copy its content, then edit the file and paste it back.

---

## Image tips

- **Format:** JPG for photos, PNG for logos/graphics with transparency, WebP for both if you can.
- **Size:** about **1600–2000 px wide** is plenty. Keep files **under 500 KB** — compress them free at **https://squoosh.app**.
- **File names:** lowercase with hyphens, no spaces: `acme-website-home.jpg` ✓ — `Acme Website (1).JPG` ✗.
- **Paths are case-sensitive:** `/images/work/Photo.jpg` and `/images/work/photo.jpg` are different files.
- Always write a short, meaningful `alt` description (what the image shows).
- Only use photos you own or have the rights to.

---

## Rules that keep the site credible

- Don't add testimonials, client logos, statistics or awards unless they are real and approved.
- Keep one main action per section ("Get a quote").
- Design rules (colours, spacing, accessibility) are documented in `design-system/getnorth/MASTER.md`.
