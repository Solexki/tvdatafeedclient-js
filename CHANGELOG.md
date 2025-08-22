## 2.0.0 - 2025-08-21

## Changed

- Migrated project to TypeScript.
- Changed module format from commonJS to ES Modules.
- **Breaking Change:** You now need to destructure imports: `js const { TradingViewClient } = require("tvdatafeedclient-js")`

`js import { TradingViewClient } from "tvdatafeedclient-js";`

- Project is properly typed and better DX.
