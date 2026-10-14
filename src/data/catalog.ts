// Product catalog built from the company's own data sheets (巴特夫画册文字资料).
// Each series lives in ./series/<id>.json; photos come from ./photos.json.
// Values are copied from the sheets: do not edit numbers here without a new
// data sheet.

import type { Lang } from './site';
import photosJson from './photos.json';

type L = Record<Lang, string>;

export interface Spec { k: L; v: L; std?: string }
export interface Product {
  code: string;
  slug: string;
  name: L;
  summary: L;
  uses: L;
  features: Record<Lang, string[]>;
  packaging: L;
  mixRatio: string;
  coverage: string;
  filmThickness: string;
  specs: Spec[];
  application: Spec[];
  shelfLife: L;
  techSupport: boolean;
  series: string;
}
export interface Series {
  id: string;
  name: L;
  intro: L;
  notes: { title: L; body: L }[];
  products: Product[];
}
export interface Photo { src: string; sm: string; w: number; h: number; source: string; alt: L }

const files = import.meta.glob<{ default: Omit<Series, 'products'> & { products: Omit<Product, 'series'>[] } }>('./series/*.json', { eager: true });

// Display order of the series.
const order = [
  'epoxy-primer', 'epoxy-midcoat', 'epoxy-topcoat', 'epoxy-self-leveling', 'epoxy-esd',
  'polyurethane', 'vinyl-ester', 'waterborne', 'acrylic', 'concrete-sealer', 'specialty',
];

export const series: Series[] = Object.values(files)
  .map((m) => ({ ...m.default, products: m.default.products.map((p) => ({ ...p, series: m.default.id })) }))
  .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

export const products: Product[] = series.flatMap((s) => s.products);

export const seriesById = (id: string) => series.find((s) => s.id === id);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

// Groups shown as "by material" on the home page and product center.
export const groups: { id: string; name: L; desc: L; series: string[] }[] = [
  {
    id: 'epoxy',
    name: { zh: '环氧地坪漆', en: 'Epoxy floor coatings' },
    desc: { zh: '底漆、中涂、平涂面漆、自流平、防静电，按层配套。', en: 'Primers, body coats, roller-coat topcoats, self-leveling and ESD, matched layer by layer.' },
    series: ['epoxy-primer', 'epoxy-midcoat', 'epoxy-topcoat', 'epoxy-self-leveling', 'epoxy-esd'],
  },
  {
    id: 'pu',
    name: { zh: '聚氨酯地坪漆', en: 'Polyurethane floor coatings' },
    desc: { zh: '聚氨酯底中面漆、自流平、罩面清漆和超耐磨面漆。', en: 'PU primers, body coats, topcoats, self-leveling, clear coats and high-wear finishes.' },
    series: ['polyurethane'],
  },
  {
    id: 'anticorrosion',
    name: { zh: '重防腐地坪漆', en: 'Chemical-resistant coatings' },
    desc: { zh: '乙烯基重防腐底漆、平涂面漆和自流平，用于酸碱、溶剂环境。', en: 'Vinyl ester primer, topcoat and self-leveling for acids, alkalis and solvents.' },
    series: ['vinyl-ester'],
  },
  {
    id: 'other',
    name: { zh: '水性、丙烯酸与固化剂', en: 'Waterborne, acrylic & sealers' },
    desc: { zh: '水性地坪漆、彩色路面漆、丙烯酸球场漆、混凝土密封固化剂、划线漆。', en: 'Waterborne floors, colored paving, acrylic sports surfaces, concrete sealer-hardener, line marking.' },
    series: ['waterborne', 'acrylic', 'concrete-sealer', 'specialty'],
  },
];

const photos = photosJson as unknown as { series: Record<string, Photo[]>; projects: { site: string; desc: L; photos: Photo[] }[] };
export const seriesPhotos = (id: string): Photo[] => photos.series[id] ?? [];
export const projectSites = photos.projects ?? [];
