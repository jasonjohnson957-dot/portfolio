'use strict';
const {validate,publicContent}=require('./validation.cjs');
function principal(request){try{return JSON.parse(Buffer.from(request.headers.get('x-ms-client-principal')||'','base64').toString());}catch{return null;}}
const reply=(status,jsonBody,extra={})=>({status,jsonBody,headers:{'Cache-Control':'no-store',...extra}});
function handlers(store,seed,allowedOrigins){
  return {
    async readPublic(){try{const {data}=await store.read();return reply(200,publicContent(data));}catch{return reply(200,publicContent(seed),{'X-Content-Source':'fallback'});}},
    async admin(request){
      const user=principal(request);
      if(!user?.userRoles?.includes('administrator'))return reply(403,{error:'Administrator access required.'});
      if(request.method==='GET'){
        try{const {data,etag}=await store.read();return reply(200,data,{ETag:etag});}catch(error){return reply(503,{error:'Content storage is unavailable. Check the server configuration.'});}
      }
      if(request.method!=='PUT')return reply(405,{error:'Method not allowed.'});
      if(!allowedOrigins.includes(request.headers.get('origin')))return reply(403,{error:'This publishing origin is not allowed.'});
      if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,{error:'JSON content is required.'});
      const etag=request.headers.get('if-match');
      if(!etag || etag==='*')return reply(428,{error:'Reload the editor to retrieve the current content version.'});
      let data;
      try{
        const text=await request.text();if(Buffer.byteLength(text)>512000)return reply(413,{error:'Content is too large.'});
        data=validate(JSON.parse(text));
      }catch(error){return reply(400,{error:error.message});}
      try {const next=await store.write(data,etag);return reply(200,{ok:true},{ETag:next});}
      catch(error){if(error.statusCode===412 || error.statusCode===409)return reply(409,{error:'Another edit was published. Copy your changes, reload, and try again.'});return reply(503,{error:'Publishing failed. Your changes are still in this form.'});}
    }
  };
}
module.exports={handlers};
