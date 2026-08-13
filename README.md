# Autoexplore (Exploration Scene Tab)

A tiny Foundry VTT module that lets a scene start **fully explored**: players see the whole
map's architecture in the dim "explored" fog state from the moment they arrive, while tokens
and anything happening on the map still require real line of sight. Perfect for town maps,
taverns, shops — places whose floor plan is no secret, where pitch-black fog is just friction.

## Usage

Open a scene's configuration and switch to the **Exploration** tab (added by this module — core
tabs are left untouched). Tick **Start Explored**, save, done. Untick it to return to normal
fog exploration.

## Why it's safe

The effect is **purely client-side rendering**. The module fills each client's local fog
texture after the scene loads and suppresses fog *saving* on flagged scenes, so:

- **No fog data is ever written.** Each player's genuine exploration history is preserved
  untouched underneath — turn the flag off and honest fog returns exactly as it was.
- **Nothing can break it.** "Reset Fog", new players joining, re-imports — all irrelevant,
  because there is no stored state to lose. The fill simply re-applies on every load/reset.
- Explored-but-not-visible never draws tokens; that's core Foundry behavior the module
  doesn't touch.

## Installation

Install via manifest URL:

```
https://github.com/Txpple/fvtt-mod-autoexplore/releases/latest/download/module.json
```

Compatibility: Foundry v13+ (verified on v14).

## License

MIT
