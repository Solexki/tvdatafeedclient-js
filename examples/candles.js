import { TvDataFeed } from "tvdatafeedclient-js";

(async () => {
  const tv = new TvDataFeed();
  await tv.connect(); //optional

  const candles = await tv.getCandles("BINANCE", "BTCUSDT", "1", 300);
  console.table(candles);
})();
