# Developer Portfolio

Built from scratch by [Joseph Genio](https://github.com/JosephGenio) — no templates, no themes, just code. This is my personal developer portfolio, designed using React, TailwindCSS, and Framer Motion. Every component, animation, and layout decision was crafted from the ground up.

Features a dark theme with neon accents, scroll-triggered animations, orbiting tech icons, a developer terminal block, and a serverless resume download. Feel free to fork it and make it your own.

## Tech Stack

- **React 19** (Vite)
- **TailwindCSS v4**
- **Framer Motion** — scroll-triggered animations, orbiting icons, staggered reveals
- **React Type Animation** — typewriter effect in the hero
- **EmailJS** — contact form (no backend needed)
- **Vercel Serverless Functions** — protected resume download

## Quick Start

```bash
# Clone the repo
git clone https://github.com/JosephGenio/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your EmailJS credentials (see "EmailJS Setup" below)

# Start dev server
npm run dev
```

## Customization

All personal data lives in JSON files under `src/data/`. Edit these to make it your own:

| File | What to change |
|------|---------------|
| `src/data/site.json` | Name, title, tagline |
| `src/data/projects.json` | Your projects (title, description, tech stack, links) |
| `src/data/skills.json` | Skills grouped by category (frontend, backend, etc.) |
| `src/data/experience.json` | Work history (company, role, dates, highlights) |
| `src/data/contact.json` | Email, GitHub URL, LinkedIn URL |

Also update:
- `src/components/Hero.jsx` — the orbiting tech icons and initials ("JG") in the hero section
- `src/components/About.jsx` — bio text, terminal commands, stat card values, and tech badges
- `api/active_resume.pdf` — replace with your own resume PDF

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails without a backend.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy your Service ID, Template ID, and Public Key into `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Resume Download

The resume is served through a Vercel serverless function (`api/resume.js`) with bot detection and token validation. Replace `api/active_resume.pdf` with your own resume file.

## Deployment

This project is configured for **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` config handles the serverless function and PDF bundling automatically.

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT — see [LICENSE](LICENSE) for details.
