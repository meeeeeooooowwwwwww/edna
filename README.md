# EDA EVE — fashion portfolio concept

A lightweight, independent Cloudflare Workers static-assets preview for the `@edaeeveportfolio` fashion/design portfolio.

## Status

**Unapproved concept only.** The EDA EVE name treatment, editorial direction, compositions and sample concepts are provisional. No third-party portfolio images or personal biography have been reproduced. Please ask the designer to approve the name, artwork and words before presenting it as her official website.

## Scope

- Responsive static portfolio; no store, checkout, email collection, analytics, trackers, database or paid services.
- Links to [portfolio Instagram](https://www.instagram.com/edaeeveportfolio/) and [Linktree](https://linktr.ee/edaeeve).
- Noindex preview. The `workers.dev` URL is **public to anyone with the link**, not access controlled.
- Cloudflare Worker name `edna-portfolio-preview`, separate from all other company websites.

## Local development

```bash
npm run check
npm run dev
```

## Deployment

Use this repository's own **Deploy EDA EVE Preview** GitHub Action once a `CLOUDFLARE_API_TOKEN` is configured as a secret **in this repository** (`CLOUDFLARE_ACCOUNT_ID` may also be set if your Cloudflare account cannot be determined automatically). This must be a dedicated token scoped to the preview Worker, not GRID EATER's global key. The workflow is manual-only and never deploys another repository.

No deployment has been carried out simply by adding these files.

The preview's robots opt-out is not password protection. Do not place private materials in this public repository or publish private details about the designer.

## Replace the example visuals

All art is original CSS/SVG design-direction studies, not claimed to be the designer's existing garments. Replace approved placeholders with the designer's own photographs and print assets when permission is received.
