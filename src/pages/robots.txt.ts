import type { APIRoute } from 'astro';
import { asset, noindex } from '../lib/paths';

// Search engines and AI assistants are welcome; preview builds block everyone.
const ai = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bytespider', 'Applebot-Extended', 'CCBot'];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(asset('/sitemap-index.xml'), site).href;
  const body = noindex
    ? 'User-agent: *\nDisallow: /\n'
    : ['User-agent: *', 'Allow: /', '', ...ai.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']), `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
