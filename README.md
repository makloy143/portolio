# Mark Louie Carnaje — Portfolio

A modern, professional portfolio website built with **Next.js**, TypeScript, and Tailwind CSS. Showcases skills, projects, and experience as a Full Stack Web Developer available for remote work.

## Features

- **Next.js App Router** — static pages, SEO metadata, JSON-LD, sitemap, robots, OG image
- **Modern UI** — Geist type, indigo accent, light/dark themes, responsive down to 320px
- **Project filter** — featured work plus filterable web apps / client websites
- **Printable résumé** — `/resume` renders from the same data, with Print and Download PDF
- **Working contact form** — shared client/server validation, honeypot, rate limit, Web3Forms delivery (falls back to the visitor's email app)
- **Accessible** — skip link, active-section nav, focus states, reduced-motion support

## Sections

Home · Work · About · Experience · Skills · Contact · `/resume`

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts) — profile, experience, skills, and projects.
The site, `/resume`, and the PDF all read from it. After editing, regenerate the PDF:

```bash
npm run dev          # in one terminal
npm run resume:pdf   # writes public/resume.pdf from /resume
```

Projects without a public screenshot get a generated cover; add `image: "/projects/<file>.png"` to use a real one.

## Tech Stack

- **Framework**: Next.js 15 · React 19 · TypeScript
- **Styling**: Tailwind CSS 4 · shadcn/ui (Base UI)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

Set `WEB3FORMS_ACCESS_KEY` (see `.env.example`) to deliver contact-form messages by email.

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint              |
| `npm run resume:pdf` | Regenerate `public/resume.pdf` |

## Contact

- **Email**: mcsjmtech@gmail.com
- **LinkedIn**: [Mark Louie Carnaje](https://www.linkedin.com/in/mark-louie-carnaje-983514198/)
- **GitHub**: [makloy143](https://github.com/makloy143)

---

Built with Next.js & Tailwind CSS
