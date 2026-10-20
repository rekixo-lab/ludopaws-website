# LudoPaws Website

Static marketing website for https://ludopaws.rekixo.com/.

## Deployment
- Production branch: `main`
- Static site; no package manager or build step is required.
- Cloudflare Worker deployment command: `npx wrangler deploy` (configured in Cloudflare Builds).
- A commit pushed to `main` should trigger the connected Cloudflare build/deployment automatically.
- If using Cloudflare Pages instead, set framework preset to `None`, leave the build command empty, and use `.` as the output directory.

## Pages
- `/`
- `/guest-account-data/`
- `/legal/`
- `/privacy-policy/`
- `/terms-of-service/`

## Release checklist
- Verify the Google Play listing is live and replace the search URL in `index.html` with the exact listing URL when available.
- Verify privacy, retention, deletion, support, and governing-law details before treating legal pages as final.
- Test every route on desktop and mobile after deployment.
- Keep `api.ludopaws.rekixo.com` on its existing API Worker; do not attach the website hostname to that Worker.

## Family V2 alignment (20 October 2026)

Privacy, terms and pricing reflect the Family V2 Android/Worker release: generated public names, fixed quick-chat, no free-text or voice, child-directed ads, server-verified one-time products and refund reconciliation. The dedicated deletion route includes the actual Google/guest self-service flow. `assets/account-config.js` contains only public OAuth/origin/support values, never a private key. Google must allow the exact website origin.

The website remains on its own existing Cloudflare Worker, separate from the game API. Public copy must not restore the retired monthly product, obsolete 365-day receipt archive or incorrect SKU-based Gem quantities.
