"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var api_1 = __importDefault(require("./routes/api"));
var config_1 = __importDefault(require("./config"));
var app = express_1.default();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/api", api_1.default);
app.listen(config_1.default.APP_PORT);
//# sourceMappingURL=index.js.map