import type { Lang } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// `path` is the page path without the language prefix, e.g. '/systems/'.
export const href = (lang: Lang, path = '/') => `${base}${lang === 'en' ? '/en' : ''}${path}`;
export const asset = (p: string) => `${base}${p}`;

// Preview builds (GitHub Pages) must stay out of search results so they do not
// compete with the real domain.
export const noindex = import.meta.env.NOINDEX === '1' || process.env.NOINDEX === '1';
