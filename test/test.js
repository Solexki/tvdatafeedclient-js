const TradingViewClient = require("../src/TradingViewClient");
const assert = require("assert");

(async () => {
  const tv = new TradingViewClient();
  await tv.connect();

  const candles = await tv.getCandles("BINANCE", "BNBUSDT", "1", 300);
  console.table(candles);

  //Simple test;
  assert(Array.isArray(candles), "Expected candles to be an array");
  assert(candles.length > 0, "Expected candles not to be empty");
  const sample = candles[0];
  assert(sample.time !== undefined, "Expected candles to have time object");
  assert(sample.open !== undefined, "Expected candles to have open field");
  assert(sample.high !== undefined, "Expected candles to have high field");
  assert(sample.low !== undefined, "Expected candles to have low field");
  assert(sample.volume !== undefined, "Expected candles to have volume field");

  console.log("All test are passed!");
})();
