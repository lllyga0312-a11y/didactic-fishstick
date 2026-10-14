// All interactivity on the site: mobile menu, tabs, inquiry list (kept in the
// visitor's browser only), estimator and form submission. No dependencies.

import { recommend, type Scene } from '../data/recommend';

const KEY = 'batov-inquiry';

interface Item { slug: string; area?: string }

function load(): Item[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function save(items: Item[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked */ }
  render();
}

export function addItem(slug: string, area?: string) {
  const items = load().filter((i) => i.slug !== slug);
  items.push({ slug, area });
  save(items);
}

interface Catalog {
  products: Record<string, { name: string; code: string; coverage: string; href: string }>;
  buildups: Record<string, { layer: string; slug: string }[]>;
}

// Product names, links and typical build-ups in the page language, rendered by the layout.
let cached: Catalog | undefined;
function catalog(): Catalog {
  if (!cached) {
    const el = document.getElementById('catalog');
    cached = el ? JSON.parse(el.textContent || '{}') : { products: {}, buildups: {} };
  }
  return cached!;
}

function render() {
  const items = load();
  document.querySelectorAll<HTMLElement>('[data-inq-count]').forEach((b) => { b.textContent = String(items.length); });

  const list = document.querySelector<HTMLElement>('[data-inq-list]');
  if (!list) return;
  const cat = catalog().products;
  const empty = document.querySelector<HTMLElement>('[data-inq-empty]');
  const field = document.querySelector<HTMLInputElement>('[data-inq-field]');
  list.replaceChildren(...items.map((i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = cat[i.slug]?.href || '#';
    a.textContent = (cat[i.slug]?.name || i.slug) + (i.area ? ` · ${i.area} m²` : '');
    const rm = document.createElement('button');
    rm.type = 'button';
    rm.textContent = '×';
    rm.setAttribute('aria-label', list.dataset.removeLabel || 'Remove');
    rm.addEventListener('click', () => save(load().filter((x) => x.slug !== i.slug)));
    li.append(a, rm);
    return li;
  }));
  if (empty) empty.hidden = items.length > 0;
  if (field) field.value = items.map((i) => (cat[i.slug]?.name || i.slug) + (i.area ? ` (${i.area} m²)` : '')).join('; ');
}

// Mobile menu
document.querySelector<HTMLButtonElement>('[data-menu]')?.addEventListener('click', (e) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const open = document.getElementById('nav')!.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});

// Tabs: <div data-tabs> with .tab buttons (aria-controls) and .tab-panel
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('.tab')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !on;
    });
  }));
});

// "Add to inquiry list" buttons
document.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    addItem(btn.dataset.add!);
    btn.textContent = btn.dataset.added || '✓';
  });
});

// Estimator: shows a typical build-up and material quantities from the data
// sheets' coverage. No prices: an engineer quotes.
const est = document.querySelector<HTMLFormElement>('[data-estimator]');
if (est) {
  const out = document.querySelector<HTMLElement>('[data-est-result]')!;
  const list = out.querySelector<HTMLElement>('[data-est-layers]')!;
  let current: { layer: string; slug: string }[] = [];
  let area = '';
  const qty = (coverage: string, m2: number) => {
    const [lo, hi] = coverage.replace(/[≈~]/g, '').split(/[–-]/).map(Number);
    if (!m2 || Number.isNaN(lo)) return '';
    const r = (n: number) => Math.round(n * m2).toLocaleString();
    return hi ? `${r(lo)}–${r(hi)} kg` : `≈${r(lo)} kg`;
  };
  est.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(est);
    const scene = f.get('scene') as Scene | null;
    if (!scene) return;
    const { products, buildups } = catalog();
    current = buildups[recommend(scene, { heavy: f.has('heavy'), esd: f.has('esd'), chem: f.has('chem') })] || [];
    area = String(f.get('area') || '').trim();
    const m2 = Number(area);
    list.replaceChildren(...current.map((l) => {
      const p = products[l.slug];
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = l.layer;
      const a = document.createElement('a');
      a.href = p.href;
      a.textContent = (p.code ? p.code + ' ' : '') + p.name;
      const q = document.createElement('b');
      q.textContent = p.coverage
        ? `${p.coverage} kg/m²` + (qty(p.coverage, m2) ? ` → ${qty(p.coverage, m2)}` : '')
        : (list.dataset.noCoverage || '');
      li.append(label, a, q);
      return li;
    }));
    out.hidden = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  out.querySelector<HTMLButtonElement>('[data-est-add]')?.addEventListener('click', () => {
    current.forEach((l) => addItem(l.slug, area || undefined));
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Forms post to the endpoint in data-endpoint. Empty endpoint = not connected yet.
// Hidden "t" records when the page loaded so the receiver can drop instant bot posts.
document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const started = form.querySelector<HTMLInputElement>('[data-form-start]');
  const stamp = () => { if (started) started.value = String(Date.now()); };
  stamp();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      status.textContent = form.dataset.msgOff || '';
      return;
    }
    status.textContent = form.dataset.msgSending || '…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      stamp();
      if (form.hasAttribute('data-clears-inquiry')) save([]);
      status.textContent = form.dataset.msgOk || 'OK';
    } catch {
      status.textContent = form.dataset.msgFail || 'Error';
    }
  });
});

render();
