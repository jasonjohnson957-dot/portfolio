const {test}=require('node:test');
const assert=require('node:assert/strict');
const {handlers}=require('../api/src/handlers.cjs');
const {validate,publicContent}=require('../api/src/validation.cjs');
const seed=require('../api/seed.json');
const clone=()=>structuredClone(seed);
const admin=Buffer.from(JSON.stringify({userId:'test',userRoles:['administrator']})).toString('base64');
function request(method='GET',headers={},body=seed){return {method,headers:new Headers(headers),text:async()=>JSON.stringify(body)};}
const writeHeaders={'x-ms-client-principal':admin,origin:'https://www.stopaibias.com','content-type':'application/json','if-match':'"one"'};
test('anonymous and ordinary authenticated users cannot read or publish editor content',async()=>{
  const api=handlers({read(){throw Error('must not read');},write(){throw Error('must not write');}},seed,[]);
  for(const roles of [[],['authenticated']])for(const method of ['GET','PUT']){
    const token=Buffer.from(JSON.stringify({userRoles:roles})).toString('base64');
    assert.equal((await api.admin(request(method,{'x-ms-client-principal':token}))).status,403);
  }
});
test('cross-origin publishing and missing version are rejected before storage writes',async()=>{
  const api=handlers({write(){throw Error('must not write');}},seed,['https://www.stopaibias.com']);
  assert.equal((await api.admin(request('PUT',{...writeHeaders,origin:'https://untrusted.example'}))).status,403);
  const h={...writeHeaders};delete h['if-match'];assert.equal((await api.admin(request('PUT',h))).status,428);
});
test('valid publication writes content and returns the new version',async()=>{
  let saved;const api=handlers({write:async(data,version)=>{saved=data;assert.equal(version,'"one"');return '"two"';}},seed,['https://www.stopaibias.com']);
  const result=await api.admin(request('PUT',writeHeaders));assert.equal(result.status,200);assert.equal(result.headers.ETag,'"two"');assert.deepEqual(saved,seed);
});
test('stale edits are surfaced without silently overwriting',async()=>{
  const api=handlers({write:async()=>{throw Object.assign(Error(),{statusCode:412});}},seed,['https://www.stopaibias.com']);
  assert.equal((await api.admin(request('PUT',writeHeaders))).status,409);
});
test('drafts are excluded from public API responses',async()=>{
  const data=clone();data.projects[0].status='Draft';
  const api=handlers({read:async()=>({data,etag:'"one"'})},seed,[]);
  assert.equal((await api.readPublic()).jsonBody.projects.length,seed.projects.length-1);
  assert.equal(publicContent(data).projects.some(x=>x.status==='Draft'),false);
});
test('invalid links and published items without URLs are rejected',()=>{
  for(const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com','']){
    const data=clone();data.projects[0].url=url;assert.throws(()=>validate(data));
  }
  const data=clone();data.learning[0].status='Published';assert.throws(()=>validate(data));
});
test('storage failures leave public fallback available but editor writes report failure',async()=>{
  const api=handlers({read:async()=>{throw Error();},write:async()=>{throw Error();}},seed,['https://www.stopaibias.com']);
  assert.equal((await api.readPublic()).status,200);
  assert.equal((await api.admin(request('GET',{'x-ms-client-principal':admin}))).status,503);
  assert.equal((await api.admin(request('PUT',writeHeaders))).status,503);
});
test('server removes unrecognized fields and validates size and shape',()=>{
  const data=clone();data.adminSecret='do not persist';assert.equal(validate(data).adminSecret,undefined);
  data.projects[0].description='a'.repeat(3001);assert.throws(()=>validate(data));
});
