import type { APIRoute } from 'astro';
import { company } from '../data/site';
import { systems } from '../data/systems';
import { href } from '../lib/paths';

// Plain-text summary for AI assistants (llmstxt.org format).
export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const lines = [
    `# ${company.brand} (${company.brandZh}) · ${company.nameZh}`,
    '',
    `> Manufacturer of epoxy, polyurethane and chemical-resistant floor coatings in Wuxi, Jiangsu, China. Sells complete floor systems (primer to topcoat) to contractors, distributors and facility owners. Quotes are made per project; no prices are listed online.`,
    '',
    `Contact: ${company.email} · +86 ${company.phoneLocal.replace(/^0/, '')} · ${company.addressEn}`,
    '',
    '## Floor systems (English)',
    ...systems.map((s) => `- [${s.name.en}](${u(href('en', `/systems/${s.slug}/`))}): ${s.summary.en}`),
    '',
    '## 地坪系统（中文）',
    ...systems.map((s) => `- [${s.name.zh}](${u(href('zh', `/systems/${s.slug}/`))}): ${s.summary.zh}`),
    '',
    '## Pages',
    `- [Home (English)](${u(href('en', '/'))})`,
    `- [首页（中文）](${u(href('zh', '/'))})`,
    `- [System selector & quote](${u(href('en', '/quote/'))})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
