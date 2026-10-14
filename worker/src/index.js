// Receives website form posts, filters spam, and forwards each inquiry
// to a WeCom (企业微信) group robot and by email. Nothing is stored here.
//
// Settings (wrangler.toml [vars] and secrets):
//   ALLOWED_ORIGINS  comma-separated site origins allowed to post
//   WECOM_WEBHOOK    secret: the group robot's webhook URL
//   MAIL_FROM        sender on a domain with Cloudflare Email Routing, e.g. website@batov.cn
//   MAIL_TO          comma-separated recipients (each verified in Email Routing)
//   MAILER           send_email binding; email is skipped until it exists

const FIELDS = [
  ['form', '表单'],
  ['lang', ''],
  ['name', '称呼'],
  ['phone', '电话'],
  ['email', '邮箱'],
  ['company', '公司'],
  ['country', '国家'],
  ['city', '项目地点'],
  ['type', '类型'],
  ['inquiry_items', '询价单'],
  ['message', '需求说明'],
];
const FORM_NAMES = { contact: '联系表单', 'inquiry-list': '询价单' };
const MIN_SECONDS = 3; // humans take longer than this to fill a form

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
      Vary: 'Origin',
    };
    const reply = (status, body) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { ok: false });
    if (allowed.length && !allowed.includes(origin)) return reply(403, { ok: false });

    let form;
    try {
      form = await request.formData();
    } catch {
      return reply(400, { ok: false });
    }
    const data = {};
    for (const [key] of FIELDS) data[key] = String(form.get(key) || '').trim().slice(0, 3000);

    // Spam checks answer "ok" so bots get no signal.
    if (isSpam(form, data)) return reply(200, { ok: true });
    if (!data.name || !(data.phone || data.email)) return reply(400, { ok: false });

    const results = await Promise.allSettled([sendWecom(env, data), sendEmail(env, data)]);
    const sent = results.filter((r) => r.status === 'fulfilled' && r.value).length;
    results.filter((r) => r.status === 'rejected').forEach((r) => console.error(r.reason));
    return sent > 0 ? reply(200, { ok: true }) : reply(502, { ok: false });
  },
};

export function isSpam(form, data) {
  if (String(form.get('website') || '')) return true; // honeypot, hidden from people
  const started = Number(form.get('t'));
  if (started && Date.now() - started < MIN_SECONDS * 1000) return true;
  const links = (data.message.match(/https?:\/\//gi) || []).length;
  return links > 2;
}

export function summary(data) {
  const lines = FIELDS.filter(([k]) => data[k] && k !== 'form' && k !== 'lang').map(([k, label]) => `${label}：${data[k]}`);
  const title = `网站新${FORM_NAMES[data.form] || '留言'}${data.lang === 'en' ? '（英文站）' : ''}`;
  return { title, lines };
}

async function sendWecom(env, data) {
  if (!env.WECOM_WEBHOOK) return false;
  const { title, lines } = summary(data);
  // WeCom markdown content is capped at 4096 bytes.
  let content = `**${title}**\n` + lines.map((l) => `> ${l.replace(/\n+/g, ' ')}`).join('\n');
  while (new TextEncoder().encode(content).length > 4000) content = content.slice(0, -100);
  const res = await fetch(env.WECOM_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msgtype: 'markdown', markdown: { content } }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.errcode !== 0) throw new Error(`WeCom: ${res.status} ${JSON.stringify(body)}`);
  return true;
}

async function sendEmail(env, data) {
  if (!env.MAILER || !env.MAIL_FROM || !env.MAIL_TO) return false;
  const { EmailMessage } = await import('cloudflare:email');
  const { title, lines } = summary(data);
  const replyTo = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) ? data.email : '';
  for (const to of env.MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean)) {
    const raw = mime({ from: env.MAIL_FROM, to, replyTo, subject: `${title}：${data.name}`, text: lines.join('\n') });
    await env.MAILER.send(new EmailMessage(env.MAIL_FROM, to, raw));
  }
  return true;
}

const b64 = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};

export function mime({ from, to, replyTo, subject, text }) {
  const headers = [
    `From: BATOV Website <${from}>`,
    `To: ${to}`,
    replyTo && `Reply-To: ${replyTo}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].filter(Boolean);
  return headers.join('\r\n') + '\r\n\r\n' + b64(text).replace(/.{76}/g, '$&\r\n');
}
