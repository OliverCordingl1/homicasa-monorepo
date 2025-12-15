# Homicasa Marketing Site

This is the marketing and landing page site for Homicasa, built with:

- **Next.js 15** - React framework
- **PayloadCMS 3.x** - Headless CMS for content management
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Plus Jakarta Sans** - Typography

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) for the marketing site
5. Open [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Public marketing pages
│   │   ├── page.tsx     # Homepage
│   │   ├── features/    # Features page
│   │   └── waitlist/    # Waitlist signup page
│   └── (payload)/       # PayloadCMS admin routes
├── components/
│   ├── forms/           # Form components (waitlist)
│   ├── layout/          # Header, Footer
│   ├── sections/        # Page sections (Hero, Features, CTA)
│   └── ui/              # Base UI components
├── lib/
│   ├── actions.ts       # Server actions
│   └── utils.ts         # Utility functions
├── payload/
│   └── collections/     # PayloadCMS collections
└── styles/
    └── globals.css      # Global styles & design tokens
```

## PayloadCMS Collections

- **Users** - Admin users for CMS access
- **Pages** - CMS-managed pages (for future use)
- **Media** - Image and file uploads
- **Waitlist** - Email signups for launch waitlist

## Design System

The site uses a custom warm color palette that's distinct from typical shadcn styling:

- **Brand colors**: Warm amber/brown tones
- **Accent colors**: Coral tones
- **Surface colors**: Warm grays

All design tokens are defined in `src/styles/globals.css` using OKLCH color space.
