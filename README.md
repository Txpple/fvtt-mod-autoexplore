# Open Roll 5e: Autoexplore

A Foundry VTT module that lets a scene start fully explored. Players see the whole map in the dim
explored state from the moment they arrive, while tokens and anything happening on the map still
need real line of sight. It suits towns, taverns and shops: places whose floor plan is no secret,
where pitch-black fog only gets in the way.

## How it works

- **One checkbox per scene.** The scene configuration gets an **Exploration** tab with a **Start
  Explored** toggle. The core tabs are left as they are.
- **The effect is drawn, not saved.** Each client fills its own fog texture when the scene loads,
  and fog saving is switched off on flagged scenes. No fog exploration data is ever written.
- **Real exploration is kept.** Each player's stored exploration stays untouched underneath. Turn
  the toggle off and their own fog comes back as it was.
- **Nothing can undo it by accident.** A GM's Reset Fog, a player joining for the first time or a
  scene reload all re-apply the fill, because there is no stored state to lose.
- **Tokens stay hidden.** An explored area that is out of sight never shows tokens; that is core
  Foundry behaviour, and the module does not change it.

## Installation

Paste the manifest URL into Foundry's *Install Module* dialog:

```
https://github.com/Txpple/fvtt-mod-autoexplore/releases/latest/download/module.json
```

Requires Foundry VTT v13 or v14 (verified on v14). It works with any game system and has no other
dependencies.

## Usage

Open a scene's configuration, switch to the **Exploration** tab, tick **Start Explored** and save.
The change applies at once for everyone viewing the scene. Untick it to return to normal fog of
war; each client reloads its own stored exploration.

While the toggle is on, fog is not saved on that scene, so anything a player explores there in the
meantime is not added to their history. Exploration on every other scene is saved as usual.

There are no module settings; the toggle on each scene is the only control.

## Development

There is no build step: the module is one plain ES module, `scripts/autoexplore.js`, loaded
straight from the repo. Releases: bump `version` and the `download` URL in `module.json` together,
tag `vX.Y.Z`, and publish a zip of the module with the manifest as a GitHub release.

<!-- openroll5e:family -->
## Part of Open Roll 5e

Autoexplore is one of the Open Roll 5e modules for Foundry VTT, a suite built for one D&D 5e table and
shared. Each module installs and works on its own and none needs another; together they cover the
table from the fog of war to the loot. The other modules:

- [Open Roll 5e: Battle Flow](https://github.com/Txpple/fvtt-mod-battleflow): combat automation for dnd5e 2024 rules: a hit rolls and applies its own damage, saves resolve themselves, reactions hold, and concentration is tracked. Every rule that touches a fight in the 2024 core books, Heroes of Faerûn, Arcana Unleashed and Ravenloft: The Horrors Within.
- [Open Roll 5e: Combat Plus](https://github.com/Txpple/fvtt-mod-combatplus): automates the chores of running a fight: combat music, an initiative gate, an out-of-turn movement block, defeated marking at 0 HP and turn alerts.
- [Open Roll 5e: Errata](https://github.com/Txpple/fvtt-mod-errata5e): corrects, in memory, bugs in the premium D&D 2024 books, the dnd5e system and Foundry itself, each fix held until the vendor ships its own.
- [Open Roll 5e: FX Studio](https://github.com/Txpple/fvtt-mod-fxstudio): visual and sound effects for dnd5e, played from what actually happened at the table, with about a thousand stock FX and a window for authoring your own.
- [Open Roll 5e: Loot Shelf](https://github.com/Txpple/fvtt-mod-lootshelf): loot chests and merchant shelves that players can take from, buy from and sell to without owning them, with a receipt for every trade.
- [Open Roll 5e: Open Server](https://github.com/Txpple/fvtt-mod-openserver): for hosted worlds: clears the startup pause so players can play before the GM arrives, and gives any user a landing scene of their own.
- [Open Roll 5e: Party Stash](https://github.com/Txpple/fvtt-mod-partystash): makes a dnd5e Group actor's inventory a working party stash: drags move instead of copying, coin moves through a dialog, and every transfer posts a receipt.
- [Open Roll 5e: Area Sounds](https://github.com/Txpple/fvtt-mod-areasounds): background sound for scenes: random one-shots with silence between them, seamless crossfaded loops, day and night gating, and quiet during combat.

Three MCP servers for [Claude Code](https://claude.com/claude-code) complete the suite:

- [fvtt-mcp-dnd5e](https://github.com/Txpple/fvtt-mcp-dnd5e): builds D&D 5e content in a live Foundry world from Claude Code: a stat block becomes a complete NPC, a map image a walled and lit scene, an adventure its journals, tables and handouts.
- [fvtt-mcp-imagegen](https://github.com/Txpple/fvtt-mcp-imagegen): makes the art with Google's Gemini image models: icons, tokens, props, portraits and illustrations, token redresses and restyles, battlemap and overland-map repaints, and the illustrated session records, all grounded in what the world already shows.
- [fvtt-mcp-sessionscribe](https://github.com/Txpple/fvtt-mcp-sessionscribe): turns a session's Discord recording and Foundry chat log into its record. Its end-to-end `session-scribe` skill drives the server from the Craig link to a speaker-labelled transcript, a fully illustrated player recap, combat statistics, GM notes and a party snapshot.

Issues are welcome on every repo in the family; pull requests are not accepted, since each is one
author's design for one table, shared because it might suit yours. How they fit together is mapped in [fvtt-suite-openroll5e](https://github.com/Txpple/fvtt-suite-openroll5e).
<!-- /openroll5e:family -->

## License

MIT. See [LICENSE](LICENSE).
