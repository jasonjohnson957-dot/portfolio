'use strict';
const {app}=require('@azure/functions');
const {BlobServiceClient}=require('@azure/storage-blob');
const seed=require('../seed.json');
const {handlers}=require('./handlers.cjs');
function blob(){
  if(!process.env.CONTENT_STORAGE_CONNECTION_STRING)throw Error('Storage is not configured.');
  return BlobServiceClient.fromConnectionString(process.env.CONTENT_STORAGE_CONNECTION_STRING)
    .getContainerClient(process.env.CONTENT_CONTAINER||'binary-rights').getBlockBlobClient('content.json');
}
const store={
  async read(){
    const b=blob();
    try{const response=await b.download();const chunks=[];for await(const chunk of response.readableStreamBody)chunks.push(chunk);return {data:JSON.parse(Buffer.concat(chunks).toString()),etag:response.etag};}
    catch(error){if(error.statusCode===404)return {data:seed,etag:'"initial"'};throw error;}
  },
  async write(data,etag){
    const b=blob();const body=JSON.stringify(data);
    const result=await b.upload(body,Buffer.byteLength(body),{conditions:etag==='"initial"'?{ifNoneMatch:'*'}:{ifMatch:etag},blobHTTPHeaders:{blobContentType:'application/json'}});
    return result.etag;
  }
};
const service=handlers(store,seed,(process.env.ALLOWED_ORIGINS||'https://www.stopaibias.com,https://stopaibias.com').split(',').map(s=>s.trim()).filter(Boolean));
app.http('publicContent',{route:'content',methods:['GET'],authLevel:'anonymous',handler:()=>service.readPublic()});
app.http('adminContent',{route:'admin/content',methods:['GET','PUT'],authLevel:'anonymous',handler:request=>service.admin(request)});
