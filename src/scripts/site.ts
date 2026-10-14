// All interactivity on the site: mobile menu, tabs, inquiry list (kept in the
// visitor's browser only), estimator and form submission. No dependencies.

import { recommend, type Scene } from '../data/systems';

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

// Names and links of every system in the current language, rendered by the page.
function catalog(): Record<string, { name: string; href: string }> {
  const el = document.getElementById('catalog');
  return el ? JSON.parse(el.textContent || '{}') : {};
}

function render() {
  const items = load();
  document.querySelectorAll<HTMLElement>('[data-inq-count]').forEach((b) => { b.textContent = String(items.length); });

  const list = document.querySelector<HTMLElement>('[data-inq-list]');
  if (!list) return;
  const cat = catalog();
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

// Estimator: recommends a system only. Prices come from an engineer.
const est = document.querySelector<HTMLFormElement>('[data-estimator]');
if (est) {
  const out = document.querySelector<HTMLElement>('[data-est-result]')!;
  let current = '';
  est.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(est);
    const scene = f.get('scene') as Scene | null;
    if (!scene) return;
    current = recommend(scene, { heavy: f.has('heavy'), esd: f.has('esd'), chem: f.has('chem') });
    const area = String(f.get('area') || '').trim();
    const cat = catalog();
    out.querySelector<HTMLAnchorElement>('[data-est-name]')!.textContent = cat[current]?.name || current;
    out.querySelector<HTMLAnchorElement>('[data-est-name]')!.href = cat[current]?.href || '#';
    out.querySelector<HTMLElement>('[data-est-area]')!.textContent = area || '—';
    out.dataset.area = area;
    out.hidden = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  out.querySelector<HTMLButtonElement>('[data-est-add]')?.addEventListener('click', () => {
    if (current) addItem(current, out.dataset.area || undefined);
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Forms post to the endpoint in data-endpoint. Empty endpoint = not connected yet.
document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status')!;
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
      if (form.hasAttribute('data-clears-inquiry')) save([]);
      status.textContent = form.dataset.msgOk || 'OK';
    } catch {
      status.textContent = form.dataset.msgFail || 'Error';
    }
  });
});

render();
