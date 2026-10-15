import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const stat = (path) => statSync(new URL('../' + path, import.meta.url));
const html=read('public/index.html'),css=read('public/styles.css');
const slugs=['raven-layered-skirt','angelfall-black-tee','angelfall-white-tee','scarlet-corset-top'];
const pages=slugs.map(slug=>({slug,html:read('public/products/'+slug+'.html')}));
const config=JSON.parse(read('wrangler.jsonc'));

for(const path of ['public/media/hero.webp','public/media/editorial-contact.webp']){
 assert.ok(stat(path).size>2000,path+' missing or suspiciously small');
}
for(const part of ['fashion, print and visual experience.','id="featured"','id="printed-tees"','id="lookbook"','id="about"','https://linktr.ee/edaeeve','https://www.instagram.com/edaeeveportfolio/','DESIGN CONCEPT','/media/hero.webp']){
 assert.ok((html+css).includes(part),'Homepage must include: '+part);
}
assert.equal((html.match(/class="tile"/g)||[]).length,4,'Four featured products');
for (const {slug,html:page} of pages){
 assert.ok(page.includes('class="wrap product-layout"'),'Missing product layout: '+slug);
 assert.ok(page.includes('data-stripe-placeholder="true"'),'Missing Stripe placeholder: '+slug);
 assert.ok(/class="inactive-buy" disabled/.test(page),'Checkout not disabled: '+slug);
 assert.ok(/No payment, preorder or order can be placed/.test(page),'Unclear availability: '+slug);
 assert.ok(page.includes('id="product-title"'),'Missing accessible product heading: '+slug);
 assert.ok(html.includes('/products/'+slug+'.html'),'Home must link to '+slug);
 assert.ok(/<meta name="robots" content="noindex,nofollow,noarchive">/.test(page),'Preview indexing not disabled: '+slug);
 assert.ok(!/<form\b|<script\b|checkout\.stripe\.com|data-stripe-publishable-key/i.test(page),'Unexpected live checkout: '+slug);
}
for(const part of ['@media(max-width:950px)','@media(max-width:650px)','@media(max-width:350px)','prefers-reduced-motion','.nav a:after','.photo-skirt','.photo-whitetee','.product-layout','.inactive-buy']){
 assert.ok(css.includes(part),'Missing responsive/brand CSS: '+part);
}
assert.ok(!/gothic|rave/i.test(html+pages.map(x=>x.html).join('')),'Do not box the brand into a category');
assert.ok(!/<form\b|<script\b|stripe\.com|https?:\/\/images\.unsplash/i.test(html),'No live payment, trackers or external hotlink');
assert.ok(read('public/robots.txt').includes('Disallow: /'),'Preview crawler opt-out');
assert.equal(config.name,'edna-portfolio-preview');
assert.equal(config.assets.directory,'./public');
assert.equal(config.workers_dev,true);
assert.equal(config.routes,undefined);
assert.equal(config.kv_namespaces,undefined);
console.log('EDA EVE PASS: four product pages, real image assets, restricted commerce, mobile layouts and isolation.');
