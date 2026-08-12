/**
 * Autoexplore — render flagged scenes as fully explored, without touching fog data.
 *
 * A scene flagged `flags.fvtt-mod-autoexplore.enabled` has its LOCAL fog-exploration texture
 * filled white after every load/reset, so every client draws the whole map in the dim
 * "explored" state: architecture reads everywhere, while tokens and current activity still
 * require real line of sight (explored-but-not-visible never draws actors — core behavior).
 *
 * Deliberately stateless: FogManager.save is suppressed on flagged scenes so the white fill is
 * never committed into anyone's FogExploration document. Players' true exploration history is
 * preserved untouched underneath; untick the flag and honest fog returns. Because nothing is
 * stored, fog resets and newly joining users can never break the effect.
 *
 * Verified against Foundry v14.364 FogManager internals:
 *   - `_createExplorationRenderTexture()` guarantees the exploration sprite holds a
 *     RenderTexture (copying any current exploration into it) — our fill target.
 *   - `save()` is the single public choke point for fog persistence (commit() only debounces
 *     into it), so suppressing it keeps the fill client-side.
 *   - `_handleReset()` is what each client runs when a GM resets fog — re-fill after it.
 */

const MODULE_ID = "fvtt-mod-autoexplore";

/** Is this scene flagged to start explored? (plain flags read — no getFlag scope dance) */
const isAutoexplored = scene => !!scene?.flags?.[MODULE_ID]?.enabled;

/** Fill the local exploration texture white so the visibility shader treats all as explored. */
async function fillExploration() {
  const fog = canvas?.fog;
  if (!fog || !canvas.scene || !isAutoexplored(canvas.scene)) return;
  try {
    const tex = await fog._createExplorationRenderTexture();
    const g = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, tex.width, tex.height).endFill();
    canvas.app.renderer.render(g, { renderTexture: tex, clear: true });
    g.destroy(true);
  } catch (err) {
    console.error(`${MODULE_ID} | exploration fill failed`, err);
  }
}

Hooks.once("init", () => {
  const FogCls = CONFIG.Canvas.fogManager;

  // Never persist exploration on autoexplored scenes — the white fill would otherwise be
  // committed into each user's real FogExploration document, destroying their true history.
  const origSave = FogCls.prototype.save;
  FogCls.prototype.save = async function (...args) {
    if (isAutoexplored(canvas?.scene)) return;
    return origSave.apply(this, args);
  };

  // A GM "Reset Fog" wipes every client's texture — re-fill once the reset has been handled.
  const origHandleReset = FogCls.prototype._handleReset;
  FogCls.prototype._handleReset = async function (...args) {
    const out = await origHandleReset.apply(this, args);
    await fillExploration();
    return out;
  };
});

Hooks.on("canvasReady", () => void fillExploration());

// Live toggle from the scene sheet: fill on enable; reload the user's true fog on disable.
Hooks.on("updateScene", (scene, changes) => {
  if (scene !== canvas?.scene) return;
  if (!foundry.utils.hasProperty(changes, `flags.${MODULE_ID}`)) return;
  if (isAutoexplored(scene)) void fillExploration();
  else void canvas.fog.load();
});

// ---------------------------------------------------------------------------------------------
// Scene configuration UI: a module-owned "Custom" tab (deliberately NOT injected into core's
// tabs) holding the Start Explored checkbox. The input's name writes the flag through the
// sheet's normal form submission; re-rendering re-injects, so active-tab state is restored from
// the application's tabGroups.
// ---------------------------------------------------------------------------------------------

Hooks.on("renderSceneConfig", (app, element) => {
  const el = element instanceof HTMLElement ? element : element?.[0];
  const nav = el?.querySelector("nav.sheet-tabs");
  if (!nav) return;

  // This hook fires on EVERY re-render, and a re-render rebuilds some parts (the nav)
  // while injected sibling panels survive — a presence-check on the nav item alone lets
  // panels accumulate. Remove any of ours first, then inject fresh: idempotent no matter
  // which parts the render replaced.
  nav.querySelector(`[data-tab="${MODULE_ID}"]`)?.remove();
  for (const stale of el.querySelectorAll(`.tab[data-tab="${MODULE_ID}"]`)) stale.remove();

  const active = app.tabGroups?.sheet === MODULE_ID;

  const navItem = document.createElement("a");
  navItem.dataset.action = "tab";
  navItem.dataset.group = "sheet";
  navItem.dataset.tab = MODULE_ID;
  if (active) navItem.classList.add("active");
  navItem.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" inert></i><span>Custom</span>`;
  nav.appendChild(navItem);

  const panel = document.createElement("div");
  panel.className = `tab scrollable${active ? " active" : ""}`;
  panel.dataset.group = "sheet";
  panel.dataset.tab = MODULE_ID;
  panel.innerHTML = `
    <div class="form-group">
      <label>Start Explored</label>
      <div class="form-fields">
        <input type="checkbox" name="flags.${MODULE_ID}.enabled" ${isAutoexplored(app.document) ? "checked" : ""}>
      </div>
      <p class="hint">Render this scene as fully explored for everyone: the map's architecture
      shows through the fog of war, while tokens and current activity still require line of
      sight. Client-side only — no fog exploration data is written, and real exploration
      history is preserved for when this is turned off.</p>
    </div>`;

  const tabs = el.querySelectorAll('.tab[data-group="sheet"]');
  tabs[tabs.length - 1]?.after(panel);
});
