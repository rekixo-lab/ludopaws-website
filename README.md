# LudoPaws Website

Static website for `ludopaws.rekixo.com`.

## Pages
- `/` — landing page
- `/guest-account-data/` — guest account and data guidance
- `/legal/` — legal policy directory
- `/privacy-policy/` — privacy policy draft
- `/terms-of-service/` — terms of service draft

## Cloudflare Pages settings
- Framework preset: None
- Build command: leave empty
- Build output directory: `/` (repository root)
- Root directory: `/`

This repository is static HTML/CSS. Do not deploy it with `npx wrangler deploy` as a Worker.

## Before publishing legal pages
The Privacy Policy, Terms of Service, and Guest Account & Data page contain owner-review notices because actual data collection, retention, guest-account recovery, support contacts, and governing-law details must be verified against the released app and backend before publication.
