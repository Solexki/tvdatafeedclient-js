# TradingView Data Feed JS

A lighweight websocket client for accessing tradingView candlestick data via Node.js.
Inspired by `tvdatafeed` for python - But made for JavaScript Devs, crypto traders and bot builders.
This is just what could be.

---

## What this project solved

I creat lot of bots or software that requires tradingview data and many times i had to switch to python just to use tvdatafeed.
the absense of npm package(i don't know of any, i might be wrong) to achieve this always cause me to take a very long short, I felt peace when i used this package to access tradingview data.

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

This package is open to contribution, suggestion.
Refer to Features in Pipline, there are many ways this can be improved for better usage and data access.
if you'd like to improve, fix or extend, please follow the guidelines

- Keep your pull requests focused. Small is better.

- Always test your changes before opening a PR.

- Avoid pushing directly to main.

- If you're adding a new feature or breaking change, please open an issue first for discussion.

Let's makes it better together.



---

## Credit.

- I used ChatGpt for errors i encounted, code refactor (No Nitpickin was added to the prompt)
- Chrome dev tools which i used to understands tradingView websocket messages proccess.

---

## Stack

Node.js V22^
