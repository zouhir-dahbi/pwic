// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom domain configuration
  site: 'https://pwicva.org',
  
  vite: {
    plugins: [tailwindcss()]
  }
});
