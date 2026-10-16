# LudoPaws Website

Static marketing website for https://ludopaws.rekixo.com/.

## Deployment
- Production branch: `main`
- Static site; no package manager or build step is required.
- If using Cloudflare Pages, set framework preset to `None`, leave the build command empty, and use `.` as the output directory.

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
