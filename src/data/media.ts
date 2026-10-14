// Company material that is still missing. Sections on the home page that
// depend on these stay hidden until real files are added here.

export const factoryPhotos: { src: string; alt: { zh: string; en: string } }[] = [];
export const certificates: { src: string; name: { zh: string; en: string } }[] = [];
export const downloads: { href: string; name: { zh: string; en: string } }[] = [];

// Videos are hosted on YouTube (English site) or Bilibili (Chinese site) and
// embedded here, so they cost no hosting traffic. `products` shows a video on
// those product pages too. `uploadDate` (YYYY-MM-DD) is needed for search
// engines to list the video; leave it out rather than guess.
export interface Video {
  platform: 'youtube' | 'bilibili';
  id: string; // YouTube video id, or Bilibili BV id
  lang: 'zh' | 'en';
  title: string;
  description?: string;
  uploadDate?: string;
  poster?: string; // local image, needed for Bilibili (YouTube has its own)
  products?: string[];
}
export const videos: Video[] = [];

// Channel pages, linked in the footer when filled in.
export const channels: { youtube?: string; bilibili?: string } = {};
