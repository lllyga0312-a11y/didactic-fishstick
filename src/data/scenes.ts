// Typical build-ups per application, picked from the "用途" text of each data
// sheet. Indicative only until the technical staff confirm them.

import type { Lang } from './site';
import { productBySlug, type Product } from './catalog';
import type { Scene } from './recommend';

type L = Record<Lang, string>;

export const scenes: { id: Scene; name: L; need: L }[] = [
  { id: 'plant', name: { zh: '工业厂房', en: 'Manufacturing plants' }, need: { zh: '设备荷载、人车通行、偶有油污', en: 'Machine loads, foot and vehicle traffic, oil spills' } },
  { id: 'warehouse', name: { zh: '仓储物流', en: 'Warehouses & logistics' }, need: { zh: '大面积、防尘耐磨、预算有限', en: 'Large areas, dust-proofing and wear, tight budgets' } },
  { id: 'carpark', name: { zh: '停车库', en: 'Car parks' }, need: { zh: '车辆碾压、防滑', en: 'Tire traffic, slip resistance' } },
  { id: 'food', name: { zh: '食品医药', en: 'Food & pharma' }, need: { zh: '易清洁、耐冲洗、冷热交替', en: 'Easy cleaning, washdown, hot and cold cycles' } },
  { id: 'esd', name: { zh: '电子防静电', en: 'Electronics (ESD)' }, need: { zh: '电子车间、机房，需要导走静电', en: 'Static control for electronics plants and server rooms' } },
  { id: 'chemical', name: { zh: '化工重防腐', en: 'Chemical plants' }, need: { zh: '酸碱、溶剂直接接触', en: 'Direct contact with acids, alkalis and solvents' } },
];

const layer = {
  primer: { zh: '底漆', en: 'Primer' },
  body: { zh: '中涂', en: 'Body coat' },
  top: { zh: '面漆', en: 'Topcoat' },
  conductive: { zh: '导电层', en: 'Conductive layer' },
  sealer: { zh: '渗透固化', en: 'Penetrating sealer' },
  primerBody: { zh: '底漆 / 中涂', en: 'Primer / body coat' },
};

const plan: Record<Scene, [keyof typeof layer, string][]> = {
  plant: [['primer', 'batov-1002'], ['body', 'batov-2001'], ['top', 'batov-3002']],
  warehouse: [['sealer', 'batov-1010']],
  carpark: [['primer', 'batov-1002'], ['body', 'batov-2001'], ['top', 'batov-3003']],
  food: [['primer', 'batov-8001'], ['top', 'batov-1031']],
  esd: [['primer', 'batov-1002'], ['conductive', 'batov-5001'], ['top', 'batov-5003']],
  chemical: [['primerBody', 'batov-9001'], ['top', 'batov-9003']],
};

export const buildups = Object.fromEntries(
  Object.entries(plan).map(([id, layers]) => [
    id,
    layers.map(([l, slug]) => {
      const product = productBySlug(slug);
      if (!product) throw new Error(`scenes.ts: unknown product ${slug}`);
      return { layer: layer[l], product };
    }),
  ]),
) as Record<Scene, { layer: L; product: Product }[]>;
