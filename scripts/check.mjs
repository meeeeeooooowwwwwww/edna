import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('public/index.html');
const css = read('public/styles.css');
const logo = read('public/eda-eve-mark.svg');
const robots = read('public/robots.txt');
const config = JSON.parse(read('wrangler.jsonc'));

for (const fragment of [
  'lang="en"', 'name="viewport"', 'id="main"', 'id="pieces"',
  'id="experience"', 'id="studio"', 'id="connect"',
  'https://linktr.ee/edaeeve', 'https://www.instagram.com/edaeeveportfolio/',
  'name="robots" content="noindex,nofollow,noarchive"',
  'CONCEPT PREVIEW', 'CONCEPT PREVIEW · SAMPLE VISUALS',
  '/eda-eve-mark.svg', 'fashion, print and <em>visual experience.</em>',
]) {
  assert.ok(html.includes(fragment), 'Missing expected feature: ' + fragment);
}
for (const selector of ['.hero', '.pieces-grid', '.texture-grid', '.connect-links', '.nav']) {
  assert.ok(css.includes(selector), 'Missing expected selector: ' + selector);
}
assert.ok(css.includes('@media (max-width:620px)'), 'Narrow-phone CSS missing');
assert.ok(css.includes('@media (max-width:360px)'), 'Small-phone CSS missing');
assert.ok(css.includes('prefers-reduced-motion'), 'Reduced-motion CSS missing');
assert.ok(css.includes('overflow-x:auto'), 'Mobile navigation scrolling missing');
assert.ok(css.includes('.buy-button:disabled'), 'Disabled checkout styling missing');

assert.equal((html.match(/data-stripe-placeholder="true"/g) || []).length, 3, 'Expected 3 future-payment placeholders');
assert.equal((html.match(/class="buy-button"[^>]*disabled/g) || []).length, 3, 'All future-payment controls must be disabled');
assert.ok(/Payments are not active/i.test(html), 'Preview must clearly signal no active payments');
assert.ok(!/<form\b|<script\b|https?:\/\/(?:checkout\.)?stripe\.com|data-stripe-publishable-key/i.test(html), 'No real payment integration or data collection');
assert.ok(!/gothic|rave/i.test(html), 'Brand copy should not be boxed into subcultures');
assert.ok(!/<a[^>]+target="_blank"(?![^>]+rel="noopener noreferrer")/i.test(html), 'External links require safe rel');
assert.ok(logo.includes('viewBox="0 0 120 120"') && logo.includes('<title>EDA EVE monogram</title>'), 'Original monogram missing');

assert.ok(robots.includes('Disallow: /'), 'Crawler opt-out missing');
assert.equal(config.name, 'edna-portfolio-preview');
assert.equal(config.assets.directory, './public');
assert.equal(config.workers_dev, true);
assert.equal(config.routes, undefined, 'Preview must not bind a production domain');
assert.equal(config.kv_namespaces, undefined, 'No database or KV needed');

console.log('EDA EVE — structure, branding, mobile, placeholder checkout and isolation checks passed.');
