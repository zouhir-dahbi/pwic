// Helper to prefix URLs with the base path for GitHub Pages
const base = import.meta.env.BASE_URL;

export function url(path: string): string {
  // Remove leading slash from path if base already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : base + '/';
  
  // Handle root path
  if (path === '/') {
    return base || '/';
  }
  
  return cleanBase + cleanPath;
}

export function assetUrl(path: string): string {
  return url(path);
}
