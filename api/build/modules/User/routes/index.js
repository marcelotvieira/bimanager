"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler = require("express-async-handler");
const middlewares_1 = require("../../../middlewares");
const controller_1 = require("../controller");
const services_1 = require("../services");
const userRouter = (0, express_1.Router)();
const userController = new controller_1.UserController(new services_1.UserService());
userRouter.post('/users/register', asyncHandler((req, res) => userController.create(req, res)));
userRouter.post('/users/signin', asyncHandler((req, res) => userController.authenticate(req, res)));
userRouter.get('/users/:id', asyncHandler(middlewares_1.checkToken), asyncHandler((req, res) => userController.getUserConnections(req, res)));
exports.default = userRouter;
//# sourceMappingURL=index.js.map