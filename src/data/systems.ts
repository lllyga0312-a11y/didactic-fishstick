// Floor systems. Technical values here come from the old batov.cn product pages
// and must be checked against the data sheets by the technical staff before
// launch (see `verified`). Unknown values stay as "[ ]" placeholders.

import type { Lang } from './site';

type L = Record<Lang, string>;

export type Category = 'epoxy' | 'pu' | 'chem' | 'other';
export type Scene = 'plant' | 'warehouse' | 'carpark' | 'food' | 'esd' | 'chemical';

export interface Layer { name: L; product: string; thickness: string }
export interface Param { k: L; v: L }

export interface FloorSystem {
  slug: string;
  category: Category;
  scenes: Scene[];
  name: L;
  summary: L;
  uses: Record<Lang, string[]>;
  layers: Layer[];
  params: Param[];
  verified: boolean;
}

export const categories: { id: Category; name: L; desc: L }[] = [
  {
    id: 'epoxy',
    name: { zh: '环氧地坪系统', en: 'Epoxy systems' },
    desc: { zh: '薄涂、砂浆、自流平、防静电、停车场，覆盖从轻载到重载。', en: 'Roller coats, mortars, self-leveling, ESD and car park systems.' },
  },
  {
    id: 'pu',
    name: { zh: '聚氨酯地坪系统', en: 'Polyurethane systems' },
    desc: { zh: '聚氨酯砂浆、哑光耐磨面涂，耐冷热冲击，适合食品和冷库。', en: 'PU mortar and matte topcoats for thermal shock and wet areas.' },
  },
  {
    id: 'chem',
    name: { zh: '防腐地坪系统', en: 'Chemical-resistant systems' },
    desc: { zh: '耐酸碱、耐化学品，用于化工车间、电镀区和水池池体。', en: 'Heavy-duty linings for chemical plants, plating areas and tanks.' },
  },
  {
    id: 'other',
    name: { zh: '耐磨固化与其他', en: 'Hardeners & more' },
    desc: { zh: '[按公司实际生产范围填写]', en: '[Only products we manufacture: to confirm]' },
  },
];

export const scenes: { id: Scene; name: L; need: L }[] = [
  { id: 'plant', name: { zh: '工业厂房', en: 'Manufacturing plants' }, need: { zh: '叉车通行、设备荷载、偶有油污', en: 'Forklift traffic, machine loads, oil spills' } },
  { id: 'warehouse', name: { zh: '仓储物流', en: 'Warehouses & logistics' }, need: { zh: '大面积、重载货架、频繁碾压', en: 'Large areas, racking loads, constant traffic' } },
  { id: 'carpark', name: { zh: '停车库', en: 'Car parks' }, need: { zh: '车辆碾压、坡道防滑、标识划线', en: 'Tire wear, anti-slip ramps, line marking' } },
  { id: 'food', name: { zh: '食品医药洁净', en: 'Food & pharma' }, need: { zh: '无缝易清洁、耐冲洗、冷热交替', en: 'Seamless, washdown, hot and cold cycles' } },
  { id: 'esd', name: { zh: '电子防静电', en: 'Electronics (ESD)' }, need: { zh: '电子车间、机房，需要导走静电', en: 'Static control for cleanrooms and server rooms' } },
  { id: 'chemical', name: { zh: '化工防腐', en: 'Chemical plants' }, need: { zh: '酸碱、溶剂、污水池', en: 'Acids, alkalis, solvents, wastewater tanks' } },
];

const tbd = (zh: string, en: string): Layer => ({ name: { zh, en }, product: '[ ]', thickness: '[ ]' });
const substrate: Layer = { name: { zh: '基面处理', en: 'Substrate preparation' }, product: '—', thickness: '—' };

