"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const config_1 = require("./src/config/config");
const app = (0, express_1.default)();
//configuracion del json y las rutas
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
//router
const routerUser_1 = __importDefault(require("./src/router/routerUser"));
const routerFavorito_1 = __importDefault(require("./src/router/routerFavorito"));
const routerProduct_1 = __importDefault(require("./src/router/routerProduct"));
const routerCarro_1 = __importDefault(require("./src/router/routerCarro"));
const routerOrden_1 = __importDefault(require("./src/router/routerOrden"));
app.use('/auth', routerUser_1.default);
app.use('/favorito', routerFavorito_1.default);
app.use('/product', routerProduct_1.default);
app.use('/shop', routerCarro_1.default);
app.use('/orden', routerOrden_1.default);
//conectar base de datos
(0, config_1.coneccionMongo)();
exports.default = app;
//# sourceMappingURL=app.js.map