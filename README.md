# Prince William Islamic Center (PWIC) Website

A modern, fast, and user-friendly website for Prince William Islamic Center built with Astro and Tailwind CSS.

## Features

- **Modern Design**: Clean, responsive layout that works on all devices
- **Prayer Times**: Integration with Mawaqit for automatic prayer time updates
- **Announcements**: Easy-to-update announcement system
- **Sunday School**: Registration form integration with Google Forms
- **Events Calendar**: Google Calendar integration for community events
- **Donations**: Links to online donation platforms
- **Contact Form**: Formspree-powered contact form
- **Fast Performance**: Static site generation for lightning-fast load times
- **Free Hosting**: Designed for GitHub Pages, Netlify, or Vercel

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Mawaqit](https://mawaqit.net) - Prayer times widget
- [Formspree](https://formspree.io) - Contact form handling

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server runs at `http://localhost:4321`

## Project Structure

```
pwic/
├── public/
│   └── images/          # Website images
├── src/
│   ├── components/      # Reusable components
│   ├── data/            # JSON data files (easy to edit!)
│   │   ├── announcements.json
│   │   ├── services.json
│   │   └── site-config.json
│   ├── layouts/         # Page layouts
│   ├── pages/           # Website pages
│   └── styles/          # Global styles
├── CONTENT-GUIDE.md     # Guide for updating content
└── README.md
```

## Updating Content

See [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) for detailed instructions on:
- Updating announcements
- Configuring prayer times with Mawaqit
- Setting up Sunday School registration
- Managing events calendar
- Updating contact information

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as source
4. Create `.github/workflows/deploy.yml` (see below)

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import your GitHub repository to Vercel
2. Framework preset: Astro
3. Deploy!

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Configuration

All configuration is in `src/data/site-config.json`:

- Site name and tagline
- Contact information
- Social media links
- Mawaqit mosque ID
- Google Calendar ID
- Donation links

## License

This website is created for Prince William Islamic Center.

## Support

For technical support, please contact your web administrator.
