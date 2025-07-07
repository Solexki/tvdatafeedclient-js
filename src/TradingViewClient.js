const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

class TradingViewClient {
  constructor(auth_token = null) {
    this.TV_SOCKET = "wss://data.tradingview.com/socket.io/websocket";
    this.session = this.#tvSessionId("qs");
    this.chartSession = this.#tvSessionId("cs");
    this.ws = null;
    this.candlePromise = null;
    this.candleResolved = null;
    this.auth_token = auth_token || "unauthorized_user_token";
    this.exchangeSymbol = null;
  }
  #tvSessionId(prefix = "qs") {
    return `${prefix}_${uuidv4().slice(0, 12).replace(/-/g, "")}`;
  }

  #encodeTVMessage(msg) {
    const str = JSON.stringify(msg);
    return `~m~${str.length}~m~${str}`;
  }

  //let's connect to tradeView right
  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.TV_SOCKET, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
          Origin: "https://www.tradingview.com",
          Referer: "https://www.tradingview.com/",
        },
      });

      this.ws.on("open", () => {
        // console.log("Connected to tradingview!");
        resolve();
        this.#setupSession(this.auth_token);
      });

      this.ws.on("message", (data) => this.#handleMessage(data.toString()));

      this.ws.on("error", reject);

      this.ws.on("close", () => {
        // console.log("Disconnected from TradingView");

        this.#send({
          m: "chart_remove_series",
          p: [this.session, this.chartSession],
        });

        this.#send({
          m: "chart_delete_session",
          p: [this.session],
        });
      });
    });
  }

  //this one na for sessionSetup :-p
  #setupSession(auth_token) {
    this.#send({
      m: "set_auth_token",
      p: [
        //unauthorized_user_token
        //in the future we should be able to generate JWT and use it if available
        auth_token,
      ],
    });

    this.#send({ m: "chart_create_session", p: [this.chartSession, ""] });
    this.#send({ m: "quote_create_session", p: [this.session] });
  }

  //this is send helper
  #send(msg) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(this.#encodeTVMessage(msg));
    } else {
      console.warn("WebSocket not open. Message not sent:", msg);
    }
  }

  //message helper
  #handleMessage(data) {
    const text = data.toString();

    const messages = text.split("~m~").filter((m) => {
      return m.match("timescale_update");
    });

    const result = [];
    messages.forEach((raw) => {
      try {
        const msg = JSON.parse(raw);
        if (msg.m === "timescale_update") {
          const series = msg.p[1]?.sds_1 || msg.p[1]?.s1;

          if (series && Array.isArray(series.s)) {
            const candles = series.s.map((candle) => {
              const [timestamp, open, high, low, close, volume] = candle.v;

              return {
                time: new Date(timestamp * 1000),
                symbol: `${this.exchangeSymbol}`,
                open,
                high,
                low,
                close,
                volume,
              };
            });

            candles.forEach((bar) => {
              result.push(bar);
            });
          }
          this.candleResolved(result);
          this.candlePromise = null;
        }
      } catch (err) {
        console.error("Parse error:", err.message);
      }
    });
    //  console.table(this.candleResolved);
  }

  async getCandles(
    exchange = "BINANCE",
    symbol = "BTCUSDT",
    resolution = "1",
    n_bar = 300
  ) {
    if (this.candlePromise) {
      return Promise.reject("Another candle request is already in progress.");
    }

    this.candlePromise = new Promise((resolve) => {
      this.candleResolved = resolve;
      this.exchangeSymbol = `${exchange}:${symbol}`;

      //quote symbol sir
      this.#send({
        m: "quote_add_symbols",
        p: [this.session, this.exchangeSymbol],
      });

      //resolve symbol
      this.#send({
        m: "resolve_symbol",
        p: [
          this.chartSession,
          "sds_sym_1",
          `={"adjustment":"splits","symbol":"${this.exchangeSymbol}"}`,
        ],
      });

      //and create series
      this.#send({
        m: "create_series",
        p: [
          this.chartSession,
          "sds_1",
          "s1",
          "sds_sym_1",
          resolution,
          n_bar,
          "",
        ],
      });
    });
    return this.candlePromise;
  }
}

module.exports = TradingViewClient;
