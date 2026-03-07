# Portfolio Website — Implementation Plan

## Overview

Build a developer portfolio for **Joseph Genio** using the existing React + Vite + TailwindCSS v4 + Framer Motion scaffold. The site follows the structural layout of the [reference site](https://figma-portfolio-ten.vercel.app) with a custom dark blue/indigo color scheme, scroll-based animations, and a fully JSON-driven data architecture.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI framework |
| Vite | 7.3.1 | Build tool & dev server |
| TailwindCSS | 4.2.1 | Utility-first CSS (via `@tailwindcss/vite`) |
| Framer Motion | 12.35.0 | Scroll & hover animations |
| react-icons | — | Icon library (GitHub, LinkedIn, etc.) |
| react-type-animation | — | Typing effect in Hero section |

---

## Color Scheme

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0f172a` | Page background |
| `--color-bg-light` | `#1e293b` | Card / section backgrounds |
| `--color-primary` | `#6366f1` | Buttons, links, accents |
| `--color-primary-hover` | `#818cf8` | Hover state for primary |
| `--color-secondary` | `#22c55e` | Secondary buttons / highlights |
| `--color-accent` | `#f59e0b` | Accent elements |
| `--color-text` | `#e5e7eb` | Body text |
| `--color-text-muted` | `#94a3b8` | Muted / secondary text |

Defined via TailwindCSS v4 `@theme` block in `src/index.css`, which auto-generates utility classes like `bg-primary`, `text-accent`, etc.

---

## Project Structure

```
src/
├── animations/
│   └── variants.js          # Shared Framer Motion animation variants
├── assets/                   # Images, illustrations
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── data/
│   ├── site.json             # Name, title, tagline, resume path
│   ├── skills.json            # Skills grouped by category
│   ├── projects.json          # Project entries
│   ├── experience.json        # Work history entries
│   └── contact.json           # Contact links
├── App.jsx                    # Root component assembling all sections
├── main.jsx                   # Entry point
└── index.css                  # TailwindCSS import + @theme config

public/
├── resume.pdf                 # Downloadable resume
└── projects/                  # Project screenshot images
    ├── inventory.png
    ├── banking.png
    ├── trading.png
    └── carrental.png
```

---

## Data Architecture

All static content is stored in JSON files under `src/data/` and imported directly by components. Vite bundles them at build time — no API calls or loading states needed.

### `site.json`

```json
{
  "name": "Joseph Genio",
  "title": "Software Developer",
  "tagline": "Building modern web applications with clean, efficient code.",
  "resume": "/resume.pdf"
}
```

### `skills.json`

```json
{
  "frontend": ["React", "TypeScript", "WordPress", "Magento"],
  "backend": ["Node.js", "ASP.NET Core", "REST API", "DAML"],
  "database": ["MS SQL", "MySQL", "PostgreSQL"],
  "testing": ["Cypress", "Jest"],
  "devops": ["Docker", "Jenkins", "Git", "GitHub Actions", "Kibana"]
}
```

### `projects.json`

```json
[
  {
    "title": "Inventory Management System",
    "description": "Web-based inventory management for tracking stock, orders, and product data with real-time updates.",
    "stack": ["React", "Node.js", "TypeScript", "MS SQL"],
    "github": "",
    "demo": "",
    "image": "/projects/inventory.png"
  },
  {
    "title": "Banking Application",
    "description": "Core banking application with account management, transactions, and reporting.",
    "stack": ["C#", "ASP.NET Core", "MS SQL"],
    "github": "",
    "demo": "",
    "image": "/projects/banking.png"
  },
  {
    "title": "Trading Application",
    "description": "Smart contract-based trading platform for secure, transparent transactions.",
    "stack": ["DAML", "React", "TypeScript"],
    "github": "",
    "demo": "",
    "image": "/projects/trading.png"
  },
  {
    "title": "Car Rental Platform",
    "description": "Full-featured car rental management system with custom booking and fleet management.",
    "stack": ["Magento", "PHP", "MySQL"],
    "github": "",
    "demo": "",
    "image": "/projects/carrental.png"
  }
]
```

### `experience.json`

```json
[
  {
    "title": "Software Developer",
    "company": "",
    "type": "Full Time",
    "description": [
      "Develop and maintain web applications using Node.js, React, TypeScript, and MS SQL",
      "Write and maintain automated tests with Cypress and Jest",
      "Handle deployments, monitoring, and client technical support"
    ]
  },
  {
    "title": "Software Developer",
    "company": "",
    "type": "Part Time",
    "description": [
      "Built DAML and React-based trading applications",
      "Developed a Magento-based car rental management system",
      "Created and maintained WordPress websites for clients"
    ]
  },
  {
    "title": "Software Developer & Technical Support",
    "company": "",
    "type": "Full Time",
    "description": [
      "Developed a core banking application using C# and ASP.NET Core",
      "Built a laundry service management application",
      "Provided technical support and maintenance"
    ]
  },
  {
    "title": "On the Job Trainee",
    "company": "",
    "type": "Intern",
    "description": [
      "Developed a School Alarm Scheduler web interface",
      "Gained hands-on experience with web development fundamentals"
    ]
  }
]
```

### `contact.json`

```json
{
  "email": "",
  "github": "",
  "linkedin": ""
}
```

---

## Animation Strategy

All animations use **Framer Motion**. Shared variants live in `src/animations/variants.js`.

### Shared Variants

| Variant | Usage | Behavior |
|---|---|---|
| `fadeUpVariant` | Every section | Fade in + slide up 40px on scroll |
| `staggerContainer` | Grids & lists | Stagger children by 0.1s |
| `cardHover` | Skill & project cards | Scale to 1.03 on hover |
| `fadeLeftVariant` | About image, Contact info | Fade in from left |
| `fadeRightVariant` | About text, Contact form | Fade in from right |

### Scroll Trigger Pattern

Every section uses this pattern:

```jsx
<motion.section
  id="sectionName"
  className="py-20 px-6 scroll-mt-20"
  variants={fadeUpVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
```

- `once: true` — animation plays only the first time
- `amount: 0.2` — triggers when 20% of the section is visible
- `scroll-mt-20` — offsets scroll position for the fixed navbar

### Section-Specific Animations

| Section | Animation |
|---|---|
| **Navbar** | `backdrop-blur-md` on scroll (triggered at `scrollY > 50`) |
| **Hero** | Typing text effect via `react-type-animation`, staggered fade-up for content, floating animation on illustration |
| **About** | Left image fades from left, right text fades from right |
| **Skills** | Cards stagger in, hover scale effect |
| **Projects** | Cards stagger in, hover scale effect |
| **Experience** | Timeline entries stagger fade-up |
| **Contact** | Left info fades from left, right form fades from right |

---

## Component Specifications

### 1. Navbar

- **Position:** Fixed top, full width, `z-50`
- **Left:** Name/logo linking to `#hero`
- **Right:** Nav links — About, Skills, Projects, Experience, Contact
- **Scroll behavior:** Transparent initially → `bg-bg/80 backdrop-blur-md shadow-lg` after 50px scroll
- **Mobile:** Hamburger icon toggling a slide-down menu with `AnimatePresence`
- **Navigation:** Anchor links (`<a href="#section">`) with `scroll-behavior: smooth` on `html`

### 2. Hero (`id="hero"`)

- **Layout:** Two-column grid (`lg:grid-cols-2`), `min-h-screen`, vertically centered
- **Left column:**
  - Greeting: "Hi, I'm" in `text-secondary`
  - Name from `site.json` — large bold heading
  - Typing animation cycling: `["Software Developer", "Full Stack Developer", "React Developer"]`
  - Tagline paragraph in `text-text-muted`
  - Three buttons:
    - **View Projects** → `bg-primary`, links to `#projects`
    - **Download Resume** → outline style, `<a href="/resume.pdf" download>`
    - **Contact Me** → `bg-secondary`, links to `#contact`
- **Right column:** Placeholder illustration with floating animation (`animate={{ y: [0, -10, 0] }}`, `repeat: Infinity`)

### 3. About (`id="about"`)

- **Layout:** Two-column grid
- **Left:** Profile image or placeholder
- **Right:** "About Me" heading + 2–3 paragraphs covering full-stack experience (React, Node.js, ASP.NET Core, testing)
- **Animation:** Left fades from left, right fades from right

### 4. Skills (`id="skills"`)

- **Layout:** "Skills & Technologies" heading + grid (`md:grid-cols-2 lg:grid-cols-3`)
- **Cards:** `bg-bg-light rounded-xl p-6 border border-gray-700/50`
  - Icon (from `react-icons`) + category title
  - Skill names as pill/badge tags
- **Categories & icons:**
  - Frontend → `FaCode`
  - Backend → `FaServer`
  - Database → `FaDatabase`
  - Testing → `FaVial`
  - DevOps → `FaDocker`
- **Data source:** `skills.json` — iterate `Object.entries(skills)`

### 5. Projects (`id="projects"`)

- **Layout:** "Projects" heading + grid (`md:grid-cols-2`, `gap-8`)
- **Cards:** `bg-bg-light rounded-xl overflow-hidden border border-gray-700/50`
  - Image area (`h-48`, colored placeholder if no image)
  - Title (bold)
  - Description (`text-text-muted`)
  - Tech stack as small pill badges in flex-wrap row
  - GitHub / Demo icon links (`FaGithub`, `FaExternalLinkAlt`)
- **Data source:** `projects.json` — map over array

### 6. Experience (`id="experience"`)

- **Layout:** "Experience" heading + vertical timeline
- **Timeline structure:**
  - Left border line: `border-l-2 border-primary/30`
  - Dot marker: absolute-positioned circle in `bg-primary`
  - Content card: title, company, type badge, bullet list
- **Data source:** `experience.json` — map over array

### 7. Contact (`id="contact"`)

- **Layout:** Two-column grid
- **Left:** "Get In Touch" heading + contact links with icons:
  - `FaEnvelope` — email
  - `FaGithub` — GitHub
  - `FaLinkedin` — LinkedIn
- **Right:** Contact form (Name, Email, Message fields + Submit button)
  - Visual-only for now (shows success message on submit, no backend)
  - `useState` for form fields + submitted state

### 8. Footer

- **Layout:** `bg-bg-light/50 border-t border-gray-700/50`, centered
- **Content:**
  - Social icon links (GitHub, LinkedIn, Email)
  - "Built with React & TailwindCSS"
  - Copyright © 2026 Joseph Genio

---

## Implementation Order

| Step | File | Action |
|---|---|---|
| 1 | `src/index.css` | Modify — add `@theme` colors, smooth scroll, body styles |
| 2 | `index.html` | Modify — update `<title>` |
| 3 | `src/data/site.json` | Create |
| 4 | `src/data/skills.json` | Create |
| 5 | `src/data/projects.json` | Create |
| 6 | `src/data/experience.json` | Create |
| 7 | `src/data/contact.json` | Create |
| 8 | `src/animations/variants.js` | Create |
| 9 | `src/components/Navbar.jsx` | Create |
| 10 | `src/components/Hero.jsx` | Create |
| 11 | `src/components/About.jsx` | Create |
| 12 | `src/components/Skills.jsx` | Create |
| 13 | `src/components/Projects.jsx` | Create |
| 14 | `src/components/Experience.jsx` | Create |
| 15 | `src/components/Contact.jsx` | Create |
| 16 | `src/components/Footer.jsx` | Create |
| 17 | `src/App.jsx` | Modify — import & render all sections |

---

## Verification

1. **Build check:** `npm run build` — no errors
2. **Visual check:** `npm run dev` — verify:
   - All 8 sections render correctly
   - Scroll navigation works (navbar links → smooth scroll to sections)
   - Navbar blurs on scroll
   - Typing animation works in Hero
   - Sections fade up on scroll
   - Cards have hover scale effects
   - Mobile hamburger menu works
   - Resume download link works

---

## Future Enhancements (Out of Scope)

- Dark / Light mode toggle
- Blog section
- GitHub contribution graph
- Project filtering
- Contact form backend (EmailJS / Formspree)
- Real project screenshots
- Deployment to Vercel / Netlify
