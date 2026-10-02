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

There are no module settings.

## License

MIT. See [LICENSE](LICENSE).
