const TradingViewClient = require("../src/TradingViewClient");

(async () => {
  const tv = new TradingViewClient();
  await tv.connect();

  const candles = await tv.getCandles("BINANCE", "BTCUSDT", "1", 300);
  console.table(candles);
})();
