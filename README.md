# Pawar Rental Machineries – rental.pawarhardware.com

Static site (HTML, CSS, JS). No build step, no server code, no secrets.

## Deploy on GitHub Pages
1. Create a repo, upload everything in this folder to the repo root (keep `CNAME` and `.nojekyll`).
2. Repo Settings > Pages > Deploy from branch `main` / root.
3. DNS for pawarhardware.com: add a `CNAME` record, host `rental`, value `<your-github-username>.github.io`.
4. Back in Pages settings, wait for the domain check, then tick **Enforce HTTPS**. This is what forces HTTPS (the script also redirects http to https as a backup).
5. Search Console: add the domain and submit `https://rental.pawarhardware.com/sitemap.xml`.

## Before launch: fill two public settings in `config.js`
- `gaId`: Google Analytics 4 Measurement ID (G-XXXXXXXXXX). Loads only after a visitor accepts cookies.
- `formEndpoint`: your Formspree or Web3Forms URL so quote requests arrive in your email. Left empty, the form opens WhatsApp with the request filled in.
Both values are public by design. Never put passwords or secret API keys in any file here.

## Confirm these (I wrote sensible defaults)
- `privacy.html` and `terms.html`: retention (12 months), deposit, ID proof, late fees, jurisdiction (Pune). Edit to match how you really work and have a lawyer review.
- Home page claims: "Pune site delivery", "11 machines", "Same day replies on WhatsApp".

## Limits of GitHub Pages
It cannot send HTTP headers (HSTS, real CSP, X-Frame-Options). A CSP is set through a meta tag instead. For full headers and stronger bot protection, put Cloudflare (free) in front of the domain.
