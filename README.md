# EDA EVE — fashion, print and visual experience

**Independent concept preview** for a young fashion/design student. This is not an official brand launch or an approved product collection. The designer should review and approve the site, name, clothing, imagery and text before commercial use.

- Live preview: https://edna-portfolio-preview.generalflynn17.workers.dev/
- Repository: `meeeeeooooowwwwwww/edna`
- Worker: `edna-portfolio-preview` (its own scoped deployment credential; no links to GRID EATER deployment)
- Instagram: https://www.instagram.com/edaeeveportfolio/
- Linktree: https://linktr.ee/edaeeve

## Website

A black, photo-forward, responsive fashion website. Elegant serif headings, white typography, small crimson underline animations and the products doing the visual work. No expensive framework, external hotlinked imagery, customer database, analytics, email list or production checkout.

The landing page features editorial AI concept photography, four product studies and a lookbook/brand introduction. The concept product pages are:

- `/products/raven-layered-skirt.html`
- `/products/angelfall-black-tee.html`
- `/products/angelfall-white-tee.html`
- `/products/scarlet-corset-top.html`

The images in `public/media` are generated exploration/placeholder photographs, **not actual EDA EVE manufactured products or approved photographs of the designer**. Do not represent these as Eda's real work. Replace with her own approved artwork, models and garment photographs before publishing an official store.

## Payment policy

The product pages show disabled "STRIPE CHECKOUT · COMING SOON" controls. No Stripe account, card form, payment link, prices, stock count, size availability or delivery promises are active. There is no functioning basket or sales system. When ready, add actual products/stock, pricing in an explicitly chosen currency, policies, verified sizes and payment processing under the designer's authority.

## Preview access

The `workers.dev` URL is visible to anyone with its link. `noindex` and `robots.txt` discourage indexing but **do not password-protect it**. Do not post private details or her personal history on the website.

## Build and release

Run `npm run check` and the independent GitHub CI responsive browser checks.

The repository's own `.github/workflows/deploy-preview.yml` deploys **only** the `edna-portfolio-preview` Worker using its repo-specific `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Production releases verify the exact SHA using `/__eda_release.txt`. An older deployment returned Cloudflare error 10000 after successfully uploading; the current workflow allows that specific scoped-token subdomain-read error **only when the exact live source SHA is verified**.

Release dispatch is manual, with an approved one-off version-locked repository request as an optional alternative. No ordinary code push deploys the site automatically.

## HD image upgrade (in progress)

The current legacy 430×560 hero and 640×800 four-way contact sheet are being replaced. The `fix/hd-images-object-fit-20261016` branch expects these **five distinct high-quality 1122×1402 WebP files** in `public/media/`:

- `eda-hero-hd.webp`
- `raven-skirt-hd.webp`
- `angelfall-black-hd.webp`
- `angelfall-white-hd.webp`
- `scarlet-corset-hd.webp`

Each image is a generated fashion concept, **not** a photo of the real designer or a finished product. Images use intrinsic dimensions, lazy loading below the fold and `object-fit` rules that never stretch their original proportions. The CI check requires each asset before this branch is merged or deployed. Do not deploy an incomplete branch or insert base64 image strings directly into HTML.
