"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const ApiError_1 = require("../../../Error/ApiError");
const prisma_1 = require("../../../prisma/prisma");
class DatabaseController {
    constructor(service) {
        this._service = service;
    }
    async create(req, res) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: req.body.ownerId } });
        if (!user)
            ApiError_1.ApiError.notFound('User passed as owner does not exist');
        const newConnection = await this._service.create(req.body);
        res.status(200).json({
            message: 'Connection created successfully',
            connection: newConnection
        });
    }
    async update(req, res) {
        const newConnection = await this._service.update(req.params.id, req.body);
        res.status(200).json({
            message: 'Connection updated successfully',
            connection: newConnection
        });
    }
}
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=index.js.map