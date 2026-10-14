// Questions answered from BATOV's own application guides and data sheets
// (/mnt/project-files/巴特夫画册文字资料). Keep every number traceable to a source.
type L = { zh: string; en: string };

export interface FaqItem {
  id: string;
  q: L;
  a: { zh: string[]; en: string[] };
  steps?: { zh: string[]; en: string[] };
  products?: string[]; // product slugs
  link?: { to: string; label: L };
  source: string; // source document, for the team
}

export interface FaqGroup { id: string; title: L; items: FaqItem[] }

export const faqGroups: FaqGroup[] = [
  {
    id: 'substrate',
    title: { zh: '地面基层和施工条件', en: 'Substrate and site conditions' },
    items: [
      {
        id: 'new-concrete',
        q: { zh: '新浇的混凝土地面，多久以后可以做地坪漆？', en: 'How long must new concrete cure before coating?' },
        a: {
          zh: [
            '做环氧底漆前，新混凝土要在 25℃ 下养护 15 天以上，强度达到 C25 以上，2 米内高低差小于 2 毫米，含水率低于 6%，表面坚固、不起砂。',
            '乙烯基重防腐地坪建议养护 30 天，等混凝土彻底固化、泛碱、干燥后再施工。混凝土密封固化剂可以早一些，新地面养护至少 3 天，最好 7 天以上。',
          ],
          en: [
            'Before an epoxy primer, new concrete should cure for more than 15 days at 25 °C, reach at least C25, be flat to within 2 mm over 2 m, have moisture content below 6 % and a sound surface with no dusting.',
            'For vinyl ester chemical-resistant floors we recommend 30 days, so the slab is fully cured and dry. A concrete densifier can go on earlier: at least 3 days after pouring, ideally 7 days or more.',
          ],
        },
        products: ['batov-1001', 'batov-1002', 'batov-1004', 'batov-1010'],
        source: '素地基面类型及适用底涂材料；乙烯基重防腐地坪施工指导；混凝土密封固化剂施工指导',
      },
      {
        id: 'old-floors',
        q: { zh: '旧地面、水磨石、有油污的地面能直接做吗？', en: 'Can you coat old concrete, terrazzo, old paint or oily floors?' },
        a: {
          zh: ['可以做，但基面处理和底漆不一样：'],
          en: ['Yes, but each one needs different preparation and a different primer:'],
        },
        steps: {
          zh: [
            '旧混凝土：强度 C20 以上，2 米内高低差小于 5 毫米。打磨清除浮浆、坑洼里的杂物和松动的混凝土。底漆可用 1001、1002 或 1004。',
            '水磨石：必须全面充分打磨，光滑处磨出细小毛孔，松动的水磨石层用电镐清除。底漆用 1002 或 1004。',
            '旧涂料：先分清是哪种涂料。附着力好的旧环氧地坪可以在上面做；附着力差的旧环氧、调和漆等必须全部清除，露出原来的水泥面。底漆用 1002 或 1004。',
            '油污地面：油污严重的地方反复打磨到表面发灰白，也可以用稀释剂反复清洗或用粉料吸油，必要时铺贴玻璃纤维布。底漆用 1003 防油底漆或 1004。',
          ],
          en: [
            'Old concrete: at least C20, flat to within 5 mm over 2 m. Grind off laitance, debris in pits and loose concrete. Primer: 1001, 1002 or 1004.',
            'Terrazzo: grind thoroughly until smooth areas show fine pores, and break out any loose terrazzo. Primer: 1002 or 1004.',
            'Old coatings: identify the coating first. Well-bonded old epoxy can be overcoated; poorly bonded epoxy and enamel paints must be removed down to bare concrete. Primer: 1002 or 1004.',
            'Oily floors: grind heavily contaminated areas repeatedly until the surface turns pale grey, or wash with thinner or use absorbent powder; glass-fibre mat can be laid where needed. Primer: 1003 oil-tolerant primer or 1004.',
          ],
        },
        products: ['batov-1001', 'batov-1002', 'batov-1003', 'batov-1004'],
        source: '素地基面类型及适用底涂材料',
      },
      {
        id: 'weak-concrete',
        q: { zh: '地面强度不够、容易起砂怎么办？', en: 'What if the concrete is weak or dusting?' },
        a: {
          zh: [
            '环氧地坪要求新地面强度 C25 以上、旧地面 C20 以上。强度低于 C20 的地面，先用混凝土密封固化剂渗透加固，再做后面的涂层。',
            '起砂、空鼓、裂缝的地方要先修补好，否则后面的涂层再好也会跟着起皮。',
          ],
          en: [
            'Epoxy systems need at least C25 for new slabs and C20 for old ones. Below C20, first consolidate the surface with a penetrating concrete densifier, then apply the coating system.',
            'Repair dusting, hollow and cracked areas first. Otherwise even a good coating will fail with the substrate.',
          ],
        },
        products: ['batov-1010'],
        source: '素地基面类型及适用底涂材料；聚氨酯薄涂施工方案',
      },
      {
        id: 'weather',
        q: { zh: '施工对温度和湿度有什么要求？', en: 'What temperature and humidity are needed during application?' },
        a: {
          zh: [
            '环氧底漆：环境温度 3–35℃，空气湿度不超过 80%，现场明亮通风，不要和其他工种交叉施工。',
            '水性环氧：15℃ 以下不能施工；相对湿度超过 85% 时不能做面漆和罩光清漆，下雨和返潮天气不施工。',
            '每个产品的具体要求写在产品页的技术参数里，以说明书为准。',
          ],
          en: [
            'Epoxy primers: 3–35 °C ambient, relative humidity no more than 80 %, good light and ventilation, and no other trades working on the floor.',
            'Waterborne epoxy: do not apply below 15 °C; do not apply topcoat or clear coat above 85 % relative humidity, or in rain or damp weather.',
            'Each product page lists its own limits from the data sheet.',
          ],
        },
        products: ['batov-1002', 'batov-7001'],
        source: '素地基面类型及适用底涂材料；水性环氧地坪施工指导',
      },
    ],
  },
  {
    id: 'application',
    title: { zh: '施工和养护', en: 'Application and curing' },
    items: [
      {
        id: 'mixing',
        q: { zh: '双组分环氧怎么配比、怎么搅拌？', en: 'How should two-component epoxy be mixed?' },
        a: {
          zh: [
            '严格按说明书上基料和固化剂的重量比配料。先把基料充分搅开，让沉淀分散均匀，再把全部固化剂倒进去，用低速重型搅拌器搅拌 3–5 分钟。',
            '混合好后要马上施工，并在说明书写的可使用时间内用完。',
          ],
          en: [
            'Weigh base and hardener exactly to the ratio on the data sheet. Stir the base first to disperse any settlement, add all of the hardener, then mix for 3–5 minutes with a heavy-duty low-speed mixer.',
            'Apply immediately after mixing and use it up within the pot life on the data sheet.',
          ],
        },
        source: '素地基面类型及适用底涂材料',
      },
      {
        id: 'waterborne-steps',
        q: { zh: '水性环氧地坪怎么施工？多久可以使用？', en: 'How is a waterborne epoxy floor applied, and when can it be used?' },
        a: {
          zh: [
            '一般做法如下（材料比例都是重量比）。兑水按 A 组分重量的 13–20% 加，低温时可以多一些，但最多不超过 23%。配好的漆在 25℃ 左右要 70 分钟内用完，变稠后不能再加水接着用。',
            '施工期间要一直通风，2 天后可以上人，至少养护 7 天再正式使用（按 25℃，温度低要延长）。',
          ],
          en: [
            'A typical build-up is below (all ratios by weight). Add water at 13–20 % of the weight of component A, up to 23 % in cool weather. At about 25 °C use mixed material within 70 minutes; once it thickens, do not add more water.',
            'Keep the area ventilated throughout. Foot traffic after 2 days; full service after at least 7 days at 25 °C, longer when colder.',
          ],
        },
        steps: {
          zh: [
            '底漆一遍：滚涂或刷涂，厚薄一致。',
            '砂浆层 1–3 毫米：底漆加级配石英砂刮涂，不再加水。',
            '腻子两遍：底漆加 100–200 目石英粉刮涂，封闭气孔。',
            '面漆两遍：滚涂，表面不平时不要来回多次回滚。',
            '需要更亮时再罩一遍清漆，清漆不能涂厚。罩光更耐磨，但透气性会变差。',
          ],
          en: [
            'Primer, one coat: roller or brush, even thickness.',
            'Mortar layer, 1–3 mm: primer with graded quartz sand, trowelled; no extra water.',
            'Putty, two coats: primer with 100–200 mesh quartz powder, trowelled to seal pores.',
            'Topcoat, two coats: roller; it levels slowly, so do not re-roll back and forth.',
            'Optional clear coat for more gloss, applied thin. It adds wear resistance but reduces breathability.',
          ],
        },
        products: ['batov-7001', 'batov-7002', 'batov-7003'],
        source: '水性环氧地坪施工指导',
      },
      {
        id: 'waterborne-ventilation',
        q: { zh: '水性地坪漆为什么一定要通风？', en: 'Why does a waterborne floor coating need ventilation?' },
        a: {
          zh: [
            '水性漆靠水分挥发才能固化。通风不好，涂层容易发白、附着力差、硬度低。密闭的地下室、仓库要用风机强制通风，这是施工成功的关键。',
            '每道都不要一次涂太厚，否则干得慢、光泽和强度都会下降。',
          ],
          en: [
            'Waterborne coatings cure as the water evaporates. Without airflow the film can turn white, lose adhesion and stay soft. In closed basements and warehouses use fans for forced ventilation.',
            'Do not apply any coat too thick, or it will dry slowly with lower gloss and strength.',
          ],
        },
        products: ['batov-7001', 'batov-7003'],
        source: '水性环氧地坪施工指导',
      },
      {
        id: 'densifier-steps',
        q: { zh: '混凝土密封固化剂怎么施工？', en: 'How is the concrete densifier applied?' },
        a: {
          zh: ['标准用量每平方米 0.1 公斤。新浇的整体粉光地面：'],
          en: ['Standard coverage is 0.1 kg/m². On newly poured, power-trowelled floors:'],
        },
        steps: {
          zh: [
            '养护至少 3 天，最好 7 天以上。',
            '低压喷涂，再用超细纤维拖把或软毛扫帚推匀，不要积料。',
            '让地面保持湿润 15–20 分钟，吸得快的地方追加喷涂。',
            '材料开始变硬后就不要再推了，干燥约 2–4 小时。',
            '研磨抛光地面：磨到 200 目后做第一道，再磨 400、800 目后做第二道，最后磨到 1500 和 3000 目。',
          ],
          en: [
            'Cure for at least 3 days, ideally 7 days or more.',
            'Spray at low pressure, then spread with a microfibre mop or soft broom without puddling.',
            'Keep the surface wet for 15–20 minutes and re-spray areas that soak it up.',
            'Stop spreading once the material starts to harden; it dries in about 2–4 hours.',
            'Polished floors: first coat after grinding to 200 grit, second coat after 400 and 800 grit, then polish to 1500 and 3000 grit.',
          ],
        },
        products: ['batov-1010'],
        source: '混凝土密封固化剂施工指导',
      },
      {
        id: 'pu-thin',
        q: { zh: '聚氨酯薄涂地坪多久可以走人、走车？', en: 'When can a thin-coat polyurethane floor take foot and vehicle traffic?' },
        a: {
          zh: [
            '按气温不同：10℃ 时软底鞋步行 48 小时后、1 吨以内拖车 7 天、完全固化 10 天；20℃ 时分别是 40 小时、5 天、7 天；30℃ 时是 30 小时、3 天、5 天。',
            '聚氨酯薄涂面漆每平方米用 0.1 公斤，不要超过 0.12 公斤。聚氨酯有弹性，做厚了强度反而下降，还容易起泡。',
          ],
          en: [
            'It depends on temperature. At 10 °C: soft-soled foot traffic after 48 hours, trolleys up to 1 t after 7 days, full cure after 10 days. At 20 °C: 40 hours, 5 days and 7 days. At 30 °C: 30 hours, 3 days and 5 days.',
            'Apply the thin-coat PU topcoat at 0.1 kg/m² and never above 0.12 kg/m². Polyurethane is elastic, so a thicker film loses strength and tends to blister.',
          ],
        },
        source: '聚氨酯薄涂施工方案',
      },
    ],
  },
  {
    id: 'systems',
    title: { zh: '选什么系统', en: 'Choosing a system' },
    items: [
      {
        id: 'chemical',
        q: { zh: '化工厂、电镀车间这类强腐蚀地面怎么做？', en: 'What system suits chemical plants and plating shops?' },
        a: {
          zh: [
            '用 3 毫米乙烯基重防腐自流平系统。地面强度要 C25 以上，含水率低于 6%，裂缝先用水泥砂浆补好。每层用量（每平方米）如下，面漆干燥 24 小时后可以上人。',
            '乙烯基材料是易燃品，施工现场禁止明火、电焊和吸烟，要通风并戴防毒面具。',
          ],
          en: [
            'Use the 3 mm vinyl ester self-leveling system. The slab must be at least C25 with moisture below 6 %, with cracks filled beforehand. Coverage per layer is listed below; foot traffic 24 hours after the topcoat.',
            'Vinyl ester materials are flammable: no open flames, welding or smoking on site, keep it ventilated and wear respirators.',
          ],
        },
        steps: {
          zh: [
            '打磨清洁地面 1–2 遍。',
            '乙烯基底漆 1 遍，0.15–0.25 公斤。',
            '底漆粘贴耐腐蚀玻纤布 2 遍，0.5–0.8 公斤，先沟道、孔洞、设备基础，后地面、墙裙、踢脚。',
            '底漆加中砂、细砂刮砂浆 1–2 遍，0.3–0.6 公斤。',
            '底漆加石英粉刮腻子 1–2 遍，0.15–0.3 公斤。',
            '乙烯基自流平面漆镘涂 1 遍，0.8–1.5 公斤。',
          ],
          en: [
            'Grind and clean the floor, 1–2 passes.',
            'Vinyl ester primer, 1 coat, 0.15–0.25 kg/m².',
            'Corrosion-resistant glass-fibre mat laid in primer, 2 coats, 0.5–0.8 kg/m²; trenches, openings and plinths first, then floor, wall skirting and coving.',
            'Primer with medium and fine sand, 1–2 mortar coats, 0.3–0.6 kg/m².',
            'Primer with quartz powder, 1–2 putty coats, 0.15–0.3 kg/m².',
            'Vinyl ester self-leveling topcoat, 1 trowelled coat, 0.8–1.5 kg/m².',
          ],
        },
        products: ['batov-9001', 'batov-9003'],
        source: '乙烯基重防腐地坪施工指导（指导里编号写 1111/1113，已列入待核对清单）',
      },
      {
        id: 'quantity',
        q: { zh: '我的场地要买多少材料？', en: 'How much material do I need for my floor?' },
        a: {
          zh: [
            '每层用量 = 说明书上的涂布率 × 面积。每个产品页都写了涂布率；用网站上的选型工具，选好场合、填上面积，就会按说明书算出每一层的大概用量。',
            '实际用量还和基面平整度、吸收情况、做多厚有关，最后由技术人员按现场确认。',
          ],
          en: [
            'Quantity per layer = data-sheet coverage × floor area. Every product page lists its coverage, and the system selector calculates each layer for your area.',
            'Actual usage also depends on flatness, absorbency and thickness, so our engineers confirm it for your site.',
          ],
        },
        link: { to: '/quote/', label: { zh: '打开选型工具', en: 'Open the system selector' } },
        source: '各产品说明书涂布率',
      },
      {
        id: 'safety',
        q: { zh: '地坪漆有毒吗？施工要注意什么？', en: 'Is the coating toxic? What safety precautions apply?' },
        a: {
          zh: [
            '按说明书，正常施工条件下干燥后的涂层无毒。施工时要避免接触眼睛和皮肤，穿防护服、戴手套、护目镜和呼吸防护。沾到皮肤用大量清水冲洗再用肥皂洗；溅进眼睛立即用清水冲洗并就医。',
            '溶剂型产品不能靠近火源。着火时用二氧化碳或泡沫灭火器，不能用水喷。详细内容见每个产品的安全数据表（MSDS）。',
          ],
          en: [
            'According to our data sheets, the cured coating is non-toxic under normal application conditions. During application avoid contact with eyes and skin and wear protective clothing, gloves, goggles and respiratory protection. Wash skin with plenty of water and soap; rinse eyes immediately with water and seek medical help.',
            'Keep solvent-based products away from ignition sources. Use CO₂ or foam extinguishers, never a water jet. See each product’s safety data sheet (SDS) for details.',
          ],
        },
        source: '素地基面类型及适用底涂材料；乙烯基重防腐地坪施工指导',
      },
    ],
  },
];

export const faqItems = faqGroups.flatMap((g) => g.items);
