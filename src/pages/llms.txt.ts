import type { APIRoute } from 'astro';
import { company } from '../data/site';
import { series } from '../data/catalog';
import { href } from '../lib/paths';

// Plain-text summary for AI assistants (llmstxt.org format).
export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const lines = [
    `# ${company.brand} (${company.brandZh}) · ${company.nameZh}`,
    '',
    `> Manufacturer of epoxy, polyurethane and chemical-resistant floor coatings in Wuxi, Jiangsu, China. Sells complete floor coating systems (primer, body coat, topcoat) with published technical data to contractors, distributors and facility owners. Quotes are made per project; no prices are listed online.`,
    '',
    `Contact: ${company.email} · +86 ${company.phoneLocal.replace(/^0/, '')} · ${company.addressEn}`,
    '',
    '## Products (English)',
    ...series.flatMap((s) => [
      `### [${s.name.en}](${u(href('en', `/systems/${s.id}/`))})`,
      ...s.products.map((p) => `- [${p.code ? p.code + ' ' : ''}${p.name.en}](${u(href('en', `/products/${p.slug}/`))})${p.coverage ? ` · coverage ${p.coverage} kg/m²` : ''}`),
    ]),
    '',
    '## 产品（中文）',
    ...series.flatMap((s) => [
      `### [${s.name.zh}](${u(href('zh', `/systems/${s.id}/`))})`,
      ...s.products.map((p) => `- [${p.code ? p.code + ' ' : ''}${p.name.zh}](${u(href('zh', `/products/${p.slug}/`))})`),
    ]),
    '',
    '## Pages',
    `- [Home (English)](${u(href('en', '/'))})`,
    `- [首页（中文）](${u(href('zh', '/'))})`,
    `- [System selector & quote](${u(href('en', '/quote/'))})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
