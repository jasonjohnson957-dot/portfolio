'use strict';
function validURL(value) { try { const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password; }catch{return false;} }
function validate(data) {
  if(!data || typeof data!=='object' || Array.isArray(data))throw Error('Content must be an object.');
  const site={name:'Binary Rights'};
  for(const key of ['headline','intro','aboutTitle','aboutBody','founderTitle','founderBody','github']) {
    const max=['intro','aboutBody','founderBody'].includes(key)?3000:key==='github'?2000:200;
    if(typeof data.site?.[key]!=='string'||!data.site[key].trim()||data.site[key].length>max)throw Error(`Check the ${key} field (maximum ${max} characters).`);
    site[key]=data.site[key].trim();
  }
  if(!validURL(site.github))throw Error('GitHub URL must use HTTPS.');
  const clean={site};
  for(const group of ['projects','demos','learning']) {
    if(!Array.isArray(data[group])||data[group].length>100)throw Error(`${group} must contain at most 100 items.`);
    clean[group]=data[group].map((item,i)=>{
      const out={};
      for(const [key,max] of Object.entries({title:200,category:200,description:3000,url:2000,status:30})) {
        if(typeof item?.[key]!=='string'||item[key].length>max||key!=='url'&&!item[key].trim())throw Error(`Check ${group} item ${i+1}: ${key}.`);
        out[key]=item[key].trim();
      }
      if(!['Draft','Published','In development'].includes(out.status))throw Error('Select a valid publication status.');
      if(out.url&&!validURL(out.url))throw Error('Links must be complete HTTPS URLs.');
      if(out.status==='Published'&&!out.url)throw Error(`Add a link before publishing ${out.title}.`);
      if(group==='projects'&&out.url&&new URL(out.url).hostname!=='github.com')throw Error('Portfolio links must point to github.com.');
      return out;
    });
  }
  return clean;
}
function publicContent(data){return {...data,...Object.fromEntries(['projects','demos','learning'].map(k=>[k,data[k].filter(x=>x.status!=='Draft')]))};}
module.exports={validate,publicContent};
