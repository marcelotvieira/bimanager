"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const errorHandler_1 = require("./Error/errorHandler");
const routes_1 = require("./modules/Database/routes");
const routes_2 = require("./modules/User/routes");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.app.get('/', (_req, res) => res.json({ message: 'ok' }));
        this.routes();
        this.errorConfig();
    }
    config() {
        this.app.use(express.json());
        dotenv.config();
    }
    routes() {
        this.app.use(routes_2.default);
        this.app.use(routes_1.default);
    }
    errorConfig() {
        this.app.use(errorHandler_1.errorHanlder);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map