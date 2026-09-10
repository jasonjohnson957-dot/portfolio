'use strict';
const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value) { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch { return ''; } }
function renderCards(items, type) {
  return items.filter(item => item.status !== 'Draft').map((item, index) => {
    const url = safeURL(item.url);
    return `<article class="project-card"><div class="card-top"><span class="index">${String(index + 1).padStart(2, '0')}</span><span class="eyebrow">${escapeText(item.category)}</span></div><h3>${escapeText(item.title)}</h3><p>${escapeText(item.description)}</p><div class="card-bottom">${url ? `<a class="text-link" href="${escapeText(url)}">${type === 'projects' ? 'View on GitHub' : type === 'learning' ? 'Explore learning' : 'Open demo'} ↗</a>` : `<span class="status">${escapeText(item.status)}</span>`}</div></article>`;
  }).join('');
}
(async () => {
  try {
    const response = await fetch('/api/content', {cache:'no-store'});
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) return;
    const data = await response.json();
    document.querySelectorAll('[data-site]').forEach(el => { if (typeof data.site[el.dataset.site] === 'string') el.textContent = data.site[el.dataset.site]; });
    document.querySelectorAll('[data-github]').forEach(el => { if (safeURL(data.site.github)) el.href = data.site.github; });
    document.querySelectorAll('[data-collection]').forEach(el => {
      const key = el.dataset.collection;
      const items = key === 'featured' ? data.projects.filter(x=>x.status!=='Draft').slice(0,2) : data[key];
      const html = renderCards(items, key === 'featured' ? 'projects' : key);
      if (html) el.innerHTML = html;
      else if (key !== 'demos') el.innerHTML = '<p>New work will appear here as it is published.</p>';
    });
  } catch { /* Built-in content remains available if the content service is unreachable. */ }
})();
