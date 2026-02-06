# Prince William Islamic Center (PWIC) Website

A modern, fast, and user-friendly website for Prince William Islamic Center built with Astro and Tailwind CSS.

## Features

- **Modern Design**: Clean, responsive layout optimized for all devices with compact hero sections
- **Prayer Times**: Custom prayer times display with Jummah information
- **Announcements**: Scrolling notification bar with customizable messages
- **Weekend Islamic School**: Complete education section with schedule, fees, registration, and downloadable forms
- **Services**: Marriage (Nikah), Divorce, Mediation, Counselling, Funeral services with downloadable PDF documents
- **Zakat Calculator**: Interactive calculator with real-time computation and nisab threshold check
- **Events Calendar**: Google Calendar integration for community events
- **Donations**: Multiple donation options with clear calls-to-action
- **Advertising**: Business advertising page for community sponsors
- **Contact Form**: FormSubmit-powered contact form with location info
- **Fast Performance**: Static site generation for lightning-fast load times
- **Free Hosting**: Designed for GitHub Pages deployment

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [FormSubmit](https://formsubmit.co) - Contact form handling

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

The development server runs at `http://localhost:4321/pwic/`

> **Note**: The `/pwic` base path is configured for GitHub Pages deployment.

## Project Structure

```
pwic/
├── public/
│   ├── documents/           # Downloadable PDFs
│   │   ├── weekend-school-registration.pdf
│   │   ├── weekend-school-tuition-fees.pdf
│   │   ├── application-for-assistance.pdf
│   │   ├── nikah-marriage-services.pdf
│   │   ├── mediation-services.pdf
│   │   ├── mediation-agreement.pdf
│   │   └── pwic-about.pdf
│   ├── images/              # Optimized website images
│   ├── favicon.ico          # Site favicon (PWIC logo)
│   └── apple-touch-icon.png # iOS home screen icon
├── src/
│   ├── components/
│   │   ├── Navigation.astro     # Header with dropdowns
│   │   ├── Footer.astro         # Site footer
│   │   ├── Hero.astro           # Homepage hero with slideshow
│   │   ├── SubPageHero.astro    # Compact sub-page headers
│   │   ├── PrayerTimes.astro    # Prayer times display
│   │   ├── ZakatCalculator.astro # Interactive zakat calculator
│   │   ├── Announcements.astro  # Scrolling notifications
│   │   ├── QuickLinks.astro     # Image-based quick links
│   │   └── ...
│   ├── data/
│   │   ├── announcements.json   # Announcement messages
│   │   ├── services.json        # Service descriptions
│   │   └── site-config.json     # Site configuration
│   ├── layouts/
│   │   └── Layout.astro         # Base page layout
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About page with mission/vision/goals
│   │   ├── contact.astro        # Contact form & info
│   │   ├── donate.astro         # Donation options
│   │   ├── events.astro         # Events calendar
│   │   ├── advertise.astro      # Business advertising
│   │   ├── education/           # Weekend school pages
│   │   └── services/            # Service pages
│   ├── styles/
│   │   └── global.css           # Tailwind & custom styles
│   └── utils/
│       └── links.ts             # URL helper functions
├── CONTENT-GUIDE.md             # Content update guide
└── README.md
```

## Pages

### Main Pages
| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero slideshow, prayer times, zakat calculator, quick links |
| About | `/about` | Mission, vision, goals, board members, masjid photos |
| Contact | `/contact` | Contact form, address, phone, email |
| Donate | `/donate` | Donation options and information |
| Events | `/events` | Featured events and Google Calendar |
| Advertise | `/advertise` | Business advertising opportunities |

### Education (Weekend School)
| Page | URL | Description |
|------|-----|-------------|
| Overview | `/education` | About the weekend school program |
| Schedule | `/education/schedule` | Class times (Sat & Sun) |
| Fees | `/education/fees` | Tuition info & financial assistance |
| Registration | `/education/registration` | Enrollment with downloadable form |

### Services
| Page | URL | Description |
|------|-----|-------------|
| Overview | `/services` | All services with image cards |
| Marriage | `/services/marriage` | Nikah services with PDF download |
| Divorce | `/services/divorce` | Islamic divorce information |
| Mediation | `/services/mediation` | Conflict resolution with PDF forms |
| Counselling | `/services/counselling` | Personal & family guidance |
| Funeral | `/services/funeral` | Janazah services |

## Key Components

### Zakat Calculator
Interactive form that calculates zakat based on:
- Cash & bank balances
- Investments & savings
- Gold & silver values
- Business assets
- Deductions for debts

Uses silver nisab threshold ($490) and 2.5% zakat rate.

### Hero Slideshow
Homepage features an auto-playing image slideshow with:
- Fade transitions
- Dot navigation
- Hover pause functionality
- Multiple background images

### Navigation
- Desktop: Full navigation with dropdown menus and image previews
- Tablet: Condensed navigation
- Mobile: Hamburger menu with accordions
- ADS button for advertising page
- Donate button with amber styling

## Configuration

Edit `src/data/site-config.json`:

```json
{
  "siteName": "Prince William Islamic Center",
  "tagline": "Serving Our Community with Faith",
  "contact": {
    "email": "pwicimam@msn.com",
    "phone": "703-330-3556",
    "address": "9002 Mathis Ave, Manassas VA 20110"
  },
  "socialLinks": {
    "facebook": "https://facebook.com/pwicva",
    "youtube": "https://youtube.com/@pwicva"
  }
}
```

## Updating Content

See [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) for detailed instructions on:
- Updating announcements
- Managing prayer times
- Weekend school registration
- Events calendar setup
- Contact information

## Deployment

### GitHub Pages (Current Setup)

1. Push code to GitHub
2. GitHub Actions automatically builds and deploys
3. Site available at `https://[username].github.io/pwic/`

### Custom Domain

Update `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://pwicva.org',
  // base: '/pwic', // Comment out for custom domain
});
```

## Recent Updates

- Redesigned compact hero sections for all pages
- Added image slideshow to homepage hero
- Integrated new PWIC logo throughout site
- Created Zakat Calculator with real-time calculations
- Added downloadable PDF documents for services and education
- Redesigned services pages with image cards
- Updated About page with Mission, Vision, and Goals
- Added Advertise page for business sponsors
- Improved footer layout with contact information
- Updated notification bar with faster scrolling
- Optimized all images for web performance

## License

This website is created for Prince William Islamic Center.

## Support

For technical support, contact your web administrator.
