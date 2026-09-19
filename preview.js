(function () {
  const catalog = window.ABYSS_THEME_CATALOG;
  if (!catalog || !catalog.themes) {
    document.body.innerHTML =
      "<p style='padding:2rem'>Missing themes-data.js — run <code>node build.mjs</code></p>";
    return;
  }

  const listEl = document.getElementById("theme-list");
  const swatchGrid = document.getElementById("swatch-grid");
  const cssSnippet = document.getElementById("css-snippet");

  function rgb(arr) {
    return "rgb(" + arr.join(", ") + ")";
  }

  function cssBlock(theme) {
    const a = theme.accent.join(", ");
    const ch = theme.accent.join(" ");
    const g = theme.glassTint.join(", ");
    const s = theme.secondary.join(", ");
    const sch = theme.secondary.join(" ");
    const label = theme.label;
    const id = theme.id;
    return (
      "/* Abyss palette - " +
      label +
      " (theme: " +
      id +
      ") */\n" +
      ":root {\n" +
      "  --abyss-accent: " +
      a +
      ";\n" +
      "  --abyss-accent-channel: " +
      ch +
      ";\n" +
      "  --abyss-glass-tint: " +
      g +
      ";\n" +
      "}\n" +
      'html[data-theme="dark"] {\n' +
      "  --jf-palette-primary-main: rgb(var(--abyss-accent));\n" +
      "  --jf-palette-primary-mainChannel: var(--abyss-accent-channel);\n" +
      "  --jf-palette-secondary-main: rgb(" +
      s +
      ");\n" +
      "  --jf-palette-secondary-mainChannel: " +
      sch +
      ";\n" +
      "  --jf-palette-AppBar-defaultBg: rgba(var(--abyss-glass-tint), 0.92);\n" +
      "  --jf-palette-AppBar-transparentBg: rgba(var(--abyss-glass-tint), 0.72);\n" +
      "}"
    );
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty("--abyss-accent", theme.accent.join(", "));
    root.style.setProperty("--abyss-accent-channel", theme.accent.join(" "));
    root.style.setProperty("--abyss-glass-tint", theme.glassTint.join(", "));
    root.style.setProperty("--abyss-secondary", theme.secondary.join(", "));

    document.title = theme.label + " — Abyss theme picker";
    cssSnippet.textContent = cssBlock(theme);

    swatchGrid.innerHTML =
      swatchBlock("Accent", theme.accent) +
      swatchBlock("Glass tint", theme.glassTint) +
      swatchBlock("Secondary (MUI)", theme.secondary);

    listEl.querySelectorAll("button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.themeId === theme.id);
    });

    if (location.hash.replace("#", "") !== theme.id) {
      history.replaceState(null, "", "#" + theme.id);
    }
  }

  function swatchBlock(label, arr) {
    return (
      '<div class="swatch-card"><strong>' +
      label +
      '</strong><div class="color-bar" style="background:' +
      rgb(arr) +
      '"></div>' +
      arr.join(", ") +
      "</div>"
    );
  }

  catalog.themes.forEach(function (theme) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.themeId = theme.id;
    const dot = document.createElement("span");
    dot.className = "swatch-dot";
    dot.style.background = rgb(theme.accent);
    btn.appendChild(dot);
    btn.appendChild(document.createTextNode(theme.label));
    btn.addEventListener("click", function () {
      applyTheme(theme);
    });
    li.appendChild(btn);
    listEl.appendChild(li);
  });

  function themeFromHash() {
    const id = (location.hash || "").replace(/^#/, "");
    return catalog.themes.find(function (t) {
      return t.id === id;
    });
  }

  const initial =
    themeFromHash() ||
    catalog.themes.find(function (t) {
      return t.id === catalog.defaultTheme;
    }) ||
    catalog.themes[0];

  applyTheme(initial);

  window.addEventListener("hashchange", function () {
    const t = themeFromHash();
    if (t) applyTheme(t);
  });
})();
