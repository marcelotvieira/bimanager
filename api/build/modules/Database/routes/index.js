"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler = require("express-async-handler");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const databaseRouter = (0, express_1.Router)();
const databaseController = new controllers_1.DatabaseController(new services_1.DatabaseService());
databaseRouter.post('/connection/register', asyncHandler((req, res) => databaseController.create(req, res)));
databaseRouter.put('/connection/:id', asyncHandler((req, res) => databaseController.update(req, res)));
exports.default = databaseRouter;
//# sourceMappingURL=index.js.map