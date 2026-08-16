# GMI Website

A modern Next.js website for the GMI Global Vision Foundation, built with the App Router and styled with Tailwind CSS.

## Project Overview

This project is a marketing and community website for an organization focused on:

- community outreach and advocacy
- youth empowerment
- education and entrepreneurship support
- volunteer engagement
- partnership development

The site includes pages for the homepage, about, donate, news, partner, and volunteer registration.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the site in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
  about/
  donate/
  news/
  partner/
  volunteer/
  globals.css
  layout.tsx
  page.tsx
components/
  ProjectCard.tsx
public/
```

## Notes

- The volunteer page includes a multi-step membership form with validation.
- The project is configured for static page generation by default.
- This repo is intended to be used as a front-end website for a nonprofit or community foundation.

## Deployment

This app can be deployed to any hosting platform that supports Next.js, including Vercel, Netlify, and similar providers.

For Vercel, the recommended path is:

```bash
npm run build
```

Then deploy the project through the Vercel dashboard or CLI.