export const systems: FloorSystem[] = [
  {
    slug: 'epoxy-self-leveling',
    category: 'epoxy',
    scenes: ['food', 'esd', 'plant'],
    name: { zh: '环氧自流平系统', en: 'Epoxy self-leveling system' },
    summary: {
      zh: '无溶剂、双组分、高固含的环氧自流平地坪。表面平整光亮、无缝易清洁，适合对洁净和美观要求高的场合。',
      en: 'Solvent-free, two-component, high-solids epoxy self-leveling floor. Smooth, glossy and seamless, for areas that must stay clean and look good.',
    },
    uses: { zh: ['洁净车间', '电子厂房', 'GMP 制药', '学校 · 办公'], en: ['Cleanrooms', 'Electronics plants', 'GMP pharma', 'Schools & offices'] },
    layers: [
      { name: { zh: '自流平面涂', en: 'Self-leveling topcoat' }, product: 'BATOV-4001 (A) + BATOV-G401 (B), 5:1', thickness: '0.7–1.0 mm' },
      tbd('砂浆中涂 / 腻子', 'Mortar body coat / putty'),
      tbd('环氧底涂', 'Epoxy primer'),
      substrate,
    ],
    params: [
      { k: { zh: '干燥时间', en: 'Drying time' }, v: { zh: '表干 ≤6 h · 实干 ≤48 h', en: 'Touch dry ≤6 h · hard dry ≤48 h' } },
      { k: { zh: '邵氏硬度（D）', en: 'Shore D hardness' }, v: { zh: '≥75', en: '≥75' } },
      { k: { zh: '耐磨性', en: 'Abrasion resistance' }, v: { zh: '≤0.03 [单位待核对]', en: '≤0.03 [unit to confirm]' } },
      { k: { zh: '抗压强度', en: 'Compressive strength' }, v: { zh: '≥80 MPa', en: '≥80 MPa' } },
      { k: { zh: '与水泥基面粘结强度', en: 'Bond strength to concrete' }, v: { zh: '≥2 MPa', en: '≥2 MPa' } },
      { k: { zh: '可使用时间（25℃）', en: 'Pot life (25 °C)' }, v: { zh: '约 20–25 min', en: 'approx. 20–25 min' } },
      { k: { zh: '施工温度', en: 'Application temperature' }, v: { zh: '5–35 ℃', en: '5–35 °C' } },
      { k: { zh: '包装 · 保质期', en: 'Packaging · shelf life' }, v: { zh: 'A 组分 25 kg + B 组分 5 kg 铁桶 · 密封 6 个月', en: 'A 25 kg + B 5 kg steel pails · 6 months sealed' } },
    ],
    verified: false,
  },
  {
    slug: 'epoxy-mortar',
    category: 'epoxy',
    scenes: ['plant', 'warehouse'],
    name: { zh: '环氧砂浆系统', en: 'Epoxy mortar system' },
    summary: { zh: '加厚的环氧砂浆中涂，抗压耐冲击，适合叉车通行和重载区域。', en: 'Thick epoxy mortar build-up with high compressive and impact strength for forklift and heavy-load areas.' },
    uses: { zh: ['机械厂房', '仓储物流', '重载通道'], en: ['Machine shops', 'Warehouses', 'Heavy traffic aisles'] },
    layers: [tbd('环氧面涂', 'Epoxy topcoat'), tbd('环氧砂浆中涂', 'Epoxy mortar body coat'), tbd('环氧底涂', 'Epoxy primer'), substrate],
    params: [],
    verified: false,
  },
  {
    slug: 'epoxy-thin-coat',
    category: 'epoxy',
    scenes: ['plant'],
    name: { zh: '环氧薄涂系统', en: 'Epoxy roller coat system' },
    summary: { zh: '经济型环氧薄涂，防尘易清洁，适合轻载区域和预算有限的项目。', en: 'Economical epoxy roller coat. Dust-proof and easy to clean, for light traffic and tight budgets.' },
    uses: { zh: ['轻载车间', '库房', '设备间'], en: ['Light-duty workshops', 'Storerooms', 'Plant rooms'] },
    layers: [tbd('环氧面涂', 'Epoxy topcoat'), tbd('环氧底涂', 'Epoxy primer'), substrate],
    params: [],
    verified: false,
  },
  {
    slug: 'epoxy-esd',
    category: 'epoxy',
    scenes: ['esd'],
    name: { zh: '环氧防静电自流平系统', en: 'Epoxy ESD self-leveling system' },
    summary: { zh: '导静电环氧自流平，配铜箔接地网，适合电子车间和机房。', en: 'Conductive epoxy self-leveling floor with a copper grounding grid, for electronics plants and server rooms.' },
    uses: { zh: ['电子车间', '机房', '洁净室'], en: ['Electronics plants', 'Server rooms', 'Cleanrooms'] },
    layers: [tbd('防静电自流平面涂', 'ESD self-leveling topcoat'), tbd('导电底层 + 铜箔', 'Conductive primer + copper tape'), tbd('环氧底涂', 'Epoxy primer'), substrate],
    params: [],
    verified: false,
  },
  {
    slug: 'epoxy-car-park',
    category: 'epoxy',
    scenes: ['carpark'],
    name: { zh: '环氧停车场系统', en: 'Epoxy car park system' },
    summary: { zh: '耐碾压、防滑的停车场地坪，可配坡道防滑和交通划线。', en: 'Wear-resistant, anti-slip car park floor with ramp and line-marking options.' },
    uses: { zh: ['地下车库', '车道坡道', '停车楼'], en: ['Underground car parks', 'Ramps', 'Parking structures'] },
    layers: [tbd('防滑面涂', 'Anti-slip topcoat'), tbd('环氧砂浆中涂', 'Epoxy mortar body coat'), tbd('环氧底涂', 'Epoxy primer'), substrate],
    params: [],
    verified: false,
  },
  {
    slug: 'pu-mortar',
    category: 'pu',
    scenes: ['food'],
    name: { zh: '聚氨酯砂浆系统', en: 'PU mortar system' },
    summary: { zh: '水性聚氨酯砂浆，耐冷热冲击、耐冲洗，适合食品厂、冷库和潮湿环境。', en: 'Water-based PU mortar with thermal-shock and washdown resistance, for food plants, cold stores and wet areas.' },
    uses: { zh: ['食品厂房', '冷库', '饮料厂'], en: ['Food plants', 'Cold stores', 'Beverage plants'] },
    layers: [tbd('聚氨酯面涂', 'PU topcoat'), tbd('聚氨酯砂浆', 'PU mortar'), tbd('底涂', 'Primer'), substrate],
    params: [],
    verified: false,
  },
  {
    slug: 'chemical-resistant',
    category: 'chem',
    scenes: ['chemical'],
    name: { zh: '重防腐地坪系统', en: 'Heavy-duty chemical-resistant system' },
    summary: { zh: '玻璃钢增强的重防腐地坪（如三布五油），耐酸碱、耐溶剂，也可用于水池池体。', en: 'Fiberglass-reinforced heavy-duty lining, resistant to acids, alkalis and solvents; also for tanks and pits.' },
    uses: { zh: ['化工车间', '电镀区', '污水池'], en: ['Chemical plants', 'Plating areas', 'Wastewater tanks'] },
    layers: [tbd('防腐面涂', 'Chemical-resistant topcoat'), tbd('玻璃布增强层', 'Fiberglass reinforcement'), tbd('防腐底涂', 'Primer'), substrate],
    params: [],
    verified: false,
  },
];

// Estimator rule: scene + needs -> system. Illustrative until the technical
// staff confirm it.
export function recommend(scene: Scene, needs: { heavy: boolean; esd: boolean; chem: boolean }): string {
  if (needs.esd || scene === 'esd') return 'epoxy-esd';
  if (needs.chem || scene === 'chemical') return 'chemical-resistant';
  if (scene === 'food') return 'pu-mortar';
  if (scene === 'carpark') return 'epoxy-car-park';
  if (needs.heavy || scene === 'warehouse') return 'epoxy-mortar';
  return 'epoxy-thin-coat';
}
