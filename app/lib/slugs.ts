export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

export function createAdSlug(headline: string, id: string): string {
  const slug = createSlug(headline);
  return `${slug}-${id}`;
}

export function createCompanySlug(companyName: string, id: string): string {
  const slug = createSlug(companyName);
  return `${slug}-${id}`;
}

export function extractIdFromSlug(slug: string): string {
  // Extract the ID from the end of the slug (after the last hyphen)
  const parts = slug.split('-');
  return parts[parts.length - 1];
}

export function parseAdSlug(slug: string): { id: string; slug: string } {
  const id = extractIdFromSlug(slug);
  return { id, slug };
}

export function parseCompanySlug(slug: string): { id: string; slug: string } {
  const id = extractIdFromSlug(slug);
  return { id, slug };
}