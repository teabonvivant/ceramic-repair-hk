import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import test from 'node:test';
const root=new URL('../',import.meta.url);
const [bundle,blog,images]=await Promise.all(['legacy-content','blog','images'].map(n=>readFile(new URL(`data/${n}.json`,root),'utf8').then(JSON.parse)));
const pages=bundle.details;
test('preserves 88 knowledge routes and publishes 100 distinct articles in ten categories',()=>{
 assert.equal(pages.length,88);assert.equal(new Set(pages.map(p=>p.slug)).size,88);
 assert.equal(blog.length,100);assert.equal(new Set(blog.map(p=>p.slug)).size,100);
 assert.equal(new Set(blog.map(p=>p.title)).size,100);assert.equal(new Set(blog.map(p=>p.category)).size,10);
 const existing=new Set(pages.map(p=>p.slug)), paragraphs=[];
 for(const a of blog){assert.equal(a.sections.length,3);assert.equal(a.images.length,2);assert.notEqual(a.images[0].src,a.images[1].src);assert.ok(a.sources.length>0);assert.ok(a.description.length>40);assert.ok(a.sections.flatMap(s=>s.paragraphs).join('').length>300);for(const s of a.related)assert.ok(existing.has(s),`${a.slug}: broken related article ${s}`);paragraphs.push(...a.sections.flatMap(s=>s.paragraphs))}
 assert.equal(new Set(paragraphs).size,paragraphs.length,'No duplicated body paragraphs');
});
test('every article has substantive copy, primary references and no internal publishing notes',()=>{
 for(const p of [...pages,...blog]){
  const paragraphs=p.paragraphs??p.sections.flatMap(s=>s.paragraphs);
  assert.ok(paragraphs.join('').length>=300,`${p.slug}: incomplete body`);
  const text=[p.title,p.description,...paragraphs].join('\n');
  assert.doesNotMatch(text,/教學合成|合成案例|合成場景|本課|本頁不|尚待核實|研究候選|教授級|生成式教學|這裏不提供|(?:^|\n)練習：|圖中沒有|目前還欠/);
  assert.ok(p.sources.length>0,p.slug);for(const s of p.sources)assert.match(s.href,/^https:\/\//);
 }
});
test('ships 26 original illustrations with dimensions, captions and relevant glass images',async()=>{
 assert.equal(Object.keys(images).length,26);
 const used=[...pages,...blog].flatMap(p=>p.images);assert.ok(used.every(i=>i.src.startsWith('/media/editorial/')));
 for(const i of used){assert.ok(i.alt.length>10);assert.equal(i.width,1536);assert.equal(i.height,1024)}
 await Promise.all([...new Set(used.map(i=>i.src))].map(p=>access(new URL('public'+p,root))));
 assert.ok(blog.find(a=>a.slug==='transparent-glass-repair').images.every(i=>i.src.includes('glass')));
 assert.ok(pages.find(p=>p.slug==='method-05').images.some(i=>i.src.includes('yose-tsugi')));
});
test('catalogue links resolve to revised titles',()=>{
 const byHref=new Map(pages.map(p=>['/details/'+p.slug,p]));
 for(const [key,items] of Object.entries(bundle.payload.data)){if(key==='comparisons')continue;for(const item of items){assert.ok(byHref.has(item.href),`${key}: ${item.title}`);assert.equal(byHref.get(item.href).title,item.title)}}
});
