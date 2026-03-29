# Wingspan — A Website for Finch

Built for the **AggieX Startup Challenge** for the TACS Build4Good hackathon.

## What is Finch?

Finch is a Chrome extension that autofills job applications with AI-tailored resumes, helping CS and engineering students apply smarter — not harder.

## What We Built

A multi-page marketing website for Finch with:

- **Home** — Animated hero with rotating headline, live autofill mockup simulating the Chrome extension, interactive "With Finch vs. Without Finch" inbox comparison, pricing toggle, FAQ accordion, and waitlist capture form with social sharing
- **How It Works** — 5-step visual walkthrough with animated step components including a LinkedIn OAuth flow, job scanner, resume editor, autofill demo, and confirmation screen
- **About** — Team bios, mission/vision statements, and a custom scatter-backdrop with illustrated brand icons
- **Dark mode** — Full site-wide theme toggle built on CSS custom properties

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Team

- **Riya Patel**
- **Manasa Kilaru**
- **Kaori Shioyama**
- **Emily Lou**

## Running Locally

```bash
npm install
npm run dev
```

##Live Vercel Link
https://finch-website.vercel.app/

Open [http://localhost:3000](http://localhost:3000).

## Design Decisions

We had no mockups or wireframes — every UI decision was ours to make. We studied the Finch brief and three design inspiration sites, then built the site from scratch with a focus on motion, hierarchy, and brand consistency. The animated birds, typewriter effects, and scroll-based reveals were all designed to bring the Finch brand to life without overwhelming the user.

## What's Next

- Connect waitlist and contact forms to a real backend
- Improve accessibility and keyboard navigation
- Optimize animation performance for faster initial load times
