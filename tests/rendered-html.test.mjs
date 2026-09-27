import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import test from 'node:test';
import worker from '../dist/server/index.js';
const root=new URL('../',import.meta.url);
const [bundle,blog]=await Promise.all(['legacy-content','blog'].map(n=>readFile(new URL(`data/${n}.json`,root),'utf8').then(JSON.parse)));
const main=['/','/start','/care','/processes','/glossary','/about','/blog','/details','/methods','/materials','/tools','/ethics','/history','/masters','/world','/verification'];
const paths=[...main,...bundle.details.map(p=>'/details/'+p.slug),...blog.map(p=>'/blog/'+p.slug)];
const known=new Set(paths),htmlByPath=new Map();
async function render(path){return worker.fetch(new Request('https://ceramic-repair-hk.teabonvivant.chatgpt.site'+path,{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}})}
test('all 204 public pages render with one heading, social metadata and working internal destinations',{timeout:180000},async()=>{
 for(const path of paths){
  const res=await render(path);assert.equal(res.status,200,path);const html=await res.text();htmlByPath.set(path,html);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,path+' heading');assert.match(html,/property="og:image"/,path+' social metadata');
  assert.doesNotMatch(html,/教學合成|尚待核實|目前還欠甚麼|以下內容是教學情境|研究候選|生成式教學|頁面不會因資料薄弱|仍欠公開的/);
  for(const [,href] of html.matchAll(/href="(\/[^\"]*)"/g)){const url=new URL(href,'https://local.test');if(url.pathname.startsWith('/media/')||url.pathname.startsWith('/assets/')||url.pathname.startsWith('/fonts/')||url.pathname.startsWith('/_next/')||url.pathname==='/icon.svg')continue;assert.ok(known.has(url.pathname),`${path}: ${href}`)}
  assert.equal([...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^\"]+)"/g)].length,1,path+' canonical'); const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^\"]+)"/)?.[1]; assert.ok(canonical,path+' canonical href'); assert.equal(new URL(canonical).pathname,path,path+' canonical path'); const openGraphUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^\"]+)"/)?.[1]; assert.ok(openGraphUrl,path+' Open Graph URL'); assert.equal(new URL(openGraphUrl).pathname,path,path+' Open Graph URL path'); assert.match(html,/name="twitter:card"/,path+' Twitter card');
  if(path.startsWith('/blog/')){const article=blog.find(item=>item.slug===path.slice('/blog/'.length));assert.ok(article,path+' article data');const coverUrl=new URL(article.images[0].src,'https://ceramic-repair-hk.teabonvivant.chatgpt.site').href;const ogImage=html.match(/<meta[^>]+property="og:image"[^>]+content="([^\"]+)"/)?.[1];assert.equal(ogImage,coverUrl,path+' Open Graph cover');assert.equal(html.match(/<meta[^>]+property="og:image:alt"[^>]+content="([^\"]+)"/)?.[1],article.images[0].alt,path+' Open Graph cover alt');assert.equal(html.match(/<meta[^>]+property="og:image:width"[^>]+content="([^\"]+)"/)?.[1],String(article.images[0].width),path+' Open Graph cover width');assert.equal(html.match(/<meta[^>]+property="og:image:height"[^>]+content="([^\"]+)"/)?.[1],String(article.images[0].height),path+' Open Graph cover height');assert.equal(html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^\"]+)"/)?.[1],coverUrl,path+' Twitter cover');assert.equal([...html.matchAll(/<figure class="article-figure"/g)].length,2,path+' illustrations');assert.match(html,/BlogPosting/);assert.ok(html.includes('本篇內容'))}
 }
 assert.equal(htmlByPath.size,204);
});
test('navigation exposes all twenty people and both content collections',async()=>{
 const masters=htmlByPath.get('/masters')??await(await render('/masters')).text();for(let n=1;n<=20;n++)assert.match(masters,new RegExp('/details/master-'+String(n).padStart(2,'0')));assert.match(masters,/人物選讀/);assert.match(masters,/其他人物/);assert.match(masters,/19(?:<!--.*?-->)?\s*篇條目/);assert.equal([...masters.matchAll(/href="\/details\/master-01"/g)].length,1);
 const home=htmlByPath.get('/')??await(await render('/')).text();assert.match(home,/一件瓷器，值得細讀/);assert.match(home,/188/);assert.match(home,/reading-a-broken-bowl/);
 const index=htmlByPath.get('/blog')??await(await render('/blog')).text();assert.match(index,/100/);assert.match(index,/文章主題/);
});
test('sitemap covers every public page and missing pages return a genuine 404',async()=>{
 const res=await render('/sitemap.xml');assert.equal(res.status,200);const xml=await res.text();for(const path of paths)assert.ok(xml.includes('https://ceramic-repair-hk.teabonvivant.chatgpt.site'+path),path);
 for(const path of ['/blog/no-such-article','/details/no-such-record','/missing-page'])assert.equal((await render(path)).status,404,path); const missingHtml=await(await render('/missing-page')).text();assert.match(missingHtml,/全部內容索引/);assert.doesNotMatch(missingHtml,/88 個詳情條目/);
});
