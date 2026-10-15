import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const stat = (path) => statSync(new URL('../' + path, import.meta.url));
const html=read('public/index.html'),css=read('public/styles.css');
const slugs=['raven-layered-skirt','angelfall-black-tee','angelfall-white-tee','scarlet-corset-top'];
const pages=slugs.map(slug=>({slug,html:read('public/products/'+slug+'.html')}));
const config=JSON.parse(read('wrangler.jsonc'));

const requiredImages=[
 'eda-hero-hd.webp','raven-skirt-hd.webp','angelfall-black-hd.webp',
 'angelfall-white-hd.webp','scarlet-corset-hd.webp'
];
for(const file of requiredImages){
 const path='public/media/'+file;
 const image=readFileSync(new URL('../'+path,import.meta.url));
 assert.ok(image.byteLength>50000,path+' is missing, low-resolution or excessively compressed');
 assert.equal(image.toString('ascii',0,4),'RIFF',path+' has invalid WebP header');
 assert.equal(image.toString('ascii',8,12),'WEBP',path+' is not WebP');
 assert.ok((html+pages.map(x=>x.html).join('')).includes('/media/'+file),'Image not referenced: '+file);
}
for(const part of ['fashion, print and visual experience.','id="featured"','id="printed-tees"','id="lookbook"','id="about"','https://linktr.ee/edaeeve','https://www.instagram.com/edaeeveportfolio/','DESIGN CONCEPT','/media/eda-hero-hd.webp']){
 assert.ok((html+css).includes(part),'Homepage must include: '+part);
}
assert.equal((html.match(/class="tile"/g)||[]).length,4,'Four featured products');
assert.equal((html.match(/class="collection-product"/g)||[]).length,4,'Four repeat product links in lower shelves');
for(const slug of slugs){
 assert.ok(html.includes('/products/'+slug+'.html'),'Existing product link missing: '+slug);
}
assert.ok(css.includes('.collection-shot img')&&css.includes('object-fit:cover'),'Repeated HD product images must crop without stretching');
assert.ok(!html.includes('class="split-banners"'),'Empty promotional panels must be replaced');
assert.ok(html.includes('href="https://americafirst.nz/" target="_blank" rel="noopener noreferrer"'),'Footer partner link missing');

assert.equal((html.match(/<img class="product-image/g)||[]).length,4,'Four separate HD homepage product photographs');
assert.ok(html.includes('class="hero-photo"><img'),'Hero must use an actual image element');
assert.ok(html.includes('class="look-image"><img'),'Lookbook must use a real image element');
for (const {slug,html:page} of pages){
 assert.ok(page.includes('href="https://americafirst.nz/" target="_blank" rel="noopener noreferrer"'),'Footer partner link missing on '+slug);
 assert.ok(page.includes('class="wrap product-layout"'),'Missing product layout: '+slug);
 assert.ok(page.includes('data-stripe-placeholder="true"'),'Missing Stripe placeholder: '+slug);
 assert.ok(/class="inactive-buy" disabled/.test(page),'Checkout not disabled: '+slug);
 assert.ok(/No payment, preorder or order can be placed/.test(page),'Unclear availability: '+slug);
 assert.ok(page.includes('id="product-title"'),'Missing accessible product heading: '+slug);
 assert.equal((page.match(/class="detail-image /g)||[]).length,3,'Expected three correctly sized gallery frames: '+slug);
 assert.ok(page.includes('class="photo-frame main-photo"'),'Missing non-stretched main product image: '+slug);
 assert.ok(html.includes('/products/'+slug+'.html'),'Home must link to '+slug);
 assert.ok(/<meta name="robots" content="noindex,nofollow,noarchive">/.test(page),'Preview indexing not disabled: '+slug);
 assert.ok(!/<form\b|<script\b|checkout\.stripe\.com|data-stripe-publishable-key/i.test(page),'Unexpected live checkout: '+slug);
}
for(const part of ['@media(max-width:950px)','@media(max-width:650px)','@media(max-width:350px)','prefers-reduced-motion','.nav a:after','.product-image-skirt','.product-image-whitetee','.product-layout','.inactive-buy']){
 assert.ok(css.includes(part),'Missing responsive/brand CSS: '+part);
}
assert.ok(!css.includes('editorial-contact.webp'),'Retired low-resolution sprite still present');
assert.ok(!css.includes('background-size:200% 200%'),'Old contact-sheet sprite stretching remains');
assert.ok(css.includes('object-fit:contain')&&css.includes('object-fit:cover'),'Image fit handling missing');
assert.ok(!/\b(?:gothic|rave)\b/i.test(html+pages.map(x=>x.html).join('')),'Do not box the brand into a category');
assert.ok(!/<form\b|<script\b|stripe\.com|https?:\/\/images\.unsplash/i.test(html),'No live payment, trackers or external hotlink');
assert.ok(read('public/robots.txt').includes('Disallow: /'),'Preview crawler opt-out');
assert.equal(config.name,'edna-portfolio-preview');
assert.equal(config.assets.directory,'./public');
assert.equal(config.workers_dev,true);
assert.equal(config.routes,undefined);
assert.equal(config.kv_namespaces,undefined);
console.log('EDA EVE PASS: four product pages, real image assets, restricted commerce, mobile layouts and isolation.');
