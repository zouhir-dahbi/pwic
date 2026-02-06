# PWIC Website - Content Update Guide

This guide explains how to update content on the PWIC website. No coding knowledge required!

## Table of Contents
1. [Updating Announcements](#updating-announcements)
2. [Configuring Prayer Times (Mawaqit)](#configuring-prayer-times)
3. [Setting Up Sunday School Registration](#setting-up-sunday-school-registration)
4. [Setting Up Events Calendar](#setting-up-events-calendar)
5. [Updating Contact Form](#updating-contact-form)
6. [Deploying Changes](#deploying-changes)

---

## Updating Announcements

Announcements appear on the homepage. To update them:

1. Open the file: `src/data/announcements.json`
2. Edit the announcements:

```json
[
  {
    "id": 1,
    "title": "Your Announcement Title",
    "content": "Your announcement message here.",
    "type": "info",
    "active": true
  }
]
```

### Announcement Types:
- `"info"` - Blue background (general information)
- `"highlight"` - Green background (important news)
- `"event"` - Amber/yellow background (upcoming events)
- `"urgent"` - Red background (urgent notices)

### Show/Hide Announcements:
- Set `"active": true` to show
- Set `"active": false` to hide (keeps it for future use)

---

## Configuring Prayer Times

### Option 1: Mawaqit (Recommended)

1. **Register your mosque at Mawaqit:**
   - Go to: https://mawaqit.net/en/mosque-registration
   - Fill out the registration form
   - Wait for approval (usually 1-2 days)
   - You'll receive a mosque ID (e.g., `prince-william-islamic-center`)

2. **Add your Mawaqit ID to the website:**
   - Open: `src/data/site-config.json`
   - Find the `prayerTimes` section:
   ```json
   "prayerTimes": {
     "provider": "mawaqit",
     "mawaqitMosqueId": "your-mosque-id-here"
   }
   ```
   - Replace `YOUR_MOSQUE_ID_HERE` with your actual mosque ID

3. **Manage prayer times:**
   - Log in to https://mawaqit.net
   - Update times through their dashboard
   - Changes appear automatically on your website!

---

## Setting Up Sunday School Registration

### Using Google Forms (Recommended)

1. **Create a Google Form:**
   - Go to https://forms.google.com
   - Create a new form with registration fields
   - Click "Send" → Get the embed link

2. **Add the form URL:**
   - Open: `src/data/site-config.json`
   - Find the `sundaySchool` section:
   ```json
   "sundaySchool": {
     "googleFormUrl": "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
     "registrationOpen": true
   }
   ```
   - Replace with your Google Form embed URL

3. **Open/Close Registration:**
   - Set `"registrationOpen": true` to show the form
   - Set `"registrationOpen": false` to show "Coming Soon" message

---

## Setting Up Events Calendar

### Using Google Calendar

1. **Create a Google Calendar:**
   - Go to https://calendar.google.com
   - Create a new calendar for PWIC events
   - Add your events to this calendar

2. **Make the calendar public:**
   - Go to Calendar Settings → Access permissions
   - Enable "Make available to public"

3. **Get the Calendar ID:**
   - In Calendar Settings, find "Calendar ID"
   - It looks like: `your-email@gmail.com` or a long string

4. **Add to website:**
   - Open: `src/data/site-config.json`
   - Update the `googleCalendarId`:
   ```json
   "googleCalendarId": "your-calendar-id@group.calendar.google.com"
   ```

---

## Updating Contact Form

The contact form uses Formspree (free for up to 50 submissions/month).

### Setup Formspree:

1. Go to https://formspree.io and create a free account
2. Create a new form
3. Copy your form ID (looks like: `abcd1234`)
4. Open: `src/pages/contact.astro`
5. Find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
6. Replace `YOUR_FORMSPREE_ID` with your actual form ID

---

## Updating Site Information

Edit `src/data/site-config.json` to update:

```json
{
  "siteName": "Prince William Islamic Center",
  "shortName": "PWIC",
  "tagline": "Serving the Muslim Community...",
  
  "contact": {
    "address": "Your Full Address Here",
    "phone": "(555) 123-4567",
    "email": "pwicimam@msn.com"
  },
  
  "socialLinks": {
    "facebook": "https://facebook.com/pwicva",
    "youtube": "",
    "instagram": ""
  },
  
  "donation": {
    "paypalLink": "https://your-donation-link.com",
    "zelleEmail": "donate@pwicva.org"
  }
}
```

---

## Updating Services

Edit `src/data/services.json` to add or modify services:

```json
{
  "id": 1,
  "title": "Service Name",
  "description": "Description of the service...",
  "icon": "mosque"
}
```

Available icons: `mosque`, `calendar`, `book`, `heart`, `support`, `community`

---

## Deploying Changes

### If using GitHub Pages or Netlify:

1. Save your changes
2. Commit to Git:
   ```bash
   git add .
   git commit -m "Updated announcements"
   git push
   ```
3. Changes will deploy automatically in 1-2 minutes

### Testing Locally:

```bash
npm run dev
```
Then open http://localhost:4321 in your browser

### Building for Production:

```bash
npm run build
```

---

## Quick Reference

| What to Update | File to Edit |
|----------------|--------------|
| Announcements | `src/data/announcements.json` |
| Site info & config | `src/data/site-config.json` |
| Services list | `src/data/services.json` |
| Contact form | `src/pages/contact.astro` |
| Images | Add to `public/images/` folder |

---

## Need Help?

If you need assistance updating the website, please contact your web administrator.
