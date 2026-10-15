# EDA EVE — fashion, print and visual experience

Independent Cloudflare Worker preview for EDA EVE's emerging fashion and design portfolio.

**Status: an unapproved creative concept.** The proposed wordmark, mirrored-E monogram, garment studies and copy are placeholders until the designer reviews them. No sample garment should be described as an existing EDA EVE product.

## Creative direction

Dark editorial, structured silhouette and graphic print. Satin-black and charcoal surfaces with restrained crimson detail, a hint of dusty pink and soft glow. Brand language stays open-ended, avoiding labels that narrow the designer's future work.

Homepage: hero, selected pieces, future checkout buttons, visual world, studio introduction, Instagram and Linktree.

## Preview and privacy

- Preview: https://edna-portfolio-preview.generalflynn17.workers.dev/
- Instagram: https://www.instagram.com/edaeeveportfolio/
- Linktree: https://linktr.ee/edaeeve

The preview URL is public to anyone with the link. Robots and noindex are **not access control**. Do not include private biographical details, confidential work, or customer information.

Garment visuals are original first-party SVG illustrations. Replace them with the designer's approved photographs and artwork when available, not third-party example products.

## Commerce

Three visible BUY / COMING SOON buttons are deliberately disabled. Their `data-stripe-placeholder` attributes reserve a future integration point. They **do not collect payments**, and there is no active Stripe account, cart, payment link, pricing, checkout, analytics or customer-data collection.

## Technical architecture

- Repo: `meeeeeooooowwwwwww/edna`, completely independent.
- Worker: `edna-portfolio-preview`, no custom domain or other website routes.
- Static HTML, CSS and original favicon/monogram SVG.
- No front-end JavaScript, databases, KV, fonts fetched from third parties, or framework.
- CSS breakpoints cover phones, tablets and desktops, with reduced-motion support.
- CI validates on commits without publishing; production preview deployment is manual-only.

## Local validation

```bash
npm run check
npm run dev
```

## Manual deployment

Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as secrets in this repository, then run **Deploy EDA EVE Preview** on `main` with confirmation `DEPLOY`. Use only this Worker's scoped token.

Note: a scoped token previously uploaded the Worker successfully but Wrangler reported an authorization failure when checking the account-level Workers subdomain after upload. Verify the preview before broadening permission. The workflow has no trigger in GRID EATER.
