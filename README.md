# TradingView Data Feed JS

A lighweight websocket client for accessing tradingView candlestick data via Node.js.
Inspired by `tvdatafeed` for python - But made for JavaScript Devs, crypto traders and bot builders.
This is just what could be.

---

## What This Project Solves
I build a lot of bots and tools that rely on TradingView data, and honestly, it's always been a pain. Every time I needed that data, I had to switch over to Python just to use tvdatafeed. It felt like a long detour for something that should've been simple — especially since most of my projects are in JavaScript or Node.js.

There wasn’t a solid npm package (at least not that I could find) that gave me what I needed. That always forced me to either rewrite parts of my project in Python or come up with ugly workarounds.

The day I finally used this package to fetch TradingView data directly from Node.js, it just clicked. I felt at peace. No hacks, no switching languages — just clean JavaScript doing what I needed it to do.

---

## Features

- Retrieve historical candles (open, high, low, close and volume)
- Binance, Bybit, Mexc and others
- No TradingView Account Needed
- Clean Promise-based API

---

## Features in Pipline

- Add TradingView account to unlock private access and remove unauthorized user limits
- cache user JWT to avoid repeated script login.
- Convert package to type script
- live data access
- more

---

## Installation

```bash
npm install tvdatafeedclient-js
```

---

## Contribution
This package is open to contributions and suggestions.

Check out the Features in Pipeline section — there are lots of ways this project can be improved for better usability and more powerful data access. If you’re interested in fixing bugs, adding new features, or just making things cleaner, you’re more than welcome to jump in.

Before contributing, please keep the following in mind:

- Keep your pull requests focused — smaller PRs are easier to review and merge.

- Always test your changes before opening a PR.

- Don’t push directly to main.

- If you’re introducing a new feature or a breaking change, open an issue first so we can discuss it.

Let’s build something better together. 


---

## Credit.

- I used ChatGpt for errors i encounted, code refactor (No Nitpickin was added to the prompt)
- Chrome dev tools which i used to understands tradingView websocket messages proccess.

---

## Stack

Node.js V22^
