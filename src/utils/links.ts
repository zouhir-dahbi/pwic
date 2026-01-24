// Helper to prefix URLs with the base path for GitHub Pages
const base = import.meta.env.BASE_URL || '/';

export function url(path: string): string {
  // If path already includes the base, return as-is
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }
  
  // Handle root path
  if (path === '/') {
    return base;
  }
  
  // Normalize: ensure base ends with / and path doesn't start with /
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  
  return normalizedBase + normalizedPath;
}

export function assetUrl(path: string): string {
  return url(path);
}
