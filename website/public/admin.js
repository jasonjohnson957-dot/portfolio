'use strict';
const editor = document.getElementById('editor');
const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let content, etag, dirty = false;
const siteFields = {headline:'Homepage heading',intro:'Homepage introduction',aboutTitle:'About Us heading',aboutBody:'About Us introduction',founderTitle:'Practitioner heading',founderBody:'Practitioner biography',github:'GitHub URL'};
const collectionNames = {projects:'Portfolio projects',demos:'Live demos',learning:'Learning apps'};
const field = (label, value, key, wide = false) => `<label class="field ${wide ? 'wide' : ''}">${e(label)}${wide ? `<textarea data-field="${key}" maxlength="3000" required>${e(value)}</textarea>` : `<input data-field="${key}" value="${e(value)}" ${key==='url'?'type="url" placeholder="https://…"':'required'} maxlength="${key==='url'?'2000':'200'}">`}</label>`;
function itemForm(item,index,type) {
  return `<article class="edit-card" data-type="${type}" data-index="${index}"><h3>${e(item.title || 'New item')}</h3><div class="fields">${field('Title',item.title,'title')}${field('Category',item.category,'category')}${field('Description',item.description,'description',true)}${field(type==='projects'?'GitHub link':'App link (leave blank while in development)',item.url,'url')}<label class="field">Publication status<select data-field="status">${['Published','In development','Draft'].map(s=>`<option ${s===item.status?'selected':''}>${s}</option>`).join('')}</select></label></div><button type="button" class="remove" data-remove="${index}" data-type="${type}">Remove item</button></article>`;
}
function collect() {
  document.querySelectorAll('[data-site-field]').forEach(el=>content.site[el.dataset.siteField]=el.value.trim());
  document.querySelectorAll('.edit-card').forEach(card=>card.querySelectorAll('[data-field]').forEach(el=>content[card.dataset.type][Number(card.dataset.index)][el.dataset.field]=el.value.trim()));
}
function render() {
  editor.innerHTML = `<form id="content-form"><div class="editor-toolbar"><button class="button navy" id="publish" type="submit">Publish changes</button><p id="save-status" role="status" aria-live="polite">${dirty?'Unpublished changes':'Content loaded'}</p><a href="/" target="_blank" rel="noopener" class="text-link">View website ↗</a><a href="/.auth/logout?post_logout_redirect_uri=/" class="text-link">Sign out</a></div><p class="editor-help">Publishing updates the public site. Draft items stay private. Published items require an HTTPS link. Leave a learning app in development until its URL is ready.</p><details class="editor-section" open><summary>Page text</summary><div class="fields">${Object.entries(siteFields).map(([key,label])=>`<label class="field ${key==='github'?'':'wide'}">${label}${key==='github'?`<input type="url" required data-site-field="${key}" value="${e(content.site[key])}" maxlength="2000">`:`<textarea required maxlength="${key.toLowerCase().includes('body')||key==='intro'?3000:200}" data-site-field="${key}">${e(content.site[key])}</textarea>`}</label>`).join('')}</div></details>${Object.entries(collectionNames).map(([key,label])=>`<details class="editor-section" open><summary>${label}</summary><div>${content[key].map((item,i)=>itemForm(item,i,key)).join('')}</div><button type="button" class="button navy" data-add="${key}">Add ${key==='learning'?'learning app':key==='projects'?'project':'demo'}</button></details>`).join('')}</form><dialog id="confirm-remove"><h2>Remove this item?</h2><p>The item will be removed from the website when you publish your changes.</p><div class="dialog-actions"><button type="button" class="remove" id="remove-confirm">Remove item</button><button type="button" class="button navy" id="remove-cancel">Keep item</button></div></dialog>`;
  editor.querySelector('form').addEventListener('input',()=>{dirty=true;document.getElementById('save-status').textContent='Unpublished changes';});
  editor.querySelector('form').addEventListener('submit',save);
  editor.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{
    collect();const type=button.dataset.add;content[type].push({title:'',category:'',description:'',url:'',status:'Draft'});dirty=true;render();
    const cards=editor.querySelectorAll(`.edit-card[data-type="${type}"]`);cards[cards.length-1].querySelector('input').focus();
  }));
  editor.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{
    const dialog=document.getElementById('confirm-remove');dialog.showModal();
    document.getElementById('remove-cancel').onclick=()=>dialog.close();
    document.getElementById('remove-confirm').onclick=()=>{collect();content[button.dataset.type].splice(Number(button.dataset.remove),1);dirty=true;dialog.close();render();};
  }));
}
async function save(event) {
  event.preventDefault();collect();const status=document.getElementById('save-status');const button=document.getElementById('publish');
  button.disabled=true;status.textContent='Publishing…';status.classList.remove('error');
  try {
    const response=await fetch('/api/admin/content',{method:'PUT',headers:{'Content-Type':'application/json','If-Match':etag},body:JSON.stringify(content)});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error || 'Unable to publish. Your changes are still in this form.');
    etag=response.headers.get('etag');dirty=false;status.textContent='Published successfully';
  }catch(error){status.textContent=error.message;status.classList.add('error');}
  finally{button.disabled=false;}
}
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
(async()=>{
  try{
    const auth=await fetch('/.auth/me',{cache:'no-store'});
    if(!auth.ok || !auth.headers.get('content-type')?.includes('application/json'))throw new Error('The editor becomes available after Azure authentication and content storage are configured.');
    const {clientPrincipal}=await auth.json();
    if(!clientPrincipal){editor.innerHTML='<div class="notice"><h2>Sign in to manage content.</h2><p>Use the GitHub account assigned the site administrator role.</p><a class="button navy" href="/.auth/login/github?post_login_redirect_uri=/admin/">Sign in with GitHub</a></div>';return;}
    if(!clientPrincipal.userRoles?.includes('administrator')){editor.innerHTML='<div class="notice"><h2>Administrator access required.</h2><p>Your account is signed in but does not have permission to edit this site.</p><a class="text-link" href="/.auth/logout?post_logout_redirect_uri=/admin/">Sign out</a></div>';return;}
    const response=await fetch('/api/admin/content',{cache:'no-store'});
    if(!response.ok)throw new Error('The content service is unavailable. Check the Azure storage settings, then reload.');
    content=await response.json();etag=response.headers.get('etag');if(!etag)throw new Error('The content version is missing. Reload before editing.');render();
  }catch(error){editor.innerHTML=`<div class="notice"><h2>Editor unavailable</h2><p>${e(error.message)}</p><a href="/" class="text-link">Return to the website</a></div>`;}
})();
