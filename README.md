# Jellyfin Abyss theme picker

Static preview for **Abyss-style accent palettes** (home row, media bar, detail page mock). No server, no Jellyfin install — color theming only.

**Live site (after you publish):**  
`https://YOUR_GITHUB_USER.github.io/jellyfin-abyss-theme-picker/`  
Deep links: `#rose`, `#ocean`, `#midnight`, etc.

## Local

```bash
node build.mjs
# open index.html in a browser
```

Edit **`themes.json`**, run `node build.mjs` again, refresh.

## Publish to GitHub Pages (one-time)

1. Create a **new public** repo on GitHub named `jellyfin-abyss-theme-picker` (empty, no README).
2. From this folder:

```powershell
git init -b main
git add .
git commit -m "Initial theme picker for GitHub Pages"
git remote add origin https://github.com/YOUR_USER/jellyfin-abyss-theme-picker.git
git push -u origin main
```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. After the **Deploy GitHub Pages** workflow finishes, open the URL above.

## Using colors on Jellyfin

Requires [Abyss](https://github.com/AumGupta/abyss-jellyfin) on your server. Copy the **CSS variables** block from the sidebar into Dashboard → Branding (or `branding.xml` `<CustomCss>`), after the Abyss `@import` lines. This repo does not ship server scripts or homelab config.

## License

Theme mock UI: use/share freely. Abyss itself is MIT (AumGupta/abyss-jellyfin).
