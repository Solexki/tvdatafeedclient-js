declare module "tvdatafeedclient-js" {
  class TradingViewClient {
    constructor();
    connect(): Promise<void>;
    getCandles(
      exchange: string,
      symbol: string,
      interval: string,
      nBars?: number
    ): Promise<
      Array<{
        datetime: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }>
    >;
  }

  export = TradingViewClient;
}
